import React from "react";
import Link from "next/link";
import { Bot, Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Interview Types", href: "#interview-types" },
    { label: "Pricing", href: "/dashboard/upgrade" },
  ],
  Resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Questions Bank", href: "/dashboard/question" },
    { label: "How It Works", href: "/dashboard/howit" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                AI Mock Interview
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              AI-powered mock interviews that help you practice, improve, and
              land your dream job. Get personalized feedback and ace every
              interview.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/modamaan/Ai-mock-Interview" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "mailto:mohamedamaan319@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} AI Mock Interview. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built with AI &amp; Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
