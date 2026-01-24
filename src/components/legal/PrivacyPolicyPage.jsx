import React, { useState } from "react";
import {
  ChevronDown,
  Home,
  Shield,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PrivacyPolicyPage() {
    const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us when you create an account, upload photos, complete questionnaires, and use our services. This includes your name, email address, skin photos, and skincare preferences. We also automatically collect certain information about your device and how you interact with our services.",
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      content:
        "We use the information we collect to provide, maintain, and improve our services, including analyzing your skin photos to provide personalized recommendations. We also use your information to communicate with you, respond to your requests, and send you technical notices and updates.",
    },
    {
      id: "data-security",
      title: "Data Security",
      content:
        "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use SSL encryption for all data transmission and store your information on secure servers with restricted access.",
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with service providers who perform services on our behalf, with your consent, or as required by law. Any third-party service providers are bound by confidentiality obligations.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information at any time through your account settings. You can also request a copy of your data or object to certain processing activities. For Nigerian users, we comply with the Nigeria Data Protection Regulation (NDPR).",
    },
    {
      id: "image-processing",
      title: "Image Processing & Storage",
      content:
        "Photos you upload are processed by our AI system and stored securely. You can delete your photos at any time. We do not use your photos for any purpose other than providing you with skincare recommendations unless you explicitly grant us permission.",
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content:
        "We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.",
    },
    {
      id: "children",
      title: "Children's Privacy",
      content:
        "Our service is not intended for anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <nav className="bg-linear-to-b from-[#f8f6f3] to-white border-b border-[#e8e6e3] sticky top-0 z-50 shadow-sm">
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
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <span className="text-[#2a2420] font-light">derm</span>
                <span className="text-[#8b7355] font-light">AI</span>
                <span className="text-xs text-[#5a5450] block font-light">
                  Privacy & Terms
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
              <Shield size={16} className="text-[#8b7355]" />
              <p className="text-[#8b7355] font-light tracking-wider uppercase text-sm">
                Legal & Privacy
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl text-[#2a2420] mb-4 font-light">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#5a5450] font-light">
              Last updated: December 21, 2024
            </p>
          </div>

          <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl mb-8 shadow-sm border border-[#e8e6e3]/30">
            <p className="text-[#5a5450] leading-relaxed font-light">
              At DermAI, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our skincare recommendation service.
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
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
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between hover:bg-[#f8f6f3] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center group-hover:from-[#8b7355]/20 group-hover:to-[#6d5a43]/20 transition-all">
                      <Shield size={18} className="text-[#8b7355]" />
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
                    <p className="text-[#5a5450] leading-relaxed font-light pl-14">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-2xl text-blue-900 font-light">
                Contact Us About Privacy
              </h3>
            </div>
            <p className="text-blue-800 mb-6 font-light">
              If you have questions or comments about this Privacy Policy,
              please contact us at:
            </p>
            <div className="space-y-4 text-blue-800">
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                <Mail size={18} className="text-blue-600" />
                <p className="font-light">
                  <strong className="font-normal">Email:</strong>{" "}
                  privacy@dermai.ng
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                <Phone size={18} className="text-blue-600" />
                <p className="font-light">
                  <strong className="font-normal">Phone:</strong> +234 (0) 800
                  DERMAID
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                <MapPin size={18} className="text-blue-600" />
                <p className="font-light">
                  <strong className="font-normal">Address:</strong> 123 Lekki
                  Phase 1, Lagos, Nigeria
                </p>
              </div>
            </div>
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
