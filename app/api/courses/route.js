export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { courses } from "@/utils/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(courses).orderBy(asc(courses.id));
    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/courses]", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
