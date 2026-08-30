"use client";
import React, { useEffect, useState } from "react";
import { BookOpen, Sparkles, Code, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const COURSE_STYLES = {
  "c programming": {
    emoji: "C",
    iconClasses: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
    accent: "from-amber-500 to-orange-500",
  },
  "c++": {
    emoji: "C++",
    iconClasses: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20",
    accent: "from-blue-500 to-indigo-500",
  },
  python: {
    emoji: "Py",
    iconClasses: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
    accent: "from-emerald-500 to-green-500",
  },
  "java programming": {
    emoji: "Jv",
    iconClasses: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20",
    accent: "from-red-500 to-rose-500",
  },
  javascript: {
    emoji: "JS",
    iconClasses: "bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20",
    accent: "from-yellow-500 to-amber-500",
  },
  sql: {
    emoji: "SQ",
    iconClasses: "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20",
    accent: "from-cyan-500 to-teal-500",
  },
  "data structures": {
    emoji: "DS",
    iconClasses: "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-500/20",
    accent: "from-pink-500 to-fuchsia-500",
  },
  algorithms: {
    emoji: "Al",
    iconClasses: "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20",
    accent: "from-violet-500 to-purple-500",
  },
  dbms: {
    emoji: "DB",
    iconClasses: "bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/20",
    accent: "from-teal-500 to-cyan-500",
  },
  "operating systems": {
    emoji: "OS",
    iconClasses: "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20",
    accent: "from-orange-500 to-red-500",
  },
  "computer networks": {
    emoji: "CN",
    iconClasses: "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20",
    accent: "from-indigo-500 to-blue-500",
  },
};

const getStyle = (title) =>
  COURSE_STYLES[title?.toLowerCase()?.trim()] || {
    emoji: <Code className="w-6 h-6" />,
    iconClasses: "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20",
    accent: "from-violet-500 to-purple-500",
  };

const QuestionsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/question-sets/courses");
        const data = await res.json();
        if (isMounted) setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        if (isMounted) setCourses([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCourses();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="relative flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Course Practice
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Question Banks
            </h1>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Practice across 11 subjects with 100 curated questions each
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No courses found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const title = course.course;
            const slug = title.toLowerCase().replace(/\s+/g, "-");
            const style = getStyle(title);
            return (
              <Link
                key={title}
                href={`/dashboard/questions/${slug}`}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${style.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold ${style.iconClasses}`}>
                      {style.emoji}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{course.count} questions</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-md shadow-violet-500/20 group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-200">
                    Practice
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
