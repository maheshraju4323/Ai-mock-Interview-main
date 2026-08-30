"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus, Bot, Briefcase, FileText, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const clearForm = () => {
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosition, jobDesc, jobExperience }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create interview. Please try again.");
        return;
      }

      setOpenDialog(false);
      clearForm();
      router.push("/dashboard/interview/" + data.mockId);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 p-8 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Add New Interview
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create a new AI-powered mock interview
          </p>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl gradient-bg shadow-lg shadow-indigo-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Create Mock Interview
                </DialogTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Tell us about your target role
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-4 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Briefcase className="w-4 h-4 text-slate-400" />
                Job Role / Position
              </label>
              <Input
                placeholder="e.g. Full Stack Developer"
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={jobPosition}
                required
                onChange={(e) => {
                  setJobPosition(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-slate-400" />
                Job Description / Tech Stack
              </label>
              <Textarea
                placeholder="e.g. React, Node.js, Python, MySQL, AWS"
                className="min-h-[100px] rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={jobDesc}
                required
                onChange={(e) => {
                  setJobDesc(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-slate-400" />
                Years of Experience
              </label>
              <Input
                placeholder="e.g. 5"
                type="number"
                min="0"
                max="50"
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={jobExperience}
                required
                onChange={(e) => {
                  setJobExperience(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpenDialog(false);
                  clearForm();
                }}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin w-4 h-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Start Interview
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
