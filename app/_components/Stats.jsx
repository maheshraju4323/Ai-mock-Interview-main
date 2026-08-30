import React from "react";
import { MessageSquare, FolderOpen, BarChart3, Clock } from "lucide-react";

const stats = [
  {
    icon: MessageSquare,
    number: "10,000+",
    label: "AI Generated Questions",
    description: "Across all categories",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: FolderOpen,
    number: "50+",
    label: "Interview Categories",
    description: "Covering all industries",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: BarChart3,
    number: "95%",
    label: "Performance Analysis",
    description: "Accuracy in feedback",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Practice Anytime",
    description: "No scheduling needed",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

const Stats = () => {
  return (
    <section className="py-20 sm:py-28 hero-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Trusted by thousands of job seekers
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join the community preparing for their dream careers with AI
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white mb-1">
                  {stat.number}
                </p>
                <p className="text-lg font-semibold text-white">
                  {stat.label}
                </p>
                <p className="text-sm text-white/60 mt-1">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
