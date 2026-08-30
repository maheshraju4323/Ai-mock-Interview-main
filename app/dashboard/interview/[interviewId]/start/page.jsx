"use client";
import React, { useState, useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviewDetails();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMockInterviewQuestion(JSON.parse(data.jsonMockResp));
      setInterviewData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {mockInterviewQuestion?.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeQuestionIndex
                    ? "bg-indigo-600 dark:bg-indigo-400 scale-125"
                    : i < activeQuestionIndex
                    ? "bg-emerald-400"
                    : "bg-slate-200 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}
          </span>
        </div>
        <Link
          href={`/dashboard/interview/${params.interviewId}/feedback`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Flag className="w-4 h-4" />
          End Interview
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
          disabled={activeQuestionIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {activeQuestionIndex === mockInterviewQuestion?.length - 1 ? (
          <Link
            href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
          >
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
              <Flag className="w-4 h-4" />
              End Interview
            </button>
          </Link>
        ) : (
          <button
            onClick={() =>
              setActiveQuestionIndex(
                Math.min(mockInterviewQuestion?.length - 1, activeQuestionIndex + 1)
              )
            }
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
