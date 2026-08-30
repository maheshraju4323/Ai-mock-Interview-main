"use client";
import React, { useEffect, useState } from "react";
import { MessageSquare, CheckCircle2, BarChart3, HelpCircle } from "lucide-react";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    avgScore: 0,
    questionsPracticed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/interviews/list");
        if (!res.ok) throw new Error("Failed to fetch");
        const interviews = await res.json();

        let totalAnswered = 0;
        let totalRating = 0;
        let ratedCount = 0;
        let completed = 0;

        for (const interview of interviews) {
          try {
            const fbRes = await fetch(
              `/api/interviews/${interview.mockId}/feedback`
            );
            if (fbRes.ok) {
              const answers = await fbRes.json();
              if (answers.length > 0) {
                completed++;
                totalAnswered += answers.length;
                for (const ans of answers) {
                  const r = parseFloat(ans.rating);
                  if (!isNaN(r)) {
                    totalRating += r;
                    ratedCount++;
                  }
                }
              }
            }
          } catch {
            // skip failed feedback fetches
          }
        }

        setStats({
          totalInterviews: interviews.length,
          completedInterviews: completed,
          avgScore:
            ratedCount > 0
              ? Math.round((totalRating / ratedCount) * 10) / 10
              : 0,
          questionsPracticed: totalAnswered,
        });
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Interviews",
      value: stats.totalInterviews,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-400",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Completed",
      value: stats.completedInterviews,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Average Score",
      value: stats.avgScore > 0 ? `${stats.avgScore}/10` : "--",
      icon: BarChart3,
      color: "from-violet-500 to-purple-400",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Questions Practiced",
      value: stats.questionsPracticed,
      icon: HelpCircle,
      color: "from-orange-500 to-amber-400",
      iconBg: "bg-orange-50 dark:bg-orange-500/10",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-[0.07] rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500`}
            />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
              </div>
              <div
                className={`p-2.5 rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
