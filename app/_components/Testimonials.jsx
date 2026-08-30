import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    avatar: "PS",
    avatarColor: "bg-indigo-500",
    content:
      "The AI mock interviews were a game-changer for me. The questions were incredibly realistic, and the detailed feedback after each session helped me identify exactly what to improve. I landed my dream job at Google within 2 months!",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Product Manager at Microsoft",
    avatar: "JR",
    avatarColor: "bg-purple-500",
    content:
      "I used this platform to prepare for behavioral and HR interviews. The AI asked questions I had never considered, and the performance reports gave me clear direction. Highly recommend for anyone preparing for product roles.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Data Scientist at Amazon",
    avatar: "AP",
    avatarColor: "bg-pink-500",
    content:
      "As a career switcher, I needed intensive practice. The resume-based interviews were spot-on, probing every project on my resume. The coding challenges were tough but fair. This platform gave me the confidence I needed.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Loved by{" "}
            <span className="gradient-text">10,000+ users</span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Hear from professionals who transformed their interview skills
            with our AI-powered platform.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-10 h-10 text-indigo-100" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center`}
                >
                  <span className="text-sm font-bold text-white">
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
