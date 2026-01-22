export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1765607476376-9574ea76b2ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBnbG93aW5nJTIwc2tpbiUyMG5hdHVyYWx8ZW58MXx8fHwxNjgyNDk0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Beautiful African woman with glowing skin"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white/95 backdrop-blur-sm p-6 lg:p-8 rounded-3xl shadow-2xl max-w-xs border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#8b7355] to-[#6d5a43] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg
                    width="28"
                    height="28"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <path d="M20 8v6M23 11h-6"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-3xl lg:text-4xl text-[#2a2420] font-light">
                    10K+
                  </p>
                  <p className="text-sm text-[#8b7355] font-light">
                    Happy Users
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#2a2420] mb-6 font-light tracking-tight leading-tight">
                Skincare Made Simple for Nigerian Skin
              </h2>
              <p className="text-base sm:text-lg text-[#5a5450] mb-4 font-light leading-relaxed">
                DermAI was founded with a simple mission: to democratize access
                to personalized skincare advice in Nigeria and across Africa.
              </p>
              <p className="text-base text-[#5a5450] font-light leading-relaxed">
                We understand that African skin has unique characteristics and
                needs that aren't always addressed by mainstream skincare
                solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8b7355]/10 rounded-2xl flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl text-[#2a2420] font-light">
                  Affordable Solutions
                </h3>
                <p className="text-sm text-[#5a5450] font-light leading-relaxed">
                  Budget-friendly recommendations that don't compromise on
                  quality
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8b7355]/10 rounded-2xl flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl text-[#2a2420] font-light">
                  Local Focus
                </h3>
                <p className="text-sm text-[#5a5450] font-light leading-relaxed">
                  Products available in Nigerian and African markets
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8b7355]/10 rounded-2xl flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl text-[#2a2420] font-light">
                  Safe & Secure
                </h3>
                <p className="text-sm text-[#5a5450] font-light leading-relaxed">
                  Your data is protected with industry-leading security
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#8b7355]/10 rounded-2xl flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg lg:text-xl text-[#2a2420] font-light">
                  Expert Approved
                </h3>
                <p className="text-sm text-[#5a5450] font-light leading-relaxed">
                  Recommendations backed by skincare experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
