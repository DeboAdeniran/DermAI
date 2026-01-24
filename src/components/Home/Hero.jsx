import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigateToPage = (path, options = {}) => {
    navigate(path);

    if (options.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (options.closeMenu && options.setIsMenuOpen) {
      options.setIsMenuOpen(false);
    }
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1713845784497-fe3d7ed176d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBiZWF1dGlmdWwlMjBza2luJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjgyNDczNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Beautiful African woman with healthy skin"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/30 to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-light tracking-tight">
            Because Your Skin
            <br />
            Deserves the Best
          </h1>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigateToPage("/signup")}
              className="px-8 py-4 bg-white/95 text-[#2a2420] rounded-full hover:bg-white hover:shadow-2xl transition-all font-light text-lg backdrop-blur-sm"
            >
              Get Skin Analysis
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="px-8 py-4 bg-[#8b7355]/90 text-white rounded-full hover:bg-[#8b7355] hover:shadow-2xl transition-all font-light text-lg backdrop-blur-sm"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
