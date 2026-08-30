export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { QuestionBank } from "@/utils/schema";
import { eq, asc } from "drizzle-orm";

const COURSE_MAP = {
  "c-programming": "C Programming",
  "cpp": "C++",
  "python": "Python",
};

export async function GET(request, { params }) {
  try {
    const { course } = params;
    const courseName = COURSE_MAP[course] || course;

    const result = await db
      .select()
      .from(QuestionBank)
      .where(eq(QuestionBank.course, courseName))
      .orderBy(asc(QuestionBank.id));

    return NextResponse.json({ course: courseName, questions: result });
  } catch (error) {
    console.error("[GET /api/courses/[course]]", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
