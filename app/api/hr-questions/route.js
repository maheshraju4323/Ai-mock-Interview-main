export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { HrQuestions } from "@/utils/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let result;
    if (category) {
      result = await db
        .select()
        .from(HrQuestions)
        .where(eq(HrQuestions.category, category))
        .orderBy(asc(HrQuestions.id));
    } else {
      result = await db
        .select()
        .from(HrQuestions)
        .orderBy(asc(HrQuestions.id));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/hr-questions]", error);
    return NextResponse.json({ error: "Failed to fetch HR questions" }, { status: 500 });
  }
}
