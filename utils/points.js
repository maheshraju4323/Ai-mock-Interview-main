import { db } from "./db";
import { weeklyCompetition, pointsLog } from "./schema";
import { eq, and, desc } from "drizzle-orm";
import { getCurrentWeekRange } from "./week";

const POINT_VALUES = {
  question_completed: 10,
  correct_answer: 20,
  challenge_completed: 25,
  hr_question: 10,
  mock_interview: 100,
  daily_login: 10,
};

export function getPointValue(activityType) {
  return POINT_VALUES[activityType] || 0;
}

export async function awardPoints(userId, userName, activityType, activityId) {
  const points = getPointValue(activityType);
  if (!points || !userId) return null;

  const { weekStart, weekEnd } = getCurrentWeekRange();
  const now = new Date().toISOString();
  const logKey = activityType + ":" + activityId;

  const existingLog = await db
    .select()
    .from(pointsLog)
    .where(
      and(
        eq(pointsLog.userId, userId),
        eq(pointsLog.weekStart, weekStart),
        eq(pointsLog.activityType, activityType),
        eq(pointsLog.activityId, String(logKey))
      )
    )
    .limit(1);

  if (existingLog.length > 0) return null;

  const existing = await db
    .select()
    .from(weeklyCompetition)
    .where(
      and(
        eq(weeklyCompetition.userId, userId),
        eq(weeklyCompetition.weekStart, weekStart)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    const row = existing[0];
    const updateData = { points: row.points + points, updatedAt: now };

    if (activityType === "question_completed" || activityType === "correct_answer") {
      updateData.questionsCompleted = row.questionsCompleted + 1;
    }
    if (activityType === "correct_answer") {
      updateData.correctAnswers = row.correctAnswers + 1;
    }
    if (activityType === "mock_interview") {
      updateData.interviewsCompleted = row.interviewsCompleted + 1;
    }
    if (activityType === "challenge_completed") {
      updateData.challengesCompleted = row.challengesCompleted + 1;
    }

    await db
      .update(weeklyCompetition)
      .set(updateData)
      .where(
        and(
          eq(weeklyCompetition.userId, userId),
          eq(weeklyCompetition.weekStart, weekStart)
        )
      );
  } else {
    const insertData = {
      userId,
      userName: userName || "User",
      weekStart,
      weekEnd,
      points,
      questionsCompleted:
        activityType === "question_completed" || activityType === "correct_answer"
          ? 1
          : 0,
      correctAnswers: activityType === "correct_answer" ? 1 : 0,
      interviewsCompleted: activityType === "mock_interview" ? 1 : 0,
      challengesCompleted: activityType === "challenge_completed" ? 1 : 0,
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(weeklyCompetition).values(insertData);
  }

  await db.insert(pointsLog).values({
    userId,
    weekStart,
    activityType,
    activityId: String(logKey),
    points,
    createdAt: now,
  });

  const updated = await db
    .select()
    .from(weeklyCompetition)
    .where(
      and(
        eq(weeklyCompetition.userId, userId),
        eq(weeklyCompetition.weekStart, weekStart)
      )
    )
    .limit(1);

  return updated[0] || null;
}

export async function getUserWeeklyCompetition(userId) {
  const { weekStart } = getCurrentWeekRange();
  const result = await db
    .select()
    .from(weeklyCompetition)
    .where(
      and(
        eq(weeklyCompetition.userId, userId),
        eq(weeklyCompetition.weekStart, weekStart)
      )
    )
    .limit(1);
  return result[0] || null;
}

export async function getWeeklyLeaderboard(weekStart) {
  const results = await db
    .select()
    .from(weeklyCompetition)
    .where(eq(weeklyCompetition.weekStart, weekStart))
    .orderBy(desc(weeklyCompetition.points));

  return results.map((row, index) => ({
    rank: index + 1,
    userId: row.userId,
    userName: row.userName,
    points: row.points,
    questionsCompleted: row.questionsCompleted,
    correctAnswers: row.correctAnswers,
    interviewsCompleted: row.interviewsCompleted,
    challengesCompleted: row.challengesCompleted,
  }));
}
