"use client";
import React, { useEffect, useState } from "react";
import QuestionItemCard from "./QuestionItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";

const QuestionList = () => {
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetQuestionList();
  }, []);

  const GetQuestionList = async () => {
    try {
      const res = await fetch("/api/questions/list");
      if (!res.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await res.json();
      setQuestionList(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load previous mock questions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4"
          >
            <Skeleton className="h-5 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        Previous Question Sets
      </h3>
      {questionList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {questionList.map((question, index) => (
            <QuestionItemCard key={index} question={question} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">
            No question sets generated yet.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Create your first set above to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
