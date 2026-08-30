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
      return NextResponse.json({ totalInterviews: 0, totalAnswers: 0, avgRating: 0, ratingDistribution: {}, activityByDate: [], recentInterviews: [] });
    }

    const interviews = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));

    const allAnswers = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.userEmail, email))
      .orderBy(asc(UserAnswer.id));

    const totalInterviews = interviews.length;
    const totalAnswers = allAnswers.length;

    const ratings = allAnswers.map((a) => Number(a.rating || 0)).filter((r) => r > 0);
    const avgRating = ratings.length > 0 ? (ratings.reduce((s, r) => s + r, 0) / ratings.length).toFixed(1) : "0";

    const ratingDistribution = {};
    for (const r of ratings) {
      const bucket = r <= 3 ? "1-3" : r <= 5 ? "4-5" : r <= 7 ? "6-7" : "8-10";
      ratingDistribution[bucket] = (ratingDistribution[bucket] || 0) + 1;
    }

    const activityByDate = {};
    for (const a of allAnswers) {
      if (a.createdAt) {
        activityByDate[a.createdAt] = (activityByDate[a.createdAt] || 0) + 1;
      }
    }
    const activityList = Object.entries(activityByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const recentInterviews = interviews.slice(0, 5).map((i) => {
      const interviewAnswers = allAnswers.filter((a) => a.mockIdRef === i.mockId);
      const avg =
        interviewAnswers.length > 0
          ? (interviewAnswers.reduce((s, a) => s + Number(a.rating || 0), 0) / interviewAnswers.length).toFixed(1)
          : null;
      return {
        id: i.id,
        mockId: i.mockId,
        jobPosition: i.jobPosition,
        createdAt: i.createdAt,
        avgRating: avg,
        totalQuestions: interviewAnswers.length,
      };
    });

    return NextResponse.json({
      totalInterviews,
      totalAnswers,
      avgRating,
      ratingDistribution,
      activityByDate: activityList,
      recentInterviews,
    });
  } catch (error) {
    console.error("[GET /api/interviews/stats]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
