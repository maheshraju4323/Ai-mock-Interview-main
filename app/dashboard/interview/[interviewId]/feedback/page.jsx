"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown, Trophy, Star, ArrowLeft, MessageSquare } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}/feedback`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const total = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
      return (total / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading your feedback...</p>
        </div>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    const r = Number(rating);
    if (r >= 7) return "text-emerald-500";
    if (r >= 4) return "text-amber-500";
    return "text-red-500";
  };

  const getRatingBg = (rating) => {
    const r = Number(rating);
    if (r >= 7) return "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    if (r >= 4) return "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
    return "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <button
        onClick={() => router.replace("/dashboard")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {feedbackList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No feedback available yet.</p>
        </div>
      ) : (
        <>
          {/* Overall Score Card */}
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg shadow-lg shadow-indigo-500/20 mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
              Interview Complete!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Here&apos;s your performance summary
            </p>

            <div className="inline-flex items-baseline gap-1 px-8 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className={`text-5xl font-extrabold ${Number(overallRating) >= 5 ? "text-emerald-500" : "text-red-500"}`}>
                {overallRating}
              </span>
              <span className="text-xl font-bold text-slate-400 dark:text-slate-500">/10</span>
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Based on {feedbackList.length} question{feedbackList.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Question Breakdown */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Question Breakdown
            </h3>
            <div className="space-y-3">
              {feedbackList.map((item, index) => (
                <Collapsible key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-5 text-left flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${getRatingBg(item.rating)} ${getRatingColor(item.rating)} border`}>
                      {item.rating}
                    </div>
                    <span className="flex-1 text-sm font-medium text-slate-900 dark:text-white line-clamp-1">
                      {item.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-5 pb-5 space-y-3">
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
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => router.replace("/dashboard")}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-sm text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
