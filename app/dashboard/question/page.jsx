"use client";
import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
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
              AI-Powered
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Master Your Interviews
            </h1>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Comprehensive question preparation with AI-generated practice sets
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <AddQuestions />
      </div>

      <QuestionList />
    </div>
  );
};

export default Questions;
