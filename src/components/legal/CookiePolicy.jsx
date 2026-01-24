import React from "react";
import {
  Cookie,
  Shield,
  Settings,
  BarChart,
  Target,
  Globe,
  Mail,
  Phone,
  MapPin,
  Home,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  Monitor,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CookiePolicy() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8f6f3] to-white">
      {/* Header */}
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
                <Cookie className="text-white" size={20} />
              </div>
              <div>
                <span className="text-[#2a2420] font-light">derm</span>
                <span className="text-[#8b7355] font-light">AI</span>
                <span className="text-xs text-[#5a5450] block font-light">
                  Cookie Policy
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
              <Cookie size={16} className="text-[#8b7355]" />
              <p className="text-[#8b7355] font-light tracking-wider uppercase text-sm">
                Privacy & Cookies
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl text-[#2a2420] mb-4 font-light">
              Cookie Policy
            </h1>
            <p className="text-lg text-[#5a5450] font-light">
              Last updated: December 21, 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-linear-to-br from-white via-[#fdf9f0] to-[#f8f6f3] p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Cookie size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Introduction
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light">
                This Cookie Policy explains how DermAI ("we", "us", or "our")
                uses cookies and similar technologies to recognize you when you
                visit our website. It explains what these technologies are and
                why we use them, as well as your rights to control our use of
                them.
              </p>
            </div>

            {/* What Are Cookies */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Info size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  What Are Cookies?
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light">
                Cookies set by the website owner (in this case, DermAI) are
                called "first-party cookies". Cookies set by parties other than
                the website owner are called "third-party cookies". Third-party
                cookies enable third-party features or functionality to be
                provided on or through the website (e.g., advertising,
                interactive content, and analytics).
              </p>
            </div>

            {/* Why Do We Use Cookies */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Settings size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Why Do We Use Cookies?
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                We use first-party and third-party cookies for several reasons.
                Some cookies are required for technical reasons in order for our
                website to operate, and we refer to these as "essential" or
                "strictly necessary" cookies. Other cookies enable us to track
                and target the interests of our users to enhance the experience
                on our website.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light">
                Third parties serve cookies through our website for advertising,
                analytics, and other purposes.
              </p>
            </div>

            {/* Types of Cookies */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Shield size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Types of Cookies We Use
                </h2>
              </div>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border-l-4 border-red-500 pl-6 bg-linear-to-r from-red-50 to-white p-4 rounded-r-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle size={20} className="text-red-600" />
                    <h3 className="text-xl text-[#2a2420] font-light">
                      Essential Website Cookies
                    </h3>
                  </div>
                  <p className="text-[#5a5450] font-light">
                    These cookies are strictly necessary to provide you with
                    services available through our website and to use some of
                    its features, such as access to secure areas. Without these
                    cookies, services you have asked for cannot be provided.
                  </p>
                </div>

                {/* Performance Cookies */}
                <div className="border-l-4 border-blue-500 pl-6 bg-linear-to-r from-blue-50 to-white p-4 rounded-r-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Settings size={20} className="text-blue-600" />
                    <h3 className="text-xl text-[#2a2420] font-light">
                      Performance and Functionality Cookies
                    </h3>
                  </div>
                  <p className="text-[#5a5450] font-light">
                    These cookies are used to enhance the performance and
                    functionality of our website but are non-essential to their
                    use. However, without these cookies, certain functionality
                    may become unavailable (such as remembering your preferences
                    or login information).
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border-l-4 border-green-500 pl-6 bg-linear-to-r from-green-50 to-white p-4 rounded-r-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart size={20} className="text-green-600" />
                    <h3 className="text-xl text-[#2a2420] font-light">
                      Analytics and Customization Cookies
                    </h3>
                  </div>
                  <p className="text-[#5a5450] font-light">
                    These cookies collect information that is used either in
                    aggregate form to help us understand how our website is
                    being used or how effective our marketing campaigns are, or
                    to help us customize our website for you.
                  </p>
                </div>

                {/* Advertising Cookies */}
                <div className="border-l-4 border-purple-500 pl-6 bg-linear-to-r from-purple-50 to-white p-4 rounded-r-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Target size={20} className="text-purple-600" />
                    <h3 className="text-xl text-[#2a2420] font-light">
                      Advertising Cookies
                    </h3>
                  </div>
                  <p className="text-[#5a5450] font-light">
                    These cookies are used to make advertising messages more
                    relevant to you. They perform functions like preventing the
                    same ad from continuously reappearing, ensuring that ads are
                    properly displayed for advertisers, and in some cases
                    selecting advertisements that are based on your interests.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Control Cookies */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Settings size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  How Can You Control Cookies?
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie rights by setting your
                preferences in the Cookie Consent Manager. The Cookie Consent
                Manager allows you to select which categories of cookies you
                accept or reject.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                <span className="flex items-center gap-2 font-normal">
                  <AlertCircle size={16} className="text-red-500" />
                  Essential cookies cannot be rejected as they are strictly
                  necessary to provide you with services.
                </span>
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light">
                If you choose to reject cookies, you may still use our website
                though your access to some functionality and areas of our
                website may be restricted.
              </p>
            </div>

            {/* Browser Management */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Monitor size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  How to Manage Cookies in Your Browser
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light mb-4">
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience.
              </p>
              <p className="text-[#5a5450] leading-relaxed font-light mb-6">
                For more information on how to manage cookies in popular
                browsers, please visit:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-xl hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Globe size={18} className="text-blue-600" />
                  </div>
                  <span className="text-[#5a5450] font-light">
                    Google Chrome
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-xl hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Globe size={18} className="text-orange-600" />
                  </div>
                  <span className="text-[#5a5450] font-light">
                    Mozilla Firefox
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-xl hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Globe size={18} className="text-blue-500" />
                  </div>
                  <span className="text-[#5a5450] font-light">
                    Apple Safari
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-xl hover:bg-white hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Globe size={18} className="text-green-600" />
                  </div>
                  <span className="text-[#5a5450] font-light">
                    Microsoft Edge
                  </span>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-[#e8e6e3]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Info size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-2xl text-[#2a2420] font-light">
                  Updates to This Cookie Policy
                </h2>
              </div>
              <p className="text-[#5a5450] leading-relaxed font-light">
                We may update this Cookie Policy from time to time in order to
                reflect changes to the cookies we use or for other operational,
                legal, or regulatory reasons. Please therefore revisit this
                Cookie Policy regularly to stay informed about our use of
                cookies and related technologies.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-linear-to-br from-[#2a2420] to-[#3a3430] text-white p-8 rounded-3xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-light">Contact Us</h2>
              </div>
              <p className="text-[#a09890] mb-6 font-light">
                If you have any questions about our use of cookies or other
                technologies, please contact us at:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Mail size={18} className="text-[#8b7355]" />
                  <p className="font-light">
                    <strong className="font-normal text-white">Email:</strong>{" "}
                    privacy@dermai.ng
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Phone size={18} className="text-[#8b7355]" />
                  <p className="font-light">
                    <strong className="font-normal text-white">Phone:</strong>{" "}
                    +234 (0) 800 DERMAID
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <MapPin size={18} className="text-[#8b7355]" />
                  <p className="font-light">
                    <strong className="font-normal text-white">Address:</strong>{" "}
                    123 Lekki Phase 1, Lagos, Nigeria
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
                scrollToTop();
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

          {/* Related Links */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#5a5450] font-light mb-4">
              Review other important legal documents
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
                onClick={() => {
                  navigate("/terms");
                }}
                className="px-6 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-green-500 hover:text-green-600 transition-all font-light flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Terms of Service
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
    </div>
  );
}
