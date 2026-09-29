"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, UserButton, useAuth } from "@clerk/nextjs";
import { Menu, X, Bot, LogOut } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Interview Types", href: "#interview-types" },
  { label: "Contact", href: "#contact" },
];

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AI Mock <span className="gradient-text">Interview</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton redirectUrl="/">
                  <button
                    title="Log Out"
                    className="p-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-200">
                    Log In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200">
                    Get Started
                  </button>
                </SignInButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 bg-white/95 backdrop-blur-xl border-t border-gray-100">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
            {isSignedIn ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl"
                >
                  Dashboard
                </Link>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-sm font-medium text-gray-700">Account</span>
                  </div>
                  <SignOutButton redirectUrl="/">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </SignOutButton>
                </div>
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="block w-full px-5 py-2.5 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors">
                    Log In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="block w-full px-5 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl">
                    Get Started Free
                  </button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
