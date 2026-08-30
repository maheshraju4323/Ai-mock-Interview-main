export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { weeklyCompetition } from "@/utils/schema";
import { eq, desc, and } from "drizzle-orm";
import {
  getCurrentWeekRange,
  getWeeksUntilReset,
  getStreakFromActivity,
} from "@/utils/week";

export async function GET(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const weekStartParam = searchParams.get("weekStart");

    const weekRange = weekStartParam
      ? { weekStart: weekStartParam, weekEnd: "" }
      : getCurrentWeekRange();

    const allEntries = await db
      .select()
      .from(weeklyCompetition)
      .where(eq(weeklyCompetition.weekStart, weekRange.weekStart))
      .orderBy(desc(weeklyCompetition.points));

    const leaderboard = allEntries.map((row, index) => ({
      rank: index + 1,
      userId: row.userId,
      userName: row.userName,
      points: row.points,
      questionsCompleted: row.questionsCompleted,
      correctAnswers: row.correctAnswers,
      interviewsCompleted: row.interviewsCompleted,
      challengesCompleted: row.challengesCompleted,
    }));

    const currentUserEntry = allEntries.find((e) => e.userId === userId);
    const currentUserRank = currentUserEntry
      ? allEntries.findIndex((e) => e.userId === userId) + 1
      : null;

    const nextRankEntry =
      currentUserRank && currentUserRank < allEntries.length
        ? allEntries[currentUserRank]
        : null;

    const countdown = getWeeksUntilReset();

    return NextResponse.json({
      weekStart: weekRange.weekStart,
      weekEnd: leaderboard.length > 0 ? leaderboard[0].weekEnd || "" : weekRange.weekEnd,
      countdown,
      leaderboard: leaderboard.slice(0, 50),
      currentUser: currentUserEntry
        ? {
            rank: currentUserRank,
            points: currentUserEntry.points,
            questionsCompleted: currentUserEntry.questionsCompleted,
            correctAnswers: currentUserEntry.correctAnswers,
            interviewsCompleted: currentUserEntry.interviewsCompleted,
            challengesCompleted: currentUserEntry.challengesCompleted,
            nextRankPoints: nextRankEntry
              ? nextRankEntry.points
              : null,
          }
        : {
            rank: null,
            points: 0,
            questionsCompleted: 0,
            correctAnswers: 0,
            interviewsCompleted: 0,
            challengesCompleted: 0,
            nextRankPoints: null,
          },
    });
  } catch (error) {
    console.error("[GET /api/competition/leaderboard]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
