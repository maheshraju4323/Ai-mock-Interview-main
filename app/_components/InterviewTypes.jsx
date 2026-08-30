import React from "react";
import {
  Code2,
  Users,
  Brain,
  Terminal,
  ArrowRight,
} from "lucide-react";

const types = [
  {
    icon: Code2,
    title: "Technical",
    description:
      "Data structures, algorithms, system design, and architecture questions for engineering roles.",
    color: "from-indigo-500 to-blue-600",
    skills: ["System Design", "Algorithms", "Architecture"],
  },
  {
    icon: Users,
    title: "HR",
    description:
      "Behavioral questions about leadership, teamwork, conflict resolution, and workplace culture fit.",
    color: "from-purple-500 to-violet-600",
    skills: ["Behavioral", "Leadership", "Culture Fit"],
  },
  {
    icon: Brain,
    title: "Behavioral",
    description:
      "STAR method questions focusing on past experiences, problem-solving, and decision-making abilities.",
    color: "from-pink-500 to-rose-600",
    skills: ["STAR Method", "Problem Solving", "Decisions"],
  },
  {
    icon: Terminal,
    title: "Coding",
    description:
      "Live coding challenges with real-time evaluation and hints to improve your coding proficiency.",
    color: "from-cyan-500 to-teal-600",
    skills: ["Live Coding", "Debugging", "Optimization"],
  },
];

const InterviewTypes = () => {
  return (
    <section id="interview-types" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-pink-600 bg-pink-50 px-4 py-1.5 rounded-full mb-4">
            Interview Types
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Choose your{" "}
            <span className="gradient-text">interview style</span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            We support every major interview format so you can prepare for any
            role — from software engineering to management.
          </p>
        </div>

        {/* Type Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 card-hover"
              >
                {/* Top Gradient Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${type.color}`} />

                <div className="p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {type.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-500 leading-relaxed mb-5">
                    {type.description}
                  </p>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {type.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group-hover:gap-2.5 transition-all duration-300"
                  >
                    Start Practice
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InterviewTypes;
