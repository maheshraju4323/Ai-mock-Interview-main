"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bot, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import InterviewList from "./_components/InterviewList";
import StatsCards from "./_components/StatsCards";

const Dashboard = () => {
  const { user } = useUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Welcome back, {firstName}!</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              AI Mock Interview
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Practice smarter. Interview better. Get AI-powered feedback on your
              responses and track your improvement over time.
            </p>
            <Link
              href="#add-new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Create New Interview
            </Link>
          </div>

          <div className="hidden md:flex shrink-0">
            <div className="w-40 h-40 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-2xl">
              <Bot className="w-20 h-20 text-white/90" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <StatsCards />

      {/* Add New Interview Card */}
      <div id="add-new">
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;
