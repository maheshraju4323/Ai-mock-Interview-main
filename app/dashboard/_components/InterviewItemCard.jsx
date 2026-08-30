import React from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Clock,
  Calendar,
  Play,
  MessageSquare,
} from "lucide-react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  const dateStr = interview?.createdAt
    ? new Date(interview.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 shrink-0">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white truncate">
              {interview?.jobPosition}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {interview?.jobExperience} yrs exp
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {dateStr}
              </span>
            </div>
          </div>
        </div>

        {interview?.jobDesc && (
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
            {interview.jobDesc}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onFeedback}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </button>
          <button
            onClick={onStart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-200"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
