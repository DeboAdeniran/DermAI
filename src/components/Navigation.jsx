import { useState, useEffect } from "react";
import { Menu, X, Info, Sparkles, Settings, LogIn } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navigateToPage = (page) => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div
          className={`rounded-full transition-all ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-xl"
              : "bg-white/60 backdrop-blur-sm shadow-lg"
          }`}
        >
          <div className="flex justify-between items-center h-14 px-4 sm:px-6">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-2 group"
              >
                <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center group-hover:shadow-lg transition-all">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <span className="text-[#2a2420] font-light tracking-tight text-base sm:text-base">
                  <span className="text-[#2a2420]">derm</span>
                  <span className="text-[#8b7355]">AI</span>
                </span>
              </button>
            </div>

            {/* Center Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scrollToSection("about")}
                className="px-3 py-1.5 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="px-3 py-1.5 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="px-3 py-1.5 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
              >
                Our Process
              </button>
            </div>

            {/* Right Side - CTA Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateToPage("login")}
                className="hidden sm:block px-3 py-1.5 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateToPage("signup")}
                className="hidden md:block px-4 py-1.5 bg-[#8b7355] text-white rounded-full hover:bg-[#6d5a43] hover:shadow-lg transition-all font-light text-xs sm:text-sm"
              >
                Get Skin Analysis
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-[#2a2420] p-2 rounded-full hover:bg-[#f8f6f3] transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={22} strokeWidth={2} />
                ) : (
                  <Menu size={22} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-20 left-4 right-4 md:hidden z-50 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-[#e8e6e3]/50 overflow-hidden">
              <div className="p-6">
                {/* Navigation Links */}
                <div className="space-y-2 mb-6">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="w-full flex items-center gap-3 text-[#2a2420] hover:bg-gradient-to-r hover:from-[#8b7355]/10 hover:to-[#6d5a43]/10 rounded-xl px-4 py-3.5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center group-hover:from-[#8b7355]/20 group-hover:to-[#6d5a43]/20 transition-all">
                      <Info size={18} className="text-[#8b7355]" />
                    </div>
                    <span className="font-light text-base">About</span>
                  </button>

                  <button
                    onClick={() => scrollToSection("features")}
                    className="w-full flex items-center gap-3 text-[#2a2420] hover:bg-gradient-to-r hover:from-[#8b7355]/10 hover:to-[#6d5a43]/10 rounded-xl px-4 py-3.5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center group-hover:from-[#8b7355]/20 group-hover:to-[#6d5a43]/20 transition-all">
                      <Sparkles size={18} className="text-[#8b7355]" />
                    </div>
                    <span className="font-light text-base">Features</span>
                  </button>

                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="w-full flex items-center gap-3 text-[#2a2420] hover:bg-gradient-to-r hover:from-[#8b7355]/10 hover:to-[#6d5a43]/10 rounded-xl px-4 py-3.5 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center group-hover:from-[#8b7355]/20 group-hover:to-[#6d5a43]/20 transition-all">
                      <Settings size={18} className="text-[#8b7355]" />
                    </div>
                    <span className="font-light text-base">Our Process</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#e8e6e3] to-transparent mb-6" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigateToPage("login")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#e8e6e3] text-[#2a2420] rounded-xl hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all font-light"
                  >
                    <LogIn size={18} className="text-[#8b7355]" />
                    Sign In
                  </button>

                  <button
                    onClick={() => navigateToPage("signup")}
                    className="w-full px-5 py-3.5 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl hover:shadow-xl transition-all font-light"
                  >
                    Get Skin Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
