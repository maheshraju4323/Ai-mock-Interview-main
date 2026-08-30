import React from "react";
import LandingNavbar from "./_components/LandingNavbar";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import InterviewTypes from "./_components/InterviewTypes";
import Stats from "./_components/Stats";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";

export const metadata = {
  title: "AI Mock Interview",
  description:
    "Ace your next interview with AI-powered mock interviews and get personalized feedback.",
};

const page = () => {
  return (
    <>
      <LandingNavbar />
      <main className="min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <InterviewTypes />
        <Stats />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default page;
