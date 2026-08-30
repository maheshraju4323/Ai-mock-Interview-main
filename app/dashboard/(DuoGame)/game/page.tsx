"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  Target,
  Star,
  Award,
  Clock,
  ChevronRight,
  ChevronDown,
  Lock,
  Zap,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type IconType = React.ComponentType<{ className?: string }>;

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  points: number;
  questionsCompleted: number;
}

interface CurrentUserData {
  rank: number | null;
  points: number;
  questionsCompleted: number;
  correctAnswers: number;
  interviewsCompleted: number;
  challengesCompleted: number;
  nextRankPoints: number | null;
}

interface PreviousWeek {
  weekStart: string;
  weekEnd: string;
  label: string;
  rank: number | null;
  points: number;
}

interface BadgeStats {
  points: number;
  questionsCompleted: number;
  interviewsCompleted: number;
  streak: number;
  rank: number | null;
}

interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  isEarned: (stats: BadgeStats) => boolean;
}

const POINT_VALUES = [
  { activity: "Question", points: "+10", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10" },
  { activity: "Correct Answer", points: "+20", icon: Target, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/10" },
  { activity: "Technical Challenge", points: "+25", icon: Zap, color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-500/10" },
  { activity: "HR Question", points: "+10", icon: MessageSquare, color: "text-pink-500", bg: "bg-pink-100 dark:bg-pink-500/10" },
  { activity: "Mock Interview", points: "+100", icon: Users, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10" },
];

const BADGES: AchievementBadge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete 1 interview",
    icon: MessageSquare,
    isEarned: (s) => s.interviewsCompleted >= 1,
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Complete 10 questions",
    icon: BookOpen,
    isEarned: (s) => s.questionsCompleted >= 10,
  },
  {
    id: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Complete 50 questions",
    icon: Target,
    isEarned: (s) => s.questionsCompleted >= 50,
  },
  {
    id: "interview-pro",
    name: "Interview Pro",
    description: "Complete 5 interviews",
    icon: Users,
    isEarned: (s) => s.interviewsCompleted >= 5,
  },
  {
    id: "century-club",
    name: "Century Club",
    description: "Earn 100 points",
    icon: Star,
    isEarned: (s) => s.points >= 100,
  },
  {
    id: "high-scorer",
    name: "High Scorer",
    description: "Earn 500 points",
    icon: Zap,
    isEarned: (s) => s.points >= 500,
  },
  {
    id: "top-ten",
    name: "Top 10",
    description: "Reach rank 10 or better",
    icon: TrendingUp,
    isEarned: (s) => s.rank !== null && s.rank <= 10,
  },
  {
    id: "on-fire",
    name: "On Fire",
    description: "Keep a 3-day streak",
    icon: Flame,
    isEarned: (s) => s.streak >= 3,
  },
];

const WEEKLY_POINTS_TARGET = 1000;

function formatWeekLabelClient(weekStart?: string | null, weekEnd?: string | null): string {
  if (!weekStart || !weekEnd) return "";
  const parse = (value: string) => {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  };
  const start = parse(weekStart);
  const end = parse(weekEnd);
  if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}`;
}

function getMotivationalMessage(rank: number | null, points: number): string {
  if (rank === 1 && points > 0) {
    return "You are leading the competition. Keep solving to defend the top spot.";
  }
  if (rank !== null && rank <= 3 && points > 0) {
    return "Podium position. A few more answers could take you all the way to first place.";
  }
  if (rank !== null && rank <= 10 && points > 0) {
    return "Top 10 this week. Stay consistent to hold your position.";
  }
  if (points === 0) {
    return "Complete your first question or mock interview to get on the leaderboard.";
  }
  if (points < 250) {
    return "Solid start. Every correct answer adds 20 points to your total.";
  }
  if (points < 600) {
    return "Great pace. A mock interview is worth 100 points if you need a boost.";
  }
  return "Strong score this week. Finish strong and climb even higher.";
}

function computeLocalStreak(): number {
  try {
    const today = new Date();
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    const raw = window.localStorage.getItem("competition_daily_streak");
    const record = raw ? (JSON.parse(raw) as { lastDate?: string; current?: number }) : null;
    let current = 1;
    if (record && record.lastDate && typeof record.current === "number") {
      if (record.lastDate === key) current = Math.max(record.current, 1);
      else if (record.lastDate === yesterdayKey) current = record.current + 1;
      else current = 1;
    }
    window.localStorage.setItem("competition_daily_streak", JSON.stringify({ lastDate: key, current }));
    return current;
  } catch {
    return 1;
  }
}

export default function CompetitionPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [weekLabel, setWeekLabel] = useState("");
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0 });
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    rank: null,
    points: 0,
    questionsCompleted: 0,
    correctAnswers: 0,
    interviewsCompleted: 0,
    challengesCompleted: 0,
    nextRankPoints: null,
  });
  const [previousWeeks, setPreviousWeeks] = useState<PreviousWeek[]>([]);
  const [viewingHistory, setViewingHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  const fetchWeekLeaderboard = useCallback(async (targetWeekStart?: string) => {
    try {
      setError(null);
      if (targetWeekStart) {
        setHistoryLoading(true);
        const res = await fetch(`/api/competition/leaderboard?weekStart=${encodeURIComponent(targetWeekStart)}`);
        if (!res.ok) throw new Error("Failed to load that week");
        const data = await res.json();
        setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : []);
        setCurrentUserData({
          rank: data.currentUser?.rank ?? null,
          points: data.currentUser?.points ?? 0,
          questionsCompleted: data.currentUser?.questionsCompleted ?? 0,
          correctAnswers: data.currentUser?.correctAnswers ?? 0,
          interviewsCompleted: data.currentUser?.interviewsCompleted ?? 0,
          challengesCompleted: data.currentUser?.challengesCompleted ?? 0,
          nextRankPoints: data.currentUser?.nextRankPoints ?? null,
        });
        setWeekLabel(formatWeekLabelClient(data.weekStart, data.weekEnd));
        setViewingHistory(true);
      } else {
        setLoading(true);
        const res = await fetch("/api/competition/leaderboard");
        if (!res.ok) throw new Error("Failed to load the leaderboard");
        const data = await res.json();
        setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : []);
        setCurrentUserData({
          rank: data.currentUser?.rank ?? null,
          points: data.currentUser?.points ?? 0,
          questionsCompleted: data.currentUser?.questionsCompleted ?? 0,
          correctAnswers: data.currentUser?.correctAnswers ?? 0,
          interviewsCompleted: data.currentUser?.interviewsCompleted ?? 0,
          challengesCompleted: data.currentUser?.challengesCompleted ?? 0,
          nextRankPoints: data.currentUser?.nextRankPoints ?? null,
        });
        setCountdown({
          days: data.countdown?.days ?? 0,
          hours: data.countdown?.hours ?? 0,
          minutes: data.countdown?.minutes ?? 0,
        });
        setWeekLabel(formatWeekLabelClient(data.weekStart, data.weekEnd));
        setWeekStart(data.weekStart ?? "");
        setWeekEnd(data.weekEnd ?? "");
        setViewingHistory(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setHistoryLoading(false);
    }
  }, []);

  const goBackToCurrent = useCallback(() => {
    fetchWeekLeaderboard(undefined);
  }, [fetchWeekLeaderboard]);

  useEffect(() => {
    fetchWeekLeaderboard(undefined);
  }, [fetchWeekLeaderboard]);

  useEffect(() => {
    let cancelled = false;
    async function loadHistory() {
      try {
        const res = await fetch("/api/competition/history");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.previousWeeks)) {
          setPreviousWeeks(data.previousWeeks);
        }
      } catch {
        setPreviousWeeks([]);
      }
    }
    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (viewingHistory) return undefined;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0) return prev;
        let { days, hours, minutes } = prev;
        minutes -= 1;
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days -= 1;
        }
        if (days < 0) return { days: 0, hours: 0, minutes: 0 };
        return { days, hours, minutes };
      });
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [viewingHistory]);

  const clerkUserId = user?.id ?? null;
  const stats: BadgeStats = {
    points: currentUserData.points,
    questionsCompleted: currentUserData.questionsCompleted,
    interviewsCompleted: currentUserData.interviewsCompleted,
    streak: computeLocalStreak(),
    rank: currentUserData.rank,
  };

  const progressPercent = Math.min(
    100,
    Math.round((currentUserData.points / WEEKLY_POINTS_TARGET) * 100)
  );
  const earnedBadges = BADGES.filter((badge) => badge.isEarned(stats));

  const getMedalIcon = (rank: number) => {
    if (rank === 1) {
      return <Crown className="h-6 w-6 text-amber-500" />;
    }
    if (rank === 2) {
      return <Medal className="h-6 w-6 text-slate-400" />;
    }
    if (rank === 3) {
      return <Medal className="h-6 w-6 text-orange-400" />;
    }
    return <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">#{rank}</span>;
  };

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full px-4 py-8 space-y-8">
      <div className="flex items-center">
        {viewingHistory ? (
          <button
            onClick={goBackToCurrent}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Current Week
          </button>
        ) : (
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        )}
      </div>

      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Weekly Competition</h1>
          <p className="text-white/90 font-medium">{weekLabel || "Loading week..."}</p>
          <div className="flex items-center gap-2 bg-black/20 rounded-full px-5 py-2.5">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {viewingHistory ? "This competition has ended" : "Weekly competition ends in:"}{" "}
              {!viewingHistory &&
                `${countdown.days} Days ${countdown.hours} Hours ${countdown.minutes} Minutes`}
            </span>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Weekly Progress</h2>
          {loading || historyLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wide bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full">
              {viewingHistory ? "Selected Week" : "Current Week"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-500/10 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Current Rank</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentUserData.rank !== null ? `#${currentUserData.rank}` : "Unranked"}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-indigo-100 dark:bg-indigo-500/10 p-3 rounded-full">
              <Zap className="h-6 w-6 text-indigo-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 dark:text-slate-400">Weekly Points</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentUserData.points}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400"> / {WEEKLY_POINTS_TARGET}</span>
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-emerald-100 dark:bg-emerald-500/10 p-3 rounded-full">
              <Target className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Questions Completed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentUserData.questionsCompleted}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-violet-100 dark:bg-violet-500/10 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-violet-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Interviews Completed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentUserData.interviewsCompleted}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-red-100 dark:bg-red-500/10 p-3 rounded-full">
              <Flame className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Daily Streak</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.streak} {stats.streak === 1 ? "Day" : "Days"}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
            <div className="bg-cyan-100 dark:bg-cyan-500/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Next Rank At</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {currentUserData.nextRankPoints !== null ? `${currentUserData.nextRankPoints} pts` : "Leader"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Progress to weekly target</span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl p-4">
          <Star className="h-5 w-5 text-indigo-500 mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {getMotivationalMessage(currentUserData.rank, currentUserData.points)}
          </p>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">How to Earn Points</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {POINT_VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.activity}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center"
              >
                <div className={`p-2.5 rounded-full ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.activity}</p>
                <p className={`text-lg font-bold ${item.color}`}>{item.points}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Medal className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Leaderboard</h2>
          </div>
          {viewingHistory && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full">
              Past Week Results
            </span>
          )}
        </div>

        {loading || historyLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading rankings...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={goBackToCurrent}
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <Users className="h-8 w-8 text-slate-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No competitors yet for {viewingHistory ? "this week" : "this week"}.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Rank
                  </th>
                  <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    User
                  </th>
                  <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Points
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Questions
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const isCurrentUser =
                    (clerkUserId && entry.userId === clerkUserId) ||
                    (!viewingHistory && currentUserData.rank !== null && entry.rank === currentUserData.rank);
                  return (
                    <tr
                      key={`${entry.userId}-${entry.rank}`}
                      className={`border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors ${
                        isCurrentUser
                          ? "bg-indigo-50 dark:bg-indigo-500/10"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center justify-start min-w-[44px]">{getMedalIcon(entry.rank)}</div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900 dark:text-white">{entry.userName}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-indigo-600 text-white px-1.5 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-right">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{entry.points}</span>
                      </td>
                      <td className="py-3.5 text-right text-slate-500 dark:text-slate-400">
                        {entry.questionsCompleted}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Weekly Rewards</h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Earn exclusive achievement badges every week. No cash prizes, just bragging rights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-500/10 p-5 flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-500/20 p-3 rounded-full">
              <Crown className="h-7 w-7 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                1st Place
              </p>
              <p className="font-bold text-slate-900 dark:text-white">Champion Badge</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Awarded to the weekly top scorer.</p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-5 flex items-center gap-4">
            <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-full">
              <Medal className="h-7 w-7 text-slate-500 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                2nd Place
              </p>
              <p className="font-bold text-slate-900 dark:text-white">Runner-Up Badge</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Awarded to the second highest scorer.</p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-orange-300/60 bg-orange-50 dark:bg-orange-500/10 p-5 flex items-center gap-4">
            <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full">
              <Medal className="h-7 w-7 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                3rd Place
              </p>
              <p className="font-bold text-slate-900 dark:text-white">Third Place Badge</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Awarded to the third highest scorer.</p>
            </div>
          </div>
          <div className="rounded-xl border-2 border-indigo-300/60 bg-indigo-50 dark:bg-indigo-500/10 p-5 flex items-center gap-4">
            <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-full">
              <TrendingUp className="h-7 w-7 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                Top 10
              </p>
              <p className="font-bold text-slate-900 dark:text-white">Elite Ten Badge</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Everyone finishing in the top 10 earns this badge too.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Achievement Badges</h2>
          </div>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {earnedBadges.length}/{BADGES.length}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const earned = badge.isEarned(stats);
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 flex flex-col items-center text-center gap-2 transition-colors ${
                  earned
                    ? "border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                }`}
              >
                <div
                  className={`p-3 rounded-full ${
                    earned ? "bg-indigo-100 dark:bg-indigo-500/20" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                >
                  {earned ? (
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Lock className="h-6 w-6 text-slate-400" />
                  )}
                </div>
                <p className={`font-semibold ${earned ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}`}>
                  {badge.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    earned
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {earned ? "Earned" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="w-full flex items-center justify-between group"
          aria-expanded={showHistory}
        >
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Previous Competitions
            </h2>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
              showHistory ? "rotate-180" : ""
            }`}
          />
        </button>

        {showHistory && (
          <div className="mt-6">
            {previousWeeks.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
                No previous competition history yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Week
                      </th>
                      <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Rank
                      </th>
                      <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Points
                      </th>
                      <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousWeeks.map((week) => (
                      <tr
                        key={week.weekStart}
                        onClick={() => fetchWeekLeaderboard(week.weekStart)}
                        className="border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3.5 pr-4">
                          <span className="font-medium text-slate-900 dark:text-white">{week.label}</span>
                        </td>
                        <td className="py-3.5 pr-4 text-right">
                          <span className="text-slate-500 dark:text-slate-400">
                            {week.rank !== null ? `#${week.rank}` : "-"}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-right">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{week.points}</span>
                        </td>
                        <td className="py-3.5 text-right">
                          <ChevronRight className="h-4 w-4 inline-block text-slate-400" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
