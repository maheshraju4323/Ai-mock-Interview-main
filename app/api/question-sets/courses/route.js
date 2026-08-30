export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { QuestionBank } from "@/utils/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select({
        course: QuestionBank.course,
        count: sql`count(*)::int`,
      })
      .from(QuestionBank)
      .groupBy(QuestionBank.course)
      .orderBy(QuestionBank.course);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/question-sets/courses]", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
