import React, { useState } from "react";
import {
  ChevronDown,
  Home,
  FileText,
  Scale,
  User,
  Shield,
  AlertTriangle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TermsOfServicePage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <Scale size={20} className="text-[#8b7355]" />,
      content:
        "By accessing and using DermAI, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.",
    },
    {
      id: "service-description",
      title: "Service Description",
      icon: <FileText size={20} className="text-[#8b7355]" />,
      content:
        "DermAI provides AI-powered skincare product recommendations. Our service is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: <User size={20} className="text-[#8b7355]" />,
      content:
        "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <FileText size={20} className="text-[#8b7355]" />,
      content:
        "All content on DermAI, including text, graphics, logos, images, and software, is the property of DermAI or its content suppliers and is protected by Nigerian and international copyright laws. You may not reproduce, distribute, or create derivative works from our content without our express written permission.",
    },
    {
      id: "disclaimer",
      title: "Medical Disclaimer",
      icon: <AlertTriangle size={20} className="text-[#8b7355]" />,
      content:
        "DermAI is not a medical diagnostic tool and should not be used as a substitute for professional dermatological advice. Our recommendations are for over-the-counter skincare products only. For serious skin conditions or concerns, please consult a licensed dermatologist or healthcare provider.",
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: <Shield size={20} className="text-[#8b7355]" />,
      content:
        "DermAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability to you for any damages shall not exceed the amount you paid to us in the past twelve months.",
    },
    {
      id: "termination",
      title: "Termination",
      icon: <FileText size={20} className="text-[#8b7355]" />,
      content:
        "We reserve the right to terminate or suspend your account and access to our service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.",
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: <Clock size={20} className="text-[#8b7355]" />,
      content:
        'We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page and updating the "Last Updated" date. Your continued use of the service after any such changes constitutes your acceptance of the new terms.',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8f6f3] to-white">
      {/* Simple Header */}
      <nav className="bg-white border-b border-[#e8e6e3] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "home" }),
                )
              }
              className="text-xl sm:text-2xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-sm">
                <Scale className="text-white" size={20} />
              </div>
              <div>
                <span className="text-[#2a2420] font-light">derm</span>
                <span className="text-[#8b7355] font-light">AI</span>
                <span className="text-xs text-[#5a5450] block font-light">
                  Terms of Service
                </span>
              </div>
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="px-4 py-2 text-[#8b7355] hover:text-[#2a2420] transition-colors rounded-full hover:bg-[#f8f6f3] flex items-center gap-2 font-light"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#8b7355]/10 to-[#6d5a43]/10 rounded-full mb-6">
              <Scale size={16} className="text-[#8b7355]" />
              <p className="text-[#8b7355] font-light tracking-wider uppercase text-sm">
                Legal Agreement
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl text-[#2a2420] mb-4 font-light">
              Terms of Service
            </h1>
            <p className="text-lg text-[#5a5450] font-light">
              Last updated: December 21, 2024
            </p>
          </div>

          <div className="bg-linear-to-br from-white via-[#fdf9f0] to-[#f8f6f3] p-8 sm:p-12 rounded-3xl mb-8 shadow-sm border border-[#e8e6e3]/30">
            <p className="text-[#5a5450] leading-relaxed font-light">
              Welcome to DermAI. These Terms of Service govern your use of our
              website and services. By using DermAI, you agree to comply with
              and be bound by these terms. Please review them carefully before
              using our service.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white border border-[#e8e6e3]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.id ? null : section.id,
                    )
                  }
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between hover:bg-linear-to-r hover:from-[#f8f6f3] hover:to-white transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center group-hover:from-[#8b7355]/20 group-hover:to-[#6d5a43]/20 transition-all">
                      {section.icon}
                    </div>
                    <h3 className="text-xl text-[#2a2420] text-left font-light">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#2a2420] shrink-0 transition-transform ${activeSection === section.id ? "rotate-180" : ""}`}
                  />
                </button>

                {activeSection === section.id && (
                  <div className="px-6 sm:px-8 pb-6 animate-fadeIn">
                    <p className="text-[#5a5450] leading-relaxed font-light pl-14 border-l-2 border-[#8b7355]/30 ml-5 pl-8 py-2">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-linear-to-br from-yellow-50 to-orange-50 rounded-3xl border border-yellow-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Scale className="text-white" size={24} />
              </div>
              <h3 className="text-2xl text-yellow-900 font-light">
                Governing Law
              </h3>
            </div>
            <p className="text-yellow-800 font-light">
              These Terms shall be governed by and construed in accordance with
              the laws of the Federal Republic of Nigeria, without regard to its
              conflict of law provisions. Any disputes arising from these terms
              will be subject to the exclusive jurisdiction of the courts of
              Nigeria.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="px-8 py-4 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 font-light"
            >
              <Home size={18} />
              Back to Home
            </button>
            <button
              onClick={scrollToTop}
              className="px-8 py-4 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-[#8b7355] hover:text-[#8b7355] transition-all font-light"
            >
              Back to Top
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#5a5450] font-light mb-4">
              Need to review other legal documents?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  navigate("/privacy");
                }}
                className="px-6 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-blue-500 hover:text-blue-600 transition-all font-light flex items-center justify-center gap-2"
              >
                <Shield size={16} />
                Privacy Policy
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-6 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-[#8b7355] hover:text-[#8b7355] transition-all font-light"
              >
                Download Terms (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-b from-white to-[#f8f6f3] border-t border-[#e8e6e3] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#5a5450] font-light mb-2">
            © {new Date().getFullYear()} DermAI. All rights reserved.
          </p>
          <p className="text-xs text-[#5a5450]/70 font-light">
            This document was last updated on December 21, 2024
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
