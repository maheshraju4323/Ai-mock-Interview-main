import React from "react";
import Contect from "./Contect";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Get in <span className="gradient-text">touch</span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <Contect />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
