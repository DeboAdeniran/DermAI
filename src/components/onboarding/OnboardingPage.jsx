import { useState } from "react";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Menu,
  X,
  Sparkles,
  User,
  Heart,
  ShoppingBag,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    age: "",
    gender: "",
    location: "",

    // Step 2
    skinType: "",
    concerns: [],
    allergies: "",
    currentRoutine: "",

    // Step 3
    budget: "",
    preferences: [],
    storeAccess: "",

    // Step 4
    photo: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Onboarding complete:", formData);
    alert("Welcome to DermAI! Your profile is all set up. 🎉");
    navigate("/dashboard")
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name && formData.age && formData.gender && formData.location
        );
      case 2:
        return formData.skinType && formData.concerns.length > 0;
      case 3:
        return formData.budget && formData.storeAccess;
      case 4:
        return formData.photo !== null;
      default:
        return false;
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open the device camera
    alert(
      "Camera functionality would open here. For demo purposes, please use the upload button.",
    );
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

  const stepIcons = [
    <User key="user" className="w-5 h-5" />,
    <Sparkles key="sparkles" className="w-5 h-5" />,
    <Heart key="heart" className="w-5 h-5" />,
    <Camera key="camera" className="w-5 h-5" />,
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f8f6f3] via-[#faf8f5] to-[#f5f2ef]">
      {/* Improved Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-white/40">
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center h-14 sm:h-16">
              {/* Logo */}
              <button
                onClick={() => navigateToPage("/home")}
                className="text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity"
              >
                <span className="text-[#2a2420]">derm</span>
                <span className="text-[#8b7355]">AI</span>
              </button>

              {/* Desktop: Step Progress */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#8b7355]/10 rounded-full">
                  {stepIcons[currentStep - 1]}
                  <span className="text-[#2a2420]">
                    Step {currentStep} of 4
                  </span>
                </div>
              </div>

              {/* Mobile: Step Counter & Menu */}
              <div className="flex items-center gap-3">
                <div className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#8b7355]/10 rounded-full text-xs text-[#2a2420]">
                  {stepIcons[currentStep - 1]}
                  <span>{currentStep}/4</span>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 hover:bg-[#8b7355]/10 rounded-full transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-[#2a2420]" />
                  ) : (
                    <Menu className="w-5 h-5 text-[#2a2420]" />
                  )}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => navigateToPage("/login")}
                    className="px-5 py-2 text-[#2a2420] hover:bg-[#8b7355]/10 rounded-full transition-all text-sm"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-[#e8e6e3]/50 mt-2 py-3 px-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => navigateToPage("/login")}
                className="w-full px-4 py-3 text-left text-[#2a2420] hover:bg-[#8b7355]/10 rounded-xl transition-all"
              >
                Sign In
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#2a2420]/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content with proper top padding */}
      <div className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Progress Bar */}
          <div className="mb-10 sm:mb-14">
            <div className="relative flex items-center justify-between mb-6">
              {/* Background Line */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-linear-to-r from-[#e8e6e3] to-[#e8e6e3] -translate-y-1/2 rounded-full">
                <div
                  className="h-full bg-linear-to-r from-[#8b7355] to-[#a68968] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                />
              </div>

              {/* Step Indicators */}
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="relative flex flex-col items-center z-10"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 shadow-lg ${
                      currentStep >= step
                        ? "bg-linear-to-br from-[#8b7355] to-[#a68968] text-white scale-110"
                        : "bg-white border-2 border-[#e8e6e3] text-[#8b7355] scale-100"
                    }`}
                  >
                    {currentStep > step ? (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <div className="flex items-center justify-center">
                        {stepIcons[step - 1]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between text-xs sm:text-sm text-[#5a5450] px-1">
              <span className="hidden sm:inline">Basic Info</span>
              <span className="sm:hidden">Info</span>
              <span className="hidden sm:inline">Skin Profile</span>
              <span className="sm:hidden">Profile</span>
              <span className="hidden sm:inline">Preferences</span>
              <span className="sm:hidden">Prefs</span>
              <span className="hidden sm:inline">Photo Upload</span>
              <span className="sm:hidden">Photo</span>
            </div>
          </div>

          {/* Enhanced Step Content Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-4xl shadow-2xl border border-white/60 p-6 sm:p-10 lg:p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#8b7355] to-[#a68968] rounded-2xl mb-5 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2a2420] mb-4">
                    Let's Get to Know You
                  </h1>
                  <p className="text-[#5a5450] text-lg">
                    Help us personalize your skincare experience
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-[#2a2420] mb-2.5"
                    >
                      What should we call you?{" "}
                      <span className="text-[#8b7355]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      placeholder="Your nickname or preferred name"
                    />
                    <p className="text-xs text-[#8b7355] mt-2 ml-1">
                      This is how we'll address you throughout your skincare
                      journey
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm text-[#2a2420] mb-2.5"
                      >
                        Age <span className="text-[#8b7355]">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange("age", e.target.value)
                        }
                        className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                        placeholder="Your age"
                        min="13"
                        max="120"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm text-[#2a2420] mb-2.5"
                      >
                        Gender <span className="text-[#8b7355]">*</span>
                      </label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm text-[#2a2420] mb-2.5"
                    >
                      Location (City, State){" "}
                      <span className="text-[#8b7355]">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all"
                      placeholder="e.g., Lagos, Nigeria"
                    />
                    <p className="text-xs text-[#8b7355] mt-2 ml-1">
                      We use this to consider climate factors in our
                      recommendations
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Skin Profile */}
            {currentStep === 2 && (
              <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#8b7355] to-[#a68968] rounded-2xl mb-5 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2a2420] mb-4">
                    Your Skin Profile
                  </h1>
                  <p className="text-[#5a5450] text-lg">
                    Help us understand your unique skin characteristics
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#2a2420] mb-3.5">
                      Skin Type <span className="text-[#8b7355]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["Oily", "Dry", "Combination", "Normal"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange("skinType", type)}
                          className={`px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                            formData.skinType === type
                              ? "border-[#8b7355] bg-linear-to-br from-[#8b7355] to-[#a68968] text-white shadow-lg scale-105"
                              : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355] hover:shadow-md"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#2a2420] mb-3.5">
                      Main Skin Concerns{" "}
                      <span className="text-[#8b7355]">*</span>{" "}
                      <span className="text-xs text-[#8b7355]">
                        (Select all that apply)
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "Acne",
                        "Hyperpigmentation",
                        "Dryness",
                        "Sensitivity",
                        "Aging",
                        "Dark Spots",
                        "Uneven Tone",
                        "Large Pores",
                        "Fine Lines",
                      ].map((concern) => (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => toggleArrayItem("concerns", concern)}
                          className={`px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 text-sm ${
                            formData.concerns.includes(concern)
                              ? "border-[#8b7355] bg-linear-to-br from-[#8b7355] to-[#a68968] text-white shadow-lg"
                              : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355] hover:shadow-md"
                          }`}
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="allergies"
                      className="block text-sm text-[#2a2420] mb-2.5"
                    >
                      Allergies or Ingredients to Avoid
                    </label>
                    <textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      rows={3}
                      className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all resize-none"
                      placeholder="e.g., Fragrance, Parabens, Sulfates, Nuts..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="currentRoutine"
                      className="block text-sm text-[#2a2420] mb-2.5"
                    >
                      Current Skincare Routine{" "}
                      <span className="text-xs text-[#8b7355]">(Optional)</span>
                    </label>
                    <textarea
                      id="currentRoutine"
                      value={formData.currentRoutine}
                      onChange={(e) =>
                        handleInputChange("currentRoutine", e.target.value)
                      }
                      rows={4}
                      className="w-full px-5 py-4 bg-[#f8f6f3] rounded-2xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about the products you currently use (AM/PM routine)..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#8b7355] to-[#a68968] rounded-2xl mb-5 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2a2420] mb-4">
                    Your Preferences
                  </h1>
                  <p className="text-[#5a5450] text-lg">
                    Let us know your shopping preferences and priorities
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#2a2420] mb-3.5">
                      Budget Range <span className="text-[#8b7355]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        {
                          value: "low",
                          label: "Budget-Friendly",
                          desc: "₦500 - ₦5,000",
                          emoji: "💰",
                        },
                        {
                          value: "medium",
                          label: "Mid-Range",
                          desc: "₦5,000 - ₦20,000",
                          emoji: "💎",
                        },
                        {
                          value: "high",
                          label: "Premium",
                          desc: "₦20,000+",
                          emoji: "✨",
                        },
                      ].map((budget) => (
                        <button
                          key={budget.value}
                          type="button"
                          onClick={() =>
                            handleInputChange("budget", budget.value)
                          }
                          className={`px-5 py-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                            formData.budget === budget.value
                              ? "border-[#8b7355] bg-linear-to-br from-[#8b7355]/5 to-[#a68968]/5 shadow-lg ring-2 ring-[#8b7355]/20"
                              : "border-[#e8e6e3] bg-white hover:border-[#8b7355] hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${
                                formData.budget === budget.value
                                  ? "border-[#8b7355] bg-[#8b7355]"
                                  : "border-[#e8e6e3]"
                              }`}
                            >
                              {formData.budget === budget.value && (
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{budget.emoji}</span>
                                <span className="text-[#2a2420]">
                                  {budget.label}
                                </span>
                              </div>
                              <div className="text-sm text-[#8b7355]">
                                {budget.desc}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#2a2420] mb-3.5">
                      Product Preferences{" "}
                      <span className="text-xs text-[#8b7355]">
                        (Select all that apply)
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "Natural/Organic",
                        "Vegan",
                        "Cruelty-Free",
                        "Local Brands",
                        "International Brands",
                        "Dermatologist-Tested",
                        "Fragrance-Free",
                        "Hypoallergenic",
                      ].map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => toggleArrayItem("preferences", pref)}
                          className={`px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 text-sm ${
                            formData.preferences.includes(pref)
                              ? "border-[#8b7355] bg-linear-to-br from-[#8b7355] to-[#a68968] text-white shadow-lg"
                              : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355] hover:shadow-md"
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#2a2420] mb-3.5">
                      Shopping Access <span className="text-[#8b7355]">*</span>
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          value: "online-only",
                          label: "Online Shopping Only",
                          desc: "I prefer to shop from home",
                          icon: "🛒",
                        },
                        {
                          value: "stores-nearby",
                          label: "Physical Stores Nearby",
                          desc: "I have access to beauty stores",
                          icon: "🏪",
                        },
                        {
                          value: "both",
                          label: "Both Online & In-Store",
                          desc: "I shop both ways",
                          icon: "🌟",
                        },
                      ].map((access) => (
                        <button
                          key={access.value}
                          type="button"
                          onClick={() =>
                            handleInputChange("storeAccess", access.value)
                          }
                          className={`w-full px-5 py-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                            formData.storeAccess === access.value
                              ? "border-[#8b7355] bg-linear-to-br from-[#8b7355]/5 to-[#a68968]/5 shadow-lg ring-2 ring-[#8b7355]/20"
                              : "border-[#e8e6e3] bg-white hover:border-[#8b7355] hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                formData.storeAccess === access.value
                                  ? "border-[#8b7355] bg-[#8b7355]"
                                  : "border-[#e8e6e3]"
                              }`}
                            >
                              {formData.storeAccess === access.value && (
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                              )}
                            </div>
                            <span className="text-xl">{access.icon}</span>
                            <div className="flex-1">
                              <div className="text-[#2a2420] mb-0.5">
                                {access.label}
                              </div>
                              <div className="text-sm text-[#8b7355]">
                                {access.desc}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Photo Upload */}
            {currentStep === 4 && (
              <div className="space-y-7 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#8b7355] to-[#a68968] rounded-2xl mb-5 shadow-lg">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#2a2420] mb-4">
                    Upload Your Photo
                  </h1>
                  <p className="text-[#5a5450] text-lg">
                    A clear photo helps us analyze your skin better
                  </p>
                </div>

                {!formData.photo ? (
                  <>
                    {/* Instructions */}
                    <div className="bg-linear-to-br from-[#f8f6f3] to-[#faf8f5] p-7 rounded-3xl border-2 border-[#e8e6e3] mb-6">
                      <h3 className="text-lg text-[#2a2420] mb-5 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#8b7355]/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-[#8b7355]" />
                        </div>
                        Tips for Best Results
                      </h3>
                      <ul className="space-y-3 text-sm text-[#5a5450]">
                        <li className="flex items-start gap-3">
                          <span className="text-[#8b7355] mt-0.5 text-lg">
                            ✓
                          </span>
                          <span>
                            Use natural daylight or bright, even lighting
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#8b7355] mt-0.5 text-lg">
                            ✓
                          </span>
                          <span>
                            Face the camera directly, looking straight ahead
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#8b7355] mt-0.5 text-lg">
                            ✓
                          </span>
                          <span>Remove makeup for accurate skin analysis</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#8b7355] mt-0.5 text-lg">
                            ✓
                          </span>
                          <span>
                            Ensure your entire face is visible and in focus
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-[#8b7355] mt-0.5 text-lg">
                            ✓
                          </span>
                          <span>Avoid harsh shadows or backlighting</span>
                        </li>
                      </ul>
                    </div>

                    {/* Upload Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={handleCameraCapture}
                        className="group flex flex-col items-center justify-center gap-4 p-10 border-3 border-dashed border-[#8b7355] rounded-3xl hover:bg-linear-to-br hover:from-[#8b7355]/5 hover:to-[#a68968]/5 transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="w-20 h-20 bg-linear-to-br from-[#8b7355]/10 to-[#a68968]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            width="40"
                            height="40"
                            fill="none"
                            stroke="#8b7355"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-[#2a2420] mb-1">Take Photo</p>
                          <p className="text-sm text-[#8b7355]">
                            Use your camera
                          </p>
                        </div>
                      </button>

                      <label className="group flex flex-col items-center justify-center gap-4 p-10 border-3 border-dashed border-[#8b7355] rounded-3xl hover:bg-linear-to-br hover:from-[#8b7355]/5 hover:to-[#a68968]/5 transition-all duration-300 cursor-pointer hover:shadow-xl">
                        <div className="w-20 h-20 bg-linear-to-br from-[#8b7355]/10 to-[#a68968]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg
                            width="40"
                            height="40"
                            fill="none"
                            stroke="#8b7355"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-[#2a2420] mb-1">Upload Photo</p>
                          <p className="text-sm text-[#8b7355]">
                            Choose from gallery
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-linear-to-br from-[#8b7355]/10 to-[#a68968]/10 border-2 border-[#8b7355]/30 rounded-2xl p-5 mt-6">
                      <div className="flex gap-4">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="#8b7355"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 mt-0.5"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <div>
                          <p className="text-sm text-[#2a2420] mb-1.5">
                            Your Privacy Matters
                          </p>
                          <p className="text-sm text-[#5a5450]">
                            Your photos are encrypted and used only for skin
                            analysis. We never share your images without
                            consent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Photo Preview */}
                    <div className="space-y-5">
                      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#f8f6f3] to-[#faf8f5] border-2 border-[#e8e6e3] p-4 shadow-xl">
                        <img
                          src={formData.photo}
                          alt="Preview"
                          className="w-full h-auto max-h-96 object-contain mx-auto rounded-2xl"
                        />
                      </div>

                      <div className="flex gap-4">
                        <label className="flex-1 px-6 py-4 border-2 border-[#8b7355] text-[#8b7355] rounded-2xl hover:bg-linear-to-br hover:from-[#8b7355] hover:to-[#a68968] hover:text-white transition-all text-center cursor-pointer duration-300 shadow-md hover:shadow-lg">
                          Retake Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleInputChange("photo", null)}
                          className="px-6 py-4 border-2 border-[#e8e6e3] text-[#5a5450] rounded-2xl hover:border-red-400 hover:text-red-500 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-5 shadow-md">
                        <div className="flex gap-4">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 mt-0.5"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <div>
                            <p className="text-sm text-green-800 mb-1.5">
                              Photo looks great!
                            </p>
                            <p className="text-sm text-green-600">
                              Your image is clear and well-lit. Click "Complete
                              Setup" to finish.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Enhanced Navigation Buttons */}
            <div className="flex gap-4 mt-10 pt-10 border-t-2 border-[#e8e6e3]">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-7 py-4 border-2 border-[#e8e6e3] text-[#2a2420] rounded-2xl hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  ← Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex-1 px-7 py-4 rounded-2xl transition-all duration-300 shadow-lg ${
                    isStepValid()
                      ? "bg-linear-to-r from-[#2a2420] to-[#3a3430] text-white hover:from-[#3a3430] hover:to-[#4a4440] hover:scale-[1.02] hover:shadow-xl"
                      : "bg-[#e8e6e3] text-[#8b7355] cursor-not-allowed opacity-60"
                  }`}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`flex-1 px-7 py-4 rounded-2xl transition-all duration-300 shadow-lg ${
                    isStepValid()
                      ? "bg-linear-to-r from-[#2a2420] to-[#3a3430] text-white hover:from-[#3a3430] hover:to-[#4a4440] hover:scale-[1.02] hover:shadow-xl"
                      : "bg-[#e8e6e3] text-[#8b7355] cursor-not-allowed opacity-60"
                  }`}
                >
                  Complete Setup ✓
                </button>
              )}
            </div>

            {/* Step Indicator Text */}
            <p className="text-center text-sm text-[#8b7355] mt-5 flex items-center justify-center gap-2">
              <span className="text-[#8b7355]">*</span>
              <span>Required fields</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
