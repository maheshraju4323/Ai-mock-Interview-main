import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { createChatSession } from "@/utils/GeminiAIModal";
import { rateLimit } from "@/utils/rateLimit";
import { v4 as uuidv4 } from "uuid";
import { awardPoints } from "@/utils/points";

// POST /api/interviews — generate questions via Gemini and save interview
export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit: 5 new interviews per minute per user
    const rl = rateLimit(`create-interview:${userId}`, { limit: 5, windowMs: 60_000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before creating another interview." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience, branch, interviewType } = body;

    // Validate
    if (!jobPosition?.trim() || !jobDesc?.trim() || !jobExperience?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const expNum = parseInt(jobExperience);
    if (isNaN(expNum) || expNum < 0 || expNum > 50) {
      return NextResponse.json(
        { error: "Years of experience must be between 0 and 50" },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitize = (str) =>
      str.replace(/[<>{}]/g, "").trim().substring(0, 500);
    const position = sanitize(jobPosition);
    const description = sanitize(jobDesc);
    const experience = sanitize(jobExperience);
    const selectedBranch = (branch || "").trim().substring(0, 50);
    const selectedType = (interviewType || "").trim().substring(0, 50);

    // Build a context-aware prompt based on branch + interview type
    const focusArea = buildFocusArea(selectedBranch, selectedType);
    const tone = selectedType === "HR"
      ? "Generate HR interview questions focused on the candidate's background, skills, experience, communication, teamwork, and culture fit for the selected branch and job role."
      : selectedType === "Behavioral"
      ? "Generate behavioral interview questions (STAR-format style) focused on past experiences, problem solving, leadership, teamwork, adaptability, and soft skills relevant to the selected branch and job role."
      : "Generate technical interview questions.";

    // Generate questions with Gemini
    const prompt = `Generate 5 interview questions and answers for:
Job Position: ${position}
Job Description: ${description}
Years of Experience: ${experience}
Selected Branch: ${selectedBranch || "Not specified"}
Interview Type: ${selectedType || "Technical"}

${focusArea}

${tone}

Please provide a valid JSON array with this exact format:
[
  {
    "Question": "Your interview question here?",
    "Answer": "Your detailed answer here."
  }
]

Keep questions professional and relevant to the selected branch, interview type, and job requirements.`;

    const session = createChatSession();
    const aiResult = await session.sendMessage(prompt);
    let responseText = aiResult.response.text();

    // Clean and validate JSON
    const cleanedResponse = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^\s*[\r\n]/gm, "")
      .trim();

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleanedResponse);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 502 }
      );
    }

    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      return NextResponse.json(
        { error: "Invalid AI response format. Please try again." },
        { status: 502 }
      );
    }

    for (const item of parsedQuestions) {
      if (!item.Question || !item.Answer) {
        return NextResponse.json(
          { error: "Invalid question format from AI. Please try again." },
          { status: 502 }
        );
      }
    }

    // Save to DB
    const userEmail = user.primaryEmailAddress?.emailAddress ?? "";
    const mockId = uuidv4();
    const createdAt = new Date().toISOString().split("T")[0];

    await db.insert(MockInterview).values({
      mockId,
      jsonMockResp: cleanedResponse,
      jobPosition: position,
      jobDesc: description,
      jobExperience: experience,
      createdBy: userEmail,
      createdAt,
      branch: selectedBranch || null,
      interviewType: selectedType || null,
    });

    const userName =
      user.firstName ||
      user.fullName ||
      user.username ||
      userEmail.split("@")[0] ||
      "User";

    await awardPoints(userId, userName, "mock_interview", mockId);

    return NextResponse.json({ mockId }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/interviews]", error);
    return NextResponse.json(
      { error: "Failed to create interview. Please try again." },
      { status: 500 }
    );
  }
}

// Build the subject focus area based on the selected branch and interview type.
function buildFocusArea(branch, type) {
  const b = (branch || "").toLowerCase();
  const t = (type || "").toLowerCase();

  if (t === "hr" || t === "behavioral") {
    return "Focus the questions on general professional competencies, soft skills, and the candidate's fit for the job role rather than deep technical details.";
  }

  if (b.includes("ece")) {
    return "Focus on Electronics and Communication Engineering topics: Digital Electronics, Analog Electronics, Communication Systems, Microprocessors, Embedded Systems, Signals and Systems, and the selected job role if provided.";
  }

  if (b.includes("mech")) {
    return "Focus on Mechanical Engineering topics: Thermodynamics, Manufacturing, Machine Design, Fluid Mechanics, Strength of Materials, and the selected job role if provided.";
  }

  // Default: Computer Science / Software Engineering
  return "Focus on Computer Science topics: Programming, Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and the selected job role and tech stack.";
}
