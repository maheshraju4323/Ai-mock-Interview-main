"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cpu, Code, Terminal, Braces, FileCode, ArrowRight, Loader2, AlertCircle } from "lucide-react";

const SLUG_MAP = {
  "C Programming": "c-programming",
  "C++": "cpp",
  Python: "python",
};

const getCourseSlug = (title) =>
  SLUG_MAP[title] ||
  title
    .toLowerCase()
    .replace(/\+\+/g, "pp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const COURSE_STYLES = {
  "c-programming": {
    Icon: Terminal,
    tileBg: "bg-amber-50 dark:bg-amber-500/10",
    tileText: "text-amber-600 dark:text-amber-400",
    description: "100 questions across 10 topics covering pointers, memory management and core C concepts",
  },
  cpp: {
    Icon: Braces,
    tileBg: "bg-blue-50 dark:bg-blue-500/10",
    tileText: "text-blue-600 dark:text-blue-400",
    description: "100 questions across 10 topics covering OOP, STL, templates and modern C++ features",
  },
  python: {
    Icon: FileCode,
    tileBg: "bg-emerald-50 dark:bg-emerald-500/10",
    tileText: "text-emerald-600 dark:text-emerald-400",
    description: "100 questions across 10 topics covering data structures, functions and Python internals",
  },
};

const FALLBACK_STYLE = {
  Icon: Code,
  tileBg: "bg-indigo-50 dark:bg-indigo-500/10",
  tileText: "text-indigo-600 dark:text-indigo-400",
  description: "Practice questions across key topics to ace your technical interview",
};

const TechnicalPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      setCourses(await res.json());
    } catch (err) {
      console.error(err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <Cpu className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
              <Code className="w-4 h-4" />
              Technical Prep
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Technical Interview</h1>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Prepare for coding and technical interviews
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const slug = getCourseSlug(course.title);
            const style = COURSE_STYLES[slug] || FALLBACK_STYLE;
            const Icon = style.Icon;

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className={`p-3 rounded-xl w-fit mb-4 ${style.tileBg}`}>
                    <Icon className={`w-8 h-8 ${style.tileText}`} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed flex-1">
                    {style.description}
                  </p>

                  <Link
                    href={`/dashboard/technical/${slug}`}
                    className="mt-5 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    Start Practice
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TechnicalPage;
