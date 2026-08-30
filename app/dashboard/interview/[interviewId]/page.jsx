"use client";
import { Lightbulb, WebcamIcon, Bot, Briefcase, FileText, Clock, Video, VideoOff } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviewDetails();
  }, []);

  const fetchInterviewDetails = async () => {
    try {
      const res = await fetch(`/api/interviews/${params.interviewId}`);
      if (!res.ok) throw new Error("Failed to fetch interview");
      const data = await res.json();
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
          <p className="text-slate-500 dark:text-slate-400">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 dark:text-red-400 text-lg">Interview not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          <Bot className="w-4 h-4" />
          Interview Session
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Let&apos;s Get Started
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Review your details and enable webcam when ready
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Details */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Interview Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <Briefcase className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Position</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{interviewData.jobPosition}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <FileText className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tech Stack</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{interviewData.jobDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <Clock className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Experience</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{interviewData.jobExperience} years</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-bold">Information</span>
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-400/80 leading-relaxed">
              {process.env.NEXT_PUBLIC_INFORMATION || "Enable webcam and microphone for the best interview experience. You can also proceed without them."}
            </p>
          </div>
        </div>

        {/* Webcam */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {webCamEnabled ? (
              <div className="p-4 flex justify-center bg-slate-900">
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  height={300}
                  width={400}
                  mirrored={true}
                  className="rounded-xl"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <VideoOff className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Camera is off</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setWebCamEnabled((prev) => !prev)}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              webCamEnabled
                ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20"
                : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
            }`}
          >
            {webCamEnabled ? (
              <>
                <VideoOff className="w-4 h-4" />
                Close WebCam
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                Enable WebCam
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <button className="flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-200">
            Start Interview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
