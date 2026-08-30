export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { QuestionBank } from "@/utils/schema";
import { eq, asc } from "drizzle-orm";

const SLUG_TO_COURSE = {
  c: "C Programming",
  cpp: "C++",
  python: "Python",
  java: "Java Programming",
  javascript: "JavaScript",
  sql: "SQL",
  "data-structures": "Data Structures",
  algorithms: "Algorithms",
  dbms: "DBMS",
  "operating-systems": "Operating Systems",
  "computer-networks": "Computer Networks",
};

export async function GET(request, { params }) {
  try {
    const { course } = params;
    const courseName = SLUG_TO_COURSE[course] || course;

    const result = await db
      .select({
        id: QuestionBank.id,
        question: QuestionBank.question,
        options: QuestionBank.options,
        correctAnswer: QuestionBank.correctAnswer,
        explanation: QuestionBank.explanation,
        topic: QuestionBank.topic,
        difficulty: QuestionBank.difficulty,
      })
      .from(QuestionBank)
      .where(eq(QuestionBank.course, courseName))
      .orderBy(asc(QuestionBank.id));

    return NextResponse.json({
      course: courseName,
      slug: course,
      total: result.length,
      questions: result,
    });
  } catch (error) {
    console.error("[GET /api/question-sets/courses/[course]]", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
