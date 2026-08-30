export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq, desc, asc } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json([]);
    }

    const interviews = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));

    const interviewsWithFeedback = [];

    for (const interview of interviews) {
      const feedback = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interview.mockId))
        .orderBy(asc(UserAnswer.id));

      const avgRating =
        feedback.length > 0
          ? (feedback.reduce((s, f) => s + Number(f.rating || 0), 0) / feedback.length).toFixed(1)
          : null;

      interviewsWithFeedback.push({
        ...interview,
        feedback,
        avgRating,
        totalQuestions: feedback.length,
      });
    }

    return NextResponse.json(interviewsWithFeedback);
  } catch (error) {
    console.error("[GET /api/interviews/all-feedback]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
