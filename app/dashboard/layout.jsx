"use client";
import React, { createContext, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";

export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Toaster />
      <Header />
      <div className="lg:pl-[260px] pt-16 lg:pt-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
            {children}
          </WebCamContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
