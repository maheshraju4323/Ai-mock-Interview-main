"use client";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import AddNewInterview from "./AddNewInterview";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Plus, Sparkles } from "lucide-react";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/interviews/list");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInterviewList(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Previous Mock Interviews
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your past interviews and track progress
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4"
            >
              <Skeleton className="h-5 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-3 w-1/3 rounded-lg" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 flex-1 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : interviewList.length === 0 ? (
        /* Empty State */
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 md:p-16 text-center">
          <div className="absolute top-4 left-4 w-20 h-20 bg-indigo-100 dark:bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-purple-100 dark:bg-purple-500/10 rounded-full blur-2xl" />

          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-bg shadow-lg shadow-indigo-500/30 mb-6">
            <Bot className="w-10 h-10 text-white" />
          </div>

          <h3 className="relative text-xl font-bold text-slate-900 dark:text-white mb-2">
            No interviews yet
          </h3>
          <p className="relative text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            Create your first AI mock interview and start practicing with
            personalized questions and real-time feedback.
          </p>

          <AddNewInterview />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {interviewList.map((interview, index) => (
              <InterviewItemCard key={index} interview={interview} />
            ))}
          </div>

          <div className="flex justify-center">
            <AddNewInterview />
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewList;
