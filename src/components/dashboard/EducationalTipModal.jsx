export function EducationalTipModal({ isOpen, onClose, tip }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b7355] to-[#6d5a43] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span className="text-sm opacity-90">{tip.category}</span>
              </div>
              <h2 className="text-2xl">{tip.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <div className="space-y-6">
            {/* Main Tip */}
            <div className="bg-[#f8f6f3] p-5 rounded-2xl">
              <p className="text-[#2a2420] leading-relaxed">{tip.content}</p>
            </div>

            {/* Extended Information */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-3">Why This Matters</h3>
              <p className="text-[#5a5450] mb-4 leading-relaxed">
                For oily and acne-prone skin types common in Nigerian climates,
                maintaining proper hydration is crucial. When your skin is
                dehydrated, it compensates by producing excess sebum (oil),
                which can clog pores and lead to breakouts.
              </p>
              <p className="text-[#5a5450] leading-relaxed">
                Using a lightweight, oil-free moisturizer helps maintain your
                skin's moisture barrier without adding extra oil. Look for
                ingredients like hyaluronic acid, niacinamide, and glycerin that
                hydrate without feeling heavy.
              </p>
            </div>

            {/* Tips Section */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-3">Pro Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8b7355] text-white flex items-center justify-center flex-shrink-0 text-sm">
                    1
                  </div>
                  <p className="text-sm text-[#5a5450]">
                    Apply moisturizer to damp skin within 60 seconds of
                    cleansing to lock in moisture
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8b7355] text-white flex items-center justify-center flex-shrink-0 text-sm">
                    2
                  </div>
                  <p className="text-sm text-[#5a5450]">
                    Choose gel or gel-cream formulas if you have oily skin—they
                    absorb quickly without greasiness
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#8b7355] text-white flex items-center justify-center flex-shrink-0 text-sm">
                    3
                  </div>
                  <p className="text-sm text-[#5a5450]">
                    Don't skip moisturizer even if you have oily skin—use less
                    product if needed, but keep it consistent
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-3">
                Recommended for Your Skin Type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-[#e8e6e3] rounded-xl p-3 hover:shadow-md transition-all">
                  <p className="text-xs text-[#8b7355] mb-1">
                    Light Moisturizer
                  </p>
                  <p className="text-sm text-[#2a2420]">
                    Neutrogena Hydro Boost
                  </p>
                  <p className="text-xs text-[#5a5450] mt-1">
                    Water-based, oil-free
                  </p>
                </div>
                <div className="border border-[#e8e6e3] rounded-xl p-3 hover:shadow-md transition-all">
                  <p className="text-xs text-[#8b7355] mb-1">Gel Moisturizer</p>
                  <p className="text-sm text-[#2a2420]">CeraVe AM Lotion</p>
                  <p className="text-xs text-[#5a5450] mt-1">
                    With SPF protection
                  </p>
                </div>
              </div>
            </div>

            {/* Related Topics */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-3">Learn More</h3>
              <div className="space-y-2">
                {[
                  "Understanding Your Skin Barrier",
                  "Best Ingredients for Oily Skin",
                  "Morning vs Evening Skincare Routines",
                  "How Climate Affects Your Skin",
                ].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => alert(`Opening: ${topic}`)}
                    className="w-full px-4 py-3 border border-[#e8e6e3] rounded-xl text-left text-sm text-[#2a2420] hover:border-[#8b7355] hover:bg-[#f8f6f3] transition-all flex items-center justify-between group"
                  >
                    <span>{topic}</span>
                    <svg
                      className="group-hover:translate-x-1 transition-transform"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="#8b7355"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e8e6e3] px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}
