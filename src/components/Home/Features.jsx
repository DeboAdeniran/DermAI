import { Sparkles, ShieldCheck, Clock, TrendingUp } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze your skin type and concerns to provide personalized recommendations.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Products",
      description:
        "All recommended products are verified for quality and safety, suitable for African skin types.",
    },
    {
      icon: Clock,
      title: "Quick Results",
      description:
        "Get instant skincare recommendations in minutes, no waiting for appointments.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Monitor your skincare journey and see improvements over time with our tracking tools.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#2a2420] mb-4 font-light">
            Why Choose <span className="text-[#8b7355]">DermAI</span>?
          </h2>
          <p className="text-base sm:text-lg text-[#5a5450] max-w-2xl mx-auto font-light">
            Experience the future of personalized skincare with our intelligent
            platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all border border-[#e8e6e3]/30 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg transition-all">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl text-[#2a2420] mb-3 font-light">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-[#5a5450] font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
