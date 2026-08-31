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
import {
  LoaderCircle,
  Plus,
  Bot,
  Briefcase,
  FileText,
  Clock,
  Code2,
  CircuitBoard,
  Settings,
  UserCheck,
  Users2,
  Cpu,
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BRANCHES = [
  {
    id: "CSE",
    title: "CSE",
    subtitle: "Computer Science Engineering",
    icon: Code2,
    desc: "Programming, Data Structures, Algorithms, DBMS, OS & Networks",
  },
  {
    id: "ECE",
    title: "ECE",
    subtitle: "Electronics & Communication Engineering",
    icon: CircuitBoard,
    desc: "Digital & Analog Electronics, Communication Systems, Embedded",
  },
  {
    id: "Mechanical",
    title: "Mechanical",
    subtitle: "Mechanical Engineering",
    icon: Settings,
    desc: "Thermodynamics, Manufacturing, Machine Design, Fluid Mechanics",
  },
];

const INTERVIEW_TYPES = [
  { id: "Technical", title: "Technical Interview", icon: Cpu, desc: "Role-specific technical and subject questions" },
  { id: "HR", title: "HR Interview", icon: UserCheck, desc: "Skills, background, communication and culture fit" },
  { id: "Behavioral", title: "Behavioral Interview", icon: Users2, desc: "Past experiences, problem solving and teamwork" },
];

const STEPS = ["Branch", "Interview Type", "Details"];

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const clearForm = () => {
    setStep(0);
    setBranch("");
    setInterviewType("");
    setJobPosition("");
    setJobDesc("");
    setJobExperience("");
    setError("");
  };

  const openDialogHandler = () => {
    clearForm();
    setOpenDialog(true);
  };

  const canContinue = () => {
    if (step === 0) return branch !== "";
    if (step === 1) return interviewType !== "";
    return jobPosition.trim() !== "" && jobDesc.trim() !== "" && jobExperience.trim() !== "";
  };

  const goBack = () => {
    setError("");
    if (step > 0) setStep(step - 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPosition, jobDesc, jobExperience, branch, interviewType }),
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

  const renderStepContent = () => {
    // STEP 1: Branch selection
    if (step === 0) {
      return (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Choose Your Branch</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select the branch for your mock interview</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BRANCHES.map((b) => {
              const Icon = b.icon;
              const selected = branch === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranch(b.id)}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500/40"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 transition-transform group-hover:scale-110 ${selected ? "gradient-bg text-white shadow-lg shadow-indigo-500/20" : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{b.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{b.subtitle}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 leading-snug">{b.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // STEP 2: Interview type selection
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Choose Your Interview Type</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select the type of interview you want to practice</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INTERVIEW_TYPES.map((t) => {
              const Icon = t.icon;
              const selected = interviewType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setInterviewType(t.id)}
                  className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-500/40"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3 transition-transform group-hover:scale-110 ${selected ? "gradient-bg text-white shadow-lg shadow-indigo-500/20" : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // STEP 3: Details form
    return (
      <div className="space-y-4">
        {/* Selected branch / interview type summary */}
        <div className="flex flex-wrap gap-2">
          {branch && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200 dark:border-indigo-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              Branch: {branch}
            </span>
          )}
          {interviewType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold border border-purple-200 dark:border-purple-500/20">
              <Bot className="w-3.5 h-3.5" />
              Type: {interviewType}
            </span>
          )}
        </div>

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
      </div>
    );
  };

  // Footer navigation buttons (Back + Continue/Start)
  const renderFooter = () => {
    return (
      <div className="flex gap-3 justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
            step === 0
              ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex gap-3">
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

          {step < 2 ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || !canContinue()}
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
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 p-8 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        onClick={openDialogHandler}
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

      <Dialog open={openDialog} onOpenChange={(v) => { setOpenDialog(v); if (!v) clearForm(); }}>
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
                  {step === 0 && "Pick your branch to get started"}
                  {step === 1 && "Choose the interview type"}
                  {step === 2 && "Tell us about your target role"}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 w-full mt-4">
              {STEPS.map((label, i) => (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                      i < step
                        ? "bg-emerald-500 text-white"
                        : i === step
                        ? "gradient-bg text-white shadow-md shadow-indigo-500/30 scale-110"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}>
                      {i < step ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${
                      i === step ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"
                    }`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </DialogHeader>

          <form onSubmit={onSubmit} className="mt-4 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            {renderStepContent()}
            {renderFooter()}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
