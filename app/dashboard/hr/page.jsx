"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Users,
  MessageSquare,
  Star,
  Target,
  Crown,
  Shield,
  Brain,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

const CATEGORY_ICONS = {
  Introduction: User,
  "Strengths and Weaknesses": Star,
  "Career Goals": Target,
  Teamwork: Users,
  Leadership: Crown,
  "Conflict Management": Shield,
  Communication: MessageSquare,
  Behavioral: Brain,
  Situational: Lightbulb,
};

const HrPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expanded, setExpanded] = useState({});
  const [hrPointsAwarded, setHrPointsAwarded] = useState({});
  const categoryRefs = useRef({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/hr-questions");
        if (!res.ok) throw new Error("Failed to fetch HR questions");
        const data = await res.json();
        setQuestions(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const grouped = questions.reduce((acc, q) => {
    const category = q.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(q);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const handleCategoryClick = (category) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    const node = categoryRefs.current[category];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleQuestion = (id) => {
    const willOpen = !expanded[id];
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    if (willOpen && !hrPointsAwarded[id]) {
      setHrPointsAwarded((prev) => ({ ...prev, [id]: true }));
      fetch("/api/competition/awards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityType: "hr_question", activityId: id }),
      }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 p-8 md:p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="relative flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
                <MessageSquare className="w-4 h-4" />
                HR Preparation
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                HR Interview Questions
              </h1>
              <p className="text-white/80 mt-2 text-base md:text-lg">
                Ace behavioral and situational interview rounds
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400">
              Loading HR questions...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-500 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
              <MessageSquare className="w-4 h-4" />
              HR Preparation
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              HR Interview Questions
            </h1>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Ace behavioral and situational interview rounds
            </p>
          </div>
        </div>
      </section>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {!error && categories.length === 0 && (
        <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Users className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
          <p className="mt-3 font-medium text-slate-600 dark:text-slate-300">
            No HR questions available yet.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Check back soon for preparation material.
          </p>
        </div>
      )}

      {/* Category Cards */}
      {categories.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Question Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon =
                CATEGORY_ICONS[category] || MessageSquare;
              const count = grouped[category].length;
              const isOpen = !!expandedCategories[category];
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left ${
                    isOpen ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {count} {count === 1 ? "Question" : "Questions"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    {category}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                    {isOpen ? "Hide questions" : "View questions"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Questions by Category */}
      {categories.map((category) => {
        const list = grouped[category];
        const isCategoryOpen = expandedCategories[category];
        return (
          <section
            key={category}
            id={`hr-category-${category.replace(/\s+/g, "-").toLowerCase()}`}
            ref={(el) => {
              categoryRefs.current[category] = el;
            }}
            className="scroll-mt-24 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {category}{" "}
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  ({list.length})
                </span>
              </h2>
              <button
                type="button"
                onClick={() =>
                  setExpandedCategories((prev) => ({
                    ...prev,
                    [category]: !prev[category],
                  }))
                }
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
              >
                {isCategoryOpen ? "Collapse" : "Expand"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {(isCategoryOpen || expandedCategories[category] === undefined) && (
              <div className="space-y-3">
                {list.map((q, index) => {
                  const isOpen = !!expanded[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full flex items-start gap-4 p-5 text-left cursor-pointer"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="flex-1 font-bold text-slate-900 dark:text-white">
                          {q.question}
                        </span>
                        <ChevronDown
                          className={`flex-shrink-0 w-5 h-5 mt-0.5 text-slate-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pl-[4.25rem] space-y-3">
                          {q.suggestedAnswer && (
                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                                Suggested Answer
                              </p>
                              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                                {q.suggestedAnswer}
                              </p>
                            </div>
                          )}
                          {q.tips && (
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400">
                                Tips
                              </p>
                              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                                {q.tips}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default HrPage;
