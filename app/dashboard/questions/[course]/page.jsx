"use client";
import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

const DIFFICULTY_BADGE = {
  Easy: { classes: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" },
  Medium: { classes: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20" },
  Hard: { classes: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20" },
};

const parseOptions = (options) => {
  if (!options) return [];
  if (Array.isArray(options)) return options;
  try {
    const parsed = JSON.parse(options);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const QuestionCard = ({ question, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState(false);
  const options = parseOptions(question.options);
  const badge = DIFFICULTY_BADGE[question.difficulty] || DIFFICULTY_BADGE.Medium;

  const handleExpand = async () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (newExpanded && !pointsAwarded) {
      try {
        const res = await fetch("/api/competition/awards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activityType: "question_completed", activityId: question.id || index }),
        });
        if (res.ok) setPointsAwarded(true);
      } catch (e) {}
    }
  };

  const handleSelect = (optIndex) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optIndex);
    if (!expanded) {
      setExpanded(true);
      if (!pointsAwarded) {
        fetch("/api/competition/awards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activityType: "question_completed", activityId: question.id || index }),
        }).then((res) => { if (res.ok) setPointsAwarded(true); }).catch(() => {});
      }
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <button onClick={handleExpand} className="w-full text-left p-5 cursor-pointer">
        <div className="flex items-start gap-4">
          <span className="shrink-0 w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.classes}`}>
                {question.difficulty}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20">
                {question.topic}
              </span>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white">{question.question}</p>
          </div>
          <ChevronDown className={`shrink-0 w-5 h-5 text-slate-400 mt-1 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pl-[68px] space-y-4">
          {options.length > 0 && (
            <div className="space-y-2">
              {options.map((option, optIndex) => {
                const letter = String.fromCharCode(65 + optIndex);
                const isThisCorrect = letter === question.correctAnswer;
                const isSelected = selectedAnswer === optIndex;
                const showResult = selectedAnswer !== null;
                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelect(optIndex)}
                    disabled={selectedAnswer !== null}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
                      showResult && isThisCorrect
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30 font-semibold"
                        : showResult && isSelected && !isThisCorrect
                        ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-300 dark:border-red-500/30 font-semibold"
                        : "bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      showResult && isThisCorrect
                        ? "bg-emerald-500 text-white"
                        : showResult && isSelected && !isThisCorrect
                        ? "bg-red-500 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}>
                      {letter}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          )}

          <div className="rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-1">Explanation</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const CourseQuestions = ({ params }) => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/question-sets/courses/${params.course}`);
        const data = await res.json();
        if (isMounted) {
          setCourseName(data.course || params.course);
          setQuestions(Array.isArray(data.questions) ? data.questions : []);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        if (isMounted) {
          setCourseName(params.course);
          setQuestions([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchQuestions();
    return () => { isMounted = false; };
  }, [params.course]);

  const topics = useMemo(() => {
    const unique = [...new Set(questions.map((q) => q.topic).filter(Boolean))];
    return ["All", ...unique];
  }, [questions]);

  const filteredQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          (difficulty === "All" || q.difficulty === difficulty) &&
          (topic === "All" || q.topic === topic)
      ),
    [questions, difficulty, topic]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/questions")}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            {courseName} Questions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {loading ? "Loading..." : `${filteredQuestions.length} of ${questions.length} questions`}
          </p>
        </div>
      </div>

      {!loading && questions.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 w-fit">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  difficulty === level
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-violet-500/40 transition-shadow"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Topics" : t}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400">Loading questions...</p>
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No questions found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <QuestionCard key={question.id || index} question={question} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseQuestions;
