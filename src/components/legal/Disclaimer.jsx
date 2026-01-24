import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Home,
  Shield,
  AlertCircle,
  Info,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Disclaimer() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <nav className="bg-[#f8f6f3] border-b border-[#e8e6e3] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "home" }),
                )
              }
              className="text-xl sm:text-2xl tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-sm">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <span className="text-[#2a2420]">derm</span>
                <span className="text-[#8b7355]">AI</span>
                <span className="text-xs text-[#5a5450] block font-light">
                  Medical Disclaimer
                </span>
              </div>
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-[#8b7355] hover:text-[#2a2420] transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#8b7355]/10 to-[#6d5a43]/10 rounded-full mb-6">
              <AlertTriangle size={16} className="text-[#8b7355]" />
              <p className="text-[#8b7355] tracking-wider uppercase text-sm">
                Important Legal Notice
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl text-[#2a2420] mb-4 font-light">
              Medical Disclaimer
            </h1>
            <p className="text-lg text-[#5a5450] font-light">
              Last updated: December 21, 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Important Notice */}
            <div className="bg-linear-to-br from-red-50 to-orange-50 border-2 border-red-200 p-8 sm:p-12 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl text-[#2a2420] mb-3 font-light">
                    Important Notice
                  </h2>
                  <p className="text-[#5a5450] leading-relaxed font-light">
                    The information provided by DermAI is for informational and
                    educational purposes only. It is not intended to be a
                    substitute for professional medical advice, diagnosis, or
                    treatment.
                  </p>
                </div>
              </div>
            </div>

            {/* Not Medical Advice */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Info size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Not Medical Advice
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                DermAI is an AI-powered skincare recommendation platform that
                provides personalized product suggestions based on your skin
                type, concerns, and preferences. Our service does not provide
                medical advice, diagnosis, or treatment.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                The recommendations provided by DermAI are generated using
                artificial intelligence and machine learning algorithms trained
                on cosmetic and skincare data. These recommendations are for
                over-the-counter skincare products only and should not be
                considered medical prescriptions or professional dermatological
                advice.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light">
                Always seek the advice of your physician, dermatologist, or
                other qualified health provider with any questions you may have
                regarding a medical condition or skin concern. Never disregard
                professional medical advice or delay in seeking it because of
                something you have read or received through DermAI.
              </p>
            </div>

            {/* When to Consult a Professional */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Stethoscope size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  When to Consult a Professional
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                You should consult a licensed dermatologist or healthcare
                professional if you experience any of the following:
              </p>
              <div className="space-y-3">
                {[
                  "Persistent or worsening skin conditions",
                  "Severe acne, rashes, or inflammation",
                  "Unusual moles or skin growths",
                  "Signs of skin infection",
                  "Allergic reactions or severe irritation",
                  "Any skin condition that causes pain or discomfort",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-linear-to-br from-[#8b7355] to-[#6d5a43] rounded-full flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <p className="text-[#5a5450] font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Recommendations */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Info size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Product Recommendations
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                The skincare products recommended by DermAI are for cosmetic and
                general skincare purposes. We do not recommend prescription
                medications or treatments for medical conditions.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                Before using any new skincare product, we recommend:
              </p>
              <ul className="space-y-2 text-[#5a5450]">
                {[
                  "Reading the product label and ingredients carefully",
                  "Performing a patch test to check for allergic reactions",
                  "Following the product's usage instructions",
                  "Consulting with a dermatologist if you have sensitive skin or existing skin conditions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#8b7355] mt-1">•</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Technology Limitations */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                  <AlertCircle size={20} className="text-blue-600" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  AI Technology Limitations
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                While our AI technology is sophisticated and continually
                improving, it has limitations:
              </p>
              <ul className="space-y-2 text-[#5a5450]">
                {[
                  "AI cannot replace professional medical examination and diagnosis",
                  "Image analysis may not be 100% accurate in all lighting or photo conditions",
                  "Recommendations are based on general patterns and may not account for all individual factors",
                  "Our AI cannot diagnose medical conditions or prescribe treatments",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#8b7355] mt-1">•</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* No Warranties */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-yellow-600" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  No Warranties
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                DermAI provides its services "as is" without any warranties,
                express or implied. We do not guarantee that:
              </p>
              <ul className="space-y-2 text-[#5a5450]">
                {[
                  "Our recommendations will achieve specific skincare results",
                  "Recommended products will be suitable for everyone",
                  "Product recommendations will be free from errors or omissions",
                  "The service will be uninterrupted or error-free",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#8b7355] mt-1">•</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assumption of Risk */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500/10 to-pink-500/10 flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Assumption of Risk
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light">
                By using DermAI, you acknowledge and agree that you assume all
                risks associated with using our recommendations. You are solely
                responsible for evaluating the accuracy, completeness, and
                usefulness of all opinions, advice, services, and other
                information provided through our platform. Any reliance on such
                information is strictly at your own risk.
              </p>
            </div>

            {/* Product Affiliate Relationships */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                  <Info size={20} className="text-purple-600" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Product Affiliate Relationships
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light">
                DermAI may have affiliate relationships with certain product
                brands or retailers. However, all recommendations are based on
                our AI analysis and are not influenced by these relationships.
                We strive to provide unbiased recommendations that best match
                your skin profile.
              </p>
            </div>

            {/* Emergency Medical Situations */}
            <div className="bg-linear-to-br from-red-900 to-rose-900 text-white p-8 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-white/20 to-transparent flex items-center justify-center">
                  <AlertTriangle className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-light">
                  Emergency Medical Situations
                </h2>
              </div>
              <p className="text-red-100 mb-4 font-light">
                If you believe you have a medical emergency, immediately call
                your doctor, go to the nearest emergency room, or call emergency
                services (such as 112 or 767 in Nigeria).
              </p>
              <p className="text-red-100 font-light">
                Do not use DermAI for emergency medical situations or urgent
                health concerns.
              </p>
            </div>

            {/* Contact Us */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Mail size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Contact Us
                </h2>
              </div>
              <p className="text-[#5a5450] mb-4 font-light">
                If you have questions about this disclaimer, please contact us
                at:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e8e6e3]">
                  <Mail size={18} className="text-[#8b7355]" />
                  <p className="text-[#5a5450] font-light">
                    <strong className="font-normal">Email:</strong>{" "}
                    legal@dermai.ng
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e8e6e3]">
                  <Phone size={18} className="text-[#8b7355]" />
                  <p className="text-[#5a5450] font-light">
                    <strong className="font-normal">Phone:</strong> +234 (0) 800
                    DERMAID
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#e8e6e3]">
                  <MapPin size={18} className="text-[#8b7355]" />
                  <p className="text-[#5a5450] font-light">
                    <strong className="font-normal">Address:</strong> 123 Lekki
                    Phase 1, Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
    </div>
  );
}
