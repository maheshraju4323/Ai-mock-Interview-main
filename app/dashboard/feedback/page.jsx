"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  MessageSquare,
  ClipboardCheck,
  Briefcase,
  FileText,
  Clock,
  ChevronDown,
  Star,
  Award,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllFeedback = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchAllFeedback();
  }, []);

  const fetchAllFeedback = async () => {
    try {
      const res = await fetch("/api/interviews/all-feedback");
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const totalInterviews = data.length;
    const totalAnswers = data.reduce(
      (sum, item) => sum + Number(item.totalQuestions || 0),
      0
    );
    let ratingSum = 0;
    let ratingCount = 0;
    let bestRating = 0;
    data.forEach((interview) => {
      (interview.feedback || []).forEach((item) => {
        const r = Number(item.rating || 0);
        ratingSum += r;
        ratingCount += 1;
        if (r > bestRating) bestRating = r;
      });
    });
    const avgRating =
      ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : "0.0";
    return { totalInterviews, totalAnswers, avgRating, bestRating };
  }, [data]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getRatingColor = (rating) => {
    const r = Number(rating);
    if (r >= 7) return "text-emerald-500";
    if (r >= 4) return "text-amber-500";
    return "text-red-500";
  };

  const getRatingPill = (rating) => {
    const r = Number(rating);
    if (r >= 7)
      return "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400";
    if (r >= 4)
      return "bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400";
    return "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400";
  };

  const formatDate = (value) => {
    try {
      return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (err) {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading feedback...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Interviews",
      value: stats.totalInterviews,
      Icon: Briefcase,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      label: "Avg Rating",
      value: `${stats.avgRating}/10`,
      Icon: Star,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "Total Questions",
      value: stats.totalAnswers,
      Icon: HelpCircle,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
    },
    {
      label: "Best Rating",
      value: stats.bestRating || "-",
      Icon: Award,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <button
        onClick={() => router.replace("/dashboard")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
              <ClipboardCheck className="w-4 h-4" />
              Real Feedback
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Interview Feedback</h1>
            <p className="text-white/80 mt-2 text-base md:text-lg">Review your completed interview performance</p>
          </div>
        </div>
      </section>

      {data.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No interview feedback yet.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Complete your first mock interview to see feedback here.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 mt-6 px-6 py-3 font-semibold text-sm text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map(({ label, value, Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interview Cards */}
          <div className="space-y-4">
            {data.map((interview) => {
              const isOpen = Boolean(expanded[interview.id]);
              return (
                <div key={interview.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <button
                    onClick={() => toggleExpand(interview.id)}
                    className="w-full p-5 text-left flex flex-wrap items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {interview.jobPosition}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {interview.jobDesc}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          {interview.jobExperience}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(interview.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-sm font-bold ${getRatingColor(interview.avgRating)}`}>
                        {interview.avgRating != null ? `${interview.avgRating}/10` : "N/A"}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                        <FileText className="w-3.5 h-3.5" />
                        {interview.totalQuestions} Q{interview.totalQuestions !== 1 ? "s" : ""}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800">
                      {(interview.feedback || []).map((item, index) => (
                        <div key={index} className="pt-4 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              <span className="text-slate-400 dark:text-slate-500 mr-2">
                                Question {index + 1}.
                              </span>
                              {item.question}
                            </p>
                            <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${getRatingPill(item.rating)}`}>
                              <Star className="w-3.5 h-3.5" />
                              {item.rating}/10
                            </span>
                          </div>
                          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                            <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Your Answer</p>
                            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">{item.userAns}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Correct Answer</p>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">{item.correctAns}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">AI Feedback</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">{item.feedback}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AllFeedback;
