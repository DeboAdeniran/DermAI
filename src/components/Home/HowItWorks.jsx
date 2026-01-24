import { useNavigate } from "react-router-dom";

export function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Upload Skin Photo",
      description:
        "Take a quick selfie or upload a clear photo of your face. Our AI analyzes your skin in seconds.",
      icon: (
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      ),
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our intelligent system identifies your skin type, concerns, and conditions with 95% accuracy.",
      icon: (
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      ),
    },
    {
      number: "03",
      title: "Get Recommendations",
      description:
        "Receive curated product suggestions from local and international brands, tailored just for you.",
      icon: (
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#f8f6f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#2a2420] mb-4 font-light tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#5a5450] max-w-2xl mx-auto font-light">
            Get personalized skincare recommendations in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 h-full border border-white/50">
                {/* Icon */}
                <div className="w-14 h-14 bg-[#8b7355]/10 text-[#8b7355] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8b7355] group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>

                {/* Number */}
                <div className="absolute top-6 right-6 text-5xl lg:text-6xl text-[#e8e6e3] font-light">
                  {step.number}
                </div>

                <h3 className="text-xl lg:text-2xl text-[#2a2420] mb-3 font-light">
                  {step.title}
                </h3>
                <p className="text-[#5a5450] font-light text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              navigate("/signup");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-10 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#6d5a43] hover:shadow-2xl transition-all font-light text-base sm:text-lg"
          >
            Start Your Skin Journey
          </button>
        </div>
      </div>
    </section>
  );
}
