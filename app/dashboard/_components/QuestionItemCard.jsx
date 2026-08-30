import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, Calendar, Play } from "lucide-react";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  const dateStr = question?.createdAt
    ? new Date(question.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-500/10 shrink-0">
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white truncate">
              {question?.jobPosition}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {question?.jobExperience} yrs exp
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {dateStr}
              </span>
            </div>
          </div>
        </div>

        {question?.company && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Target: {question.company}
          </p>
        )}

        <button
          onClick={onStart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-md shadow-violet-500/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
          <Play className="w-4 h-4" />
          Start
        </button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
