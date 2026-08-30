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
import { LoaderCircle, Plus, Bot, Briefcase, FileText, Clock, Building2, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPosition,
          jobDesc,
          typeQuestion,
          company,
          jobExperience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate questions");
      }

      if (data.mockId) {
        setOpenDialog(false);
        router.push("/dashboard/pyq/" + data.mockId);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "There was an error processing the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-violet-200 dark:border-violet-500/30 p-8 hover:border-violet-400 dark:hover:border-violet-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-500/10 mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-7 h-7 text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Add New Questions
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate AI-powered question sets
          </p>
        </div>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                  Generate Questions
                </DialogTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  AI will create tailored practice questions
                </p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-4 space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <Briefcase className="w-4 h-4 text-slate-400" />
                Job Role / Position
              </label>
              <Input
                placeholder="e.g. Full Stack Developer"
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                value={jobPosition}
                required
                onChange={handleInputChange(setJobPosition)}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-slate-400" />
                Job Description / Tech Stack
              </label>
              <Textarea
                placeholder="e.g. React, Angular, Node.js, MySQL, Python"
                className="min-h-[80px] rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                value={jobDesc}
                required
                onChange={handleInputChange(setJobDesc)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Question Type
                </label>
                <Input
                  placeholder="e.g. CPP, Leetcode"
                  className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  value={typeQuestion}
                  required
                  onChange={handleInputChange(setTypeQuestion)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Target Company
                </label>
                <Input
                  placeholder="e.g. Google, Microsoft"
                  className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  value={company}
                  required
                  onChange={handleInputChange(setCompany)}
                />
              </div>
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
                className="h-11 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                value={jobExperience}
                required
                onChange={handleInputChange(setJobExperience)}
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setOpenDialog(false)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin w-4 h-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    Generate Questions
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

export default AddQuestions;
