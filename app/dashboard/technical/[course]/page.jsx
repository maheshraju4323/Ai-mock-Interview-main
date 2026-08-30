"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Lightbulb,
  Loader2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

const COURSE_NAME_MAP = {
  "c-programming": "C Programming",
  cpp: "C++",
  python: "Python",
};

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const DIFFICULTY_BADGE = {
  Easy: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
  Medium:
    "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
  Hard: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20",
};

const parseOptions = (options) => {
  if (!options) return [];
  try {
    const parsed = JSON.parse(options);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return String(options)
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }
};

const TechnicalQuestions = ({ params }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const res = await fetch(`/api/courses/${params.course}`);
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const topics = useMemo(
    () => Array.from(new Set(questions.map((q) => q.topic).filter(Boolean))),
    [questions]
  );

  const filteredQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          (difficultyFilter === "All" || q.difficulty === difficultyFilter) &&
          (topicFilter === "All" || q.topic === topicFilter)
      ),
    [questions, difficultyFilter, topicFilter]
  );

  const courseName = COURSE_NAME_MAP[params.course] || params.course;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-32 text-center">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-slate-500 dark:text-slate-400">{error}</p>
        <Link
          href="/dashboard/technical"
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard/technical")}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
            aria-label="Back to courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              {courseName}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Technical Questions · {filteredQuestions.length} of {questions.length} questions
            </p>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {DIFFICULTIES.map((level) => {
            const isActive = difficultyFilter === level;
            return (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? level === "Easy"
                      ? DIFFICULTY_BADGE.Easy + " ring-2 ring-emerald-300 dark:ring-emerald-500/40"
                      : level === "Medium"
                        ? DIFFICULTY_BADGE.Medium + " ring-2 ring-amber-300 dark:ring-amber-500/40"
                        : level === "Hard"
                          ? DIFFICULTY_BADGE.Hard + " ring-2 ring-red-300 dark:ring-red-500/40"
                          : "bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/40"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic Filter */}
      {topics.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {["All", ...topics].map((topic) => {
            const isActive = topicFilter === topic;
            return (
              <button
                key={topic}
                onClick={() => setTopicFilter(topic)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 dark:bg-blue-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      )}

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-600" />
          <p className="text-slate-500 dark:text-slate-400">
            No questions match the selected filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => {
            const isExpanded = expandedId === q.id;
            const options = parseOptions(q.options);
            const difficultyBadge =
              DIFFICULTY_BADGE[q.difficulty] || DIFFICULTY_BADGE.Medium;

            return (
              <div
                key={q.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? "border-indigo-300 dark:border-blue-500/40 shadow-lg"
                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-blue-500/30 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white text-sm font-bold">
                      {index + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyBadge}`}
                        >
                          {q.difficulty}
                        </span>
                        {q.topic && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {q.topic}
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    <ChevronDown
                      className={`shrink-0 w-5 h-5 text-slate-400 transition-transform duration-300 mt-3 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pl-[68px] space-y-4">
                    {/* Options */}
                    {options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {options.map((option, optIndex) => {
                          const isCorrect = option === q.correctAnswer;
                          return (
                            <div
                              key={optIndex}
                              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm border transition-colors ${
                                isCorrect
                                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold"
                                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              <span
                                className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                  isCorrect
                                    ? "bg-emerald-500 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              {option}
                              {isCorrect && <CheckCircle2 className="w-4 h-4 ml-auto shrink-0" />}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50 dark:bg-blue-500/10 border border-indigo-100 dark:border-blue-500/20">
                      <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-indigo-700 dark:text-blue-400 mb-1">
                          Explanation
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TechnicalQuestions;
