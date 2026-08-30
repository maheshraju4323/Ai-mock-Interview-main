export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { weeklyCompetition, weeklyCompetitionHistory } from "@/utils/schema";
import { eq, desc, and } from "drizzle-orm";
import { getPreviousWeeks, formatWeekLabel } from "@/utils/week";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const previousWeekRanges = getPreviousWeeks(12);

    const previousWeeks = [];

    for (const week of previousWeekRanges) {
      let historyEntry = await db
        .select()
        .from(weeklyCompetitionHistory)
        .where(
          and(
            eq(weeklyCompetitionHistory.userId, userId),
            eq(weeklyCompetitionHistory.weekStart, week.weekStart)
          )
        )
        .limit(1);

      if (historyEntry.length === 0) {
        const competitionEntry = await db
          .select()
          .from(weeklyCompetition)
          .where(
            and(
              eq(weeklyCompetition.userId, userId),
              eq(weeklyCompetition.weekStart, week.weekStart)
            )
          )
          .limit(1);

        if (competitionEntry.length > 0) {
          const allForWeek = await db
            .select()
            .from(weeklyCompetition)
            .where(eq(weeklyCompetition.weekStart, week.weekStart))
            .orderBy(desc(weeklyCompetition.points));

          const rank =
            allForWeek.findIndex((e) => e.userId === userId) + 1 || null;

          historyEntry = [
            {
              ...competitionEntry[0],
              rank,
            },
          ];
        }
      }

      if (historyEntry.length > 0) {
        const entry = historyEntry[0];
        previousWeeks.push({
          weekStart: week.weekStart,
          weekEnd: week.weekEnd,
          label: formatWeekLabel(week.weekStart, week.weekEnd),
          rank: entry.rank,
          points: entry.points,
          questionsCompleted: entry.questionsCompleted,
          correctAnswers: entry.correctAnswers,
          interviewsCompleted: entry.interviewsCompleted,
          challengesCompleted: entry.challengesCompleted,
        });
      } else {
        previousWeeks.push({
          weekStart: week.weekStart,
          weekEnd: week.weekEnd,
          label: formatWeekLabel(week.weekStart, week.weekEnd),
          rank: null,
          points: 0,
          questionsCompleted: 0,
          correctAnswers: 0,
          interviewsCompleted: 0,
          challengesCompleted: 0,
        });
      }
    }

    return NextResponse.json({ previousWeeks });
  } catch (error) {
    console.error("[GET /api/competition/history]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
