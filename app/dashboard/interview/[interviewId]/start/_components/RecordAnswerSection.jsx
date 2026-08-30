"use client";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Mic, MicOff, Video, VideoOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { WebCamContext } from "@/app/dashboard/layout";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setUserAnswer("");
  }, [activeQuestionIndex]);

  const saveAnswer = useCallback(async (answer) => {
    if (!answer || answer.trim().length <= 10) return;
    if (!interviewData?.mockId || !mockInterviewQuestion?.[activeQuestionIndex]) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/interviews/${interviewData.mockId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: mockInterviewQuestion[activeQuestionIndex].Question,
          correctAns: mockInterviewQuestion[activeQuestionIndex].Answer,
          userAns: answer,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save answer");
      }

      toast.success("Answer recorded successfully!");
      setUserAnswer("");
    } catch (err) {
      toast.error(err.message || "An error occurred while saving your answer.");
    } finally {
      setLoading(false);
    }
  }, [activeQuestionIndex, interviewData, mockInterviewQuestion]);

  const transcribeAudio = useCallback(async (audioBlob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Transcription failed");

      const { transcription } = await res.json();
      const updatedAnswer = (userAnswer + " " + transcription).trim();
      setUserAnswer(updatedAnswer);
      await saveAnswer(updatedAnswer);
    } catch {
      toast.error("Error transcribing audio. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [userAnswer, saveAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
      <div className="relative overflow-hidden rounded-xl bg-slate-900">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 280, width: "100%", zIndex: 10 }}
            className="rounded-xl"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[280px] text-center">
            <VideoOff className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">Camera is off</p>
          </div>
        )}

        {isRecording && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold z-20">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            REC
          </div>
        )}
      </div>

      {userAnswer && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Your Answer
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {userAnswer}
          </p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 py-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
          <LoaderCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Processing...
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => setWebCamEnabled((prev) => !prev)}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            webCamEnabled
              ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              : "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
          }`}
        >
          {webCamEnabled ? (
            <VideoOff className="w-4 h-4" />
          ) : (
            <Video className="w-4 h-4" />
          )}
          {webCamEnabled ? "Cam Off" : "Cam On"}
        </button>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
            isRecording
              ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
              : "gradient-bg text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02]"
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop Recording
            </>
          ) : loading ? (
            "Saving..."
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Record Answer
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecordAnswerSection;
