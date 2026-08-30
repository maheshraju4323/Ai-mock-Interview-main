export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { awardPoints } from "@/utils/points";

const VALID_ACTIVITY_TYPES = [
  "question_completed",
  "correct_answer",
  "challenge_completed",
  "hr_question",
  "mock_interview",
  "daily_login",
];

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { activityType, activityId } = body;

    if (!activityType || !VALID_ACTIVITY_TYPES.includes(activityType)) {
      return NextResponse.json(
        { error: "Invalid activityType. Valid: " + VALID_ACTIVITY_TYPES.join(", ") },
        { status: 400 }
      );
    }

    if (activityId === undefined || activityId === null) {
      return NextResponse.json(
        { error: "activityId is required" },
        { status: 400 }
      );
    }

    const userName =
      user.firstName ||
      user.fullName ||
      user.username ||
      user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
      "User";

    const result = await awardPoints(userId, userName, activityType, String(activityId));

    if (!result) {
      return NextResponse.json({
        awarded: false,
        reason: "Already awarded for this activity this week or invalid data",
      });
    }

    return NextResponse.json({
      awarded: true,
      points: result.points,
      questionsCompleted: result.questionsCompleted,
      correctAnswers: result.correctAnswers,
      interviewsCompleted: result.interviewsCompleted,
      challengesCompleted: result.challengesCompleted,
    });
  } catch (error) {
    console.error("[POST /api/competition/awards]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
