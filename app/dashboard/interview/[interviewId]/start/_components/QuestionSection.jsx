import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        {/* Question Chips */}
        <div className="flex flex-wrap gap-2">
          {mockInterviewQuestion.map((_, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-default ${
                activeQuestionIndex === index
                  ? "gradient-bg text-white shadow-md shadow-indigo-500/20"
                  : index < activeQuestionIndex
                  ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              Q{index + 1}
            </span>
          ))}
        </div>

        {/* Question */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Question {activeQuestionIndex + 1}
            </span>
            <button
              onClick={() =>
                textToSpeech(
                  mockInterviewQuestion[activeQuestionIndex]?.Question
                )
              }
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
              title="Listen to question"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
            {mockInterviewQuestion[activeQuestionIndex]?.Question}
          </h2>
        </div>

        {/* Note */}
        <div className="hidden md:flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
          <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE ||
              "Take a moment to think before recording your answer. Speak clearly and provide detailed responses."}
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
