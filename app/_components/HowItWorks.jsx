import React from "react";
import { UserPlus, Target, MessageCircle, Trophy } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up and set up your profile with your job role, experience level, and career goals.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    step: "02",
    icon: Target,
    title: "Choose Interview Type",
    description:
      "Select from Technical, HR, Behavioral, or Coding interviews tailored to your needs.",
    color: "from-purple-500 to-purple-600",
  },
  {
    step: "03",
    icon: MessageCircle,
    title: "Answer AI Questions",
    description:
      "Engage with our AI interviewer through realistic questions and respond using voice or text.",
    color: "from-pink-500 to-pink-600",
  },
  {
    step: "04",
    icon: Trophy,
    title: "Get Performance Report",
    description:
      "Receive a detailed performance report with ratings, feedback, and actionable improvement tips.",
    color: "from-amber-500 to-orange-600",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Start practicing in{" "}
            <span className="gradient-text">4 simple steps</span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Get started with AI-powered mock interviews in minutes. Our
            platform makes interview preparation simple and effective.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative text-center group">
                {/* Step Circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-white shadow-xl border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative z-10">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-bg flex items-center justify-center z-20">
                    <span className="text-xs font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
