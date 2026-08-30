"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const Hero = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-[0.07]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-30" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Left Content */}
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Ace Your Next{" "}
              <span className="gradient-text">Interview</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Practice with AI-powered mock interviews that adapt to your
              experience level. Get instant, personalized feedback and
              performance reports to land your dream job.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white gradient-bg rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-300"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white gradient-bg rounded-2xl shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-300">
                    Start Mock Interview
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </SignInButton>
              )}
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
