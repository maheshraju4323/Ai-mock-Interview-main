"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  Calendar,
  Target,
  ArrowLeft,
  Activity,
  Zap,
  Star,
} from "lucide-react";
import Link from "next/link";

const DEFAULT_STATS = {
  totalInterviews: 0,
  totalAnswers: 0,
  avgRating: "0",
  ratingDistribution: {},
  activityByDate: [],
  recentInterviews: [],
};

const RATING_BUCKETS = [
  { key: "1-3", label: "1-3", barClass: "bg-red-500" },
  { key: "4-5", label: "4-5", barClass: "bg-amber-500" },
  { key: "6-7", label: "6-7", barClass: "bg-emerald-500" },
  { key: "8-10", label: "8-10", barClass: "bg-blue-500" },
];

const DAY_MS = 24 * 60 * 60 * 1000;

const computeStreak = (activityByDate = []) => {
  if (!activityByDate.length) return 0;
  const days = [
    ...new Set(
      activityByDate.map((a) => {
        const d = new Date(a.date);
        return Number.isNaN(d.getTime()) ? null : d.setHours(0, 0, 0, 0);
      })
    ),
  ].filter((d) => d !== null);
  if (!days.length) return 0;
  days.sort((a, b) => b - a);
  let streak = 1;
  for (let i = 0; i < days.length - 1; i++) {
    if (Math.round((days[i] - days[i + 1]) / DAY_MS) === 1) streak++;
    else break;
  }
  return streak;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatShortDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const Performance = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/interviews/stats");
      if (!res.ok) throw new Error("Failed to fetch performance stats");
      const data = await res.json();
      setStats({ ...DEFAULT_STATS, ...data });
    } catch (error) {
      console.error(error);
      setStats(DEFAULT_STATS);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading performance data...</p>
        </div>
      </div>
    );
  }

  const safeStats = stats || DEFAULT_STATS;
  const totalInterviews = Number(safeStats.totalInterviews || 0);
  const ratingDist = safeStats.ratingDistribution || {};
  const activityByDate = safeStats.activityByDate || [];
  const recentInterviews = safeStats.recentInterviews || [];

  const buckets = RATING_BUCKETS.map((bucket) => ({
    ...bucket,
    count: Number(ratingDist[bucket.key] || 0),
  }));
  const totalRatings = buckets.reduce((sum, b) => sum + b.count, 0);
  const maxBucketCount = Math.max(...buckets.map((b) => b.count), 1);
  const bestBucket = buckets.reduce((best, b) => (b.count > best.count ? b : best), { key: null, label: "-", count: 0 });

  const maxActivityCount = Math.max(...activityByDate.map((a) => Number(a.count || 0)), 1);
  const streak = computeStreak(activityByDate);

  const statCards = [
    {
      icon: Target,
      value: totalInterviews,
      label: "Total Interviews",
      boxClass: "bg-indigo-50 dark:bg-indigo-500/10",
      iconClass: "text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Zap,
      value: Number(safeStats.totalAnswers || 0),
      label: "Questions Answered",
      boxClass: "bg-emerald-50 dark:bg-emerald-500/10",
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Star,
      value: safeStats.avgRating || "0",
      label: "Average Rating",
      boxClass: "bg-amber-50 dark:bg-amber-500/10",
      iconClass: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Activity,
      value: streak,
      label: "Interview Streak",
      boxClass: "bg-rose-50 dark:bg-rose-500/10",
      iconClass: "text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {totalInterviews === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No performance data yet.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Complete your first mock interview to start tracking your progress.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 font-semibold text-sm text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <>
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 md:p-12 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
                  <Activity className="w-4 h-4" />
                  Analytics
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Performance Reports</h1>
                <p className="text-white/80 mt-2 text-base md:text-lg">Track your interview preparation progress</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${card.boxClass}`}>
                    <card.icon className={`w-5 h-5 ${card.iconClass}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{card.value}</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Rating Distribution
              </h3>
              {totalRatings === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                  Complete interviews to see how your answers are rated.
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    {buckets.map((bucket) => (
                      <div key={bucket.key} className="flex items-center gap-4">
                        <span className="w-10 shrink-0 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">
                          {bucket.label}
                        </span>
                        <div className="flex-1 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-lg ${bucket.barClass}`}
                            style={{ width: `${(bucket.count / maxBucketCount) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 shrink-0 text-sm font-bold text-slate-900 dark:text-white">{bucket.count}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Based on {totalRatings} rated answer{totalRatings !== 1 ? "s" : ""}, most score in the {bestBucket.key || "-"} range
                  </div>
                </>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Recent Interviews
              </h3>
              {recentInterviews.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">No interviews yet</p>
              ) : (
                <div className="space-y-3">
                  {recentInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60"
                    >
                      <div className="shrink-0 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10">
                        <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize truncate">
                          {interview.jobPosition}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formatDate(interview.createdAt)}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {interview.avgRating ?? "-"}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {interview.totalQuestions} Qs
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Daily Activity
            </h3>
            {activityByDate.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">
                No activity recorded yet. Complete interviews to see your progress here.
              </p>
            ) : (
              <div className="flex items-end gap-3 overflow-x-auto pb-2 h-56">
                {activityByDate.map((day) => (
                  <div key={day.date} className="flex flex-col items-center gap-2 min-w-[40px] flex-1 h-full justify-end">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{day.count}</span>
                    <div
                      className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-400 hover:opacity-80 transition-opacity"
                      style={{ height: `${Math.max((Number(day.count || 0) / maxActivityCount) * 80, 4)}%` }}
                    />
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {formatShortDate(day.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Performance;
