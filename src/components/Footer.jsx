import { MapPin, Sparkles, Heart, Shield, Users } from "lucide-react";

export function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToPage = (page) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-[#2a2420] via-[#352e28] to-[#2a2420] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#8b7355] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6d5a43] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-light tracking-tight">
                <span className="text-white">derm</span>
                <span className="bg-gradient-to-r from-[#c4a882] to-[#8b7355] bg-clip-text text-transparent">
                  AI
                </span>
              </h2>
            </div>
            <p className="text-sm text-[#c4b5aa] max-w-md font-light leading-relaxed mb-6">
              AI-powered skincare recommendations tailored for Nigerian and
              African skin. Discover products that work for your unique beauty.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={14} className="text-[#8b7355]" />
                  <span className="text-xs text-[#c4b5aa] font-light">
                    Users
                  </span>
                </div>
                <p className="text-lg text-white font-light">10K+</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-[#8b7355]" />
                  <span className="text-xs text-[#c4b5aa] font-light">
                    Analyses
                  </span>
                </div>
                <p className="text-lg text-white font-light">50K+</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Heart size={14} className="text-[#8b7355]" />
                  <span className="text-xs text-[#c4b5aa] font-light">
                    Products
                  </span>
                </div>
                <p className="text-lg text-white font-light">500+</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-light mb-6 tracking-wide flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#8b7355] to-[#6d5a43] rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-sm text-[#c4b5aa] hover:text-white transition-colors font-light flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm text-[#c4b5aa] hover:text-white transition-colors font-light flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage("signup")}
                  className="text-sm text-[#c4b5aa] hover:text-white transition-colors font-light flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage("privacy")}
                  className="text-sm text-[#c4b5aa] hover:text-white transition-colors font-light flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage("terms")}
                  className="text-sm text-[#c4b5aa] hover:text-white transition-colors font-light flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-light mb-6 tracking-wide flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#8b7355] to-[#6d5a43] rounded-full"></div>
              Location
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-[#8b7355] flex-shrink-0 mt-0.5"
                />
                <span className="text-sm text-[#c4b5aa] font-light">
                  Lagos, Nigeria
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
          <div className="flex gap-3">
            <Shield size={20} className="text-[#8b7355] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#c4b5aa] font-light leading-relaxed">
                <strong className="text-white font-normal">
                  Medical Disclaimer:
                </strong>{" "}
                DermAI is an AI-powered skincare recommendation tool and does
                not replace professional dermatological advice. Our
                recommendations are for over-the-counter skincare products only.
                For medical conditions or serious skin concerns, please consult
                a licensed dermatologist.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#c4b5aa] font-light">
            © 2026 DermAI. Made with{" "}
            <Heart size={12} className="inline text-[#8b7355]" /> for African
            beauty.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button
              onClick={() => navigateToPage("privacy")}
              className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light"
            >
              Privacy
            </button>
            <button
              onClick={() => navigateToPage("terms")}
              className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light"
            >
              Terms
            </button>
            <button
              onClick={() => navigateToPage("cookies")}
              className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light"
            >
              Cookies
            </button>
            <button
              onClick={() => navigateToPage("disclaimer")}
              className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light"
            >
              Disclaimer
            </button>
          </div>
          <div className="flex gap-4">
            <button className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light px-3 py-1.5 rounded-full hover:bg-white/5">
              English
            </button>
            <button className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light px-3 py-1.5 rounded-full hover:bg-white/5">
              Yoruba
            </button>
            <button className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light px-3 py-1.5 rounded-full hover:bg-white/5">
              Igbo
            </button>
            <button className="text-xs text-[#c4b5aa] hover:text-white transition-colors font-light px-3 py-1.5 rounded-full hover:bg-white/5">
              Hausa
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
