import { useState } from "react";
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
import { users, saveUser } from "../../services/api";

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    skinType: "",
    concerns: [],
    allergies: "",
    currentRoutine: "",
    budget: "",
    preferences: [],
    storeAccess: "",
    photo: null,
    photoFile: null,
  });

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

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

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
    try {
      const data = await users.completeOnboarding({
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        skinType: formData.skinType,
        concerns: formData.concerns,
        allergies: formData.allergies,
        currentRoutine: formData.currentRoutine,
        budget: formData.budget,
        preferences: formData.preferences,
        storeAccess: formData.storeAccess,
        photo: formData.photoFile || null,
      });
      saveUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Failed to complete onboarding. Please try again.",
      );
      setIsLoading(false);
    }
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
      handleInputChange("photoFile", file);
      const reader = new FileReader();
      reader.onloadend = () => handleInputChange("photo", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepIcons = [
    <User key="user" className="w-5 h-5" />,
    <Sparkles key="sparkles" className="w-5 h-5" />,
    <Heart key="heart" className="w-5 h-5" />,
    <Camera key="camera" className="w-5 h-5" />,
  ];

  const SKIN_TYPES = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];
  const SKIN_CONCERNS = [
    "Acne",
    "Dark Spots",
    "Dryness",
    "Oiliness",
    "Wrinkles",
    "Sensitivity",
    "Dullness",
    "Large Pores",
    "Hyperpigmentation",
    "Redness",
  ];
  const BUDGETS = [
    "Under ₦5,000",
    "₦5,000 - ₦15,000",
    "₦15,000 - ₦30,000",
    "Above ₦30,000",
  ];
  const PREFERENCES = [
    "Natural/Organic",
    "Fragrance-free",
    "Vegan",
    "Cruelty-free",
    "Local brands",
    "International brands",
  ];
  const STORE_ACCESS = ["Online only", "Physical stores", "Both"];
  const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];
  const ROUTINE_TYPES = [
    "None",
    "Basic (cleanser + moisturizer)",
    "Intermediate (5-7 steps)",
    "Advanced (8+ steps)",
  ];

  // ── Reusable style helpers ──────────────────────────────────────────────────
  const inputCls =
    "w-full px-4 py-3 rounded-xl border font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all";
  const inputStyle = {
    background: "var(--bg-subtle)",
    borderColor: "var(--border)",
    color: "var(--text-primary)",
  };

  const chipActive = "bg-[#8b7355] text-white shadow-md";
  const chipInactive =
    "border font-light transition-all hover:border-[#8b7355]";
  const chipInactiveStyle = {
    background: "var(--bg-subtle)",
    borderColor: "var(--border)",
    color: "var(--text-secondary)",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* ── Floating Navbar ──────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <nav
          className="max-w-7xl mx-auto backdrop-blur-xl rounded-full shadow-lg border"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="px-4 sm:px-6">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <button
                onClick={() => navigateToPage("/home")}
                className="text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity"
              >
                <span style={{ color: "var(--text-primary)" }}>derm</span>
                <span style={{ color: "var(--brand)" }}>AI</span>
              </button>

              <div className="hidden md:flex items-center gap-2 text-sm">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "var(--bg-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  {stepIcons[currentStep - 1]}
                  <span>Step {currentStep} of 4</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: "var(--bg-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  {stepIcons[currentStep - 1]}
                  <span>{currentStep}/4</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-full transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => navigateToPage("/login")}
                    className="px-5 py-2 rounded-full transition-all text-sm hover:opacity-80"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div
              className="md:hidden border-t mt-2 py-3 px-4 space-y-2"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => navigateToPage("/login")}
                className="w-full px-4 py-3 text-left rounded-xl transition-all"
                style={{ color: "var(--text-primary)" }}
              >
                Sign In
              </button>
            </div>
          )}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-sm z-40"
          style={{ background: "rgba(42,36,32,0.3)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* ── Progress Steps ──────────────────────────────────────────────── */}
          <div className="mb-10 sm:mb-14">
            <div className="relative flex items-center justify-between mb-6">
              {/* Track */}
              <div
                className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
                style={{ background: "var(--border)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((currentStep - 1) / 3) * 100}%`,
                    background: "linear-gradient(to right, #8b7355, #a68968)",
                  }}
                />
              </div>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="relative flex flex-col items-center z-10"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 shadow-lg ${currentStep >= step ? "scale-110" : "scale-100 border-2"}`}
                    style={
                      currentStep >= step
                        ? {
                            background:
                              "linear-gradient(135deg, #8b7355, #a68968)",
                            color: "#fff",
                          }
                        : {
                            background: "var(--bg-surface)",
                            borderColor: "var(--border)",
                            color: "var(--brand)",
                          }
                    }
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      stepIcons[step - 1]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Error ────────────────────────────────────────────────────────── */}
          {error && (
            <div
              className="mb-6 p-4 rounded-2xl text-sm font-light"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#f87171",
              }}
            >
              {error}
            </div>
          )}

          {/* ── Step Card ────────────────────────────────────────────────────── */}
          <div
            className="backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2
                  className="text-2xl font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  Tell us about yourself
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm mb-2 font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={inputCls}
                      style={inputStyle}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm mb-2 font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Age *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      min="13"
                      max="100"
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className={inputCls}
                      style={inputStyle}
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm mb-2 font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Gender *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GENDERS.map((g) => (
                        <button
                          key={g}
                          onClick={() => handleInputChange("gender", g)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${formData.gender === g ? chipActive : chipInactive}`}
                          style={formData.gender === g ? {} : chipInactiveStyle}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm mb-2 font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className={inputCls}
                      style={inputStyle}
                      placeholder="e.g. Lagos, Nigeria"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2
                  className="text-2xl font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your skin profile
                </h2>
                <div>
                  <label
                    className="block text-sm mb-3 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Skin Type *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleInputChange("skinType", type)}
                        className={`px-5 py-2.5 rounded-full text-sm transition-all ${formData.skinType === type ? chipActive : chipInactive}`}
                        style={
                          formData.skinType === type ? {} : chipInactiveStyle
                        }
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm mb-3 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Skin Concerns * (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_CONCERNS.map((concern) => (
                      <button
                        key={concern}
                        onClick={() => toggleArrayItem("concerns", concern)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.concerns.includes(concern) ? chipActive : chipInactive}`}
                        style={
                          formData.concerns.includes(concern)
                            ? {}
                            : chipInactiveStyle
                        }
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm mb-2 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Allergies or Sensitivities
                  </label>
                  <textarea
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    className={inputCls + " resize-none"}
                    style={inputStyle}
                    rows={2}
                    placeholder="e.g. Fragrance, parabens, retinol..."
                  />
                </div>
                <div>
                  <label
                    className="block text-sm mb-2 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Current Routine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ROUTINE_TYPES.map((r) => (
                      <button
                        key={r}
                        onClick={() => handleInputChange("currentRoutine", r)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.currentRoutine === r ? chipActive : chipInactive}`}
                        style={
                          formData.currentRoutine === r ? {} : chipInactiveStyle
                        }
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2
                  className="text-2xl font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  Your preferences
                </h2>
                <div>
                  <label
                    className="block text-sm mb-3 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Budget *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        onClick={() => handleInputChange("budget", b)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.budget === b ? chipActive : chipInactive}`}
                        style={formData.budget === b ? {} : chipInactiveStyle}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm mb-3 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Product Preferences (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PREFERENCES.map((p) => (
                      <button
                        key={p}
                        onClick={() => toggleArrayItem("preferences", p)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.preferences.includes(p) ? chipActive : chipInactive}`}
                        style={
                          formData.preferences.includes(p)
                            ? {}
                            : chipInactiveStyle
                        }
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm mb-3 font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Where do you shop? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STORE_ACCESS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleInputChange("storeAccess", s)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${formData.storeAccess === s ? chipActive : chipInactive}`}
                        style={
                          formData.storeAccess === s ? {} : chipInactiveStyle
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2
                  className="text-2xl font-light"
                  style={{ color: "var(--text-primary)" }}
                >
                  Add a profile photo
                </h2>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Upload a clear photo for your profile. This helps us
                  personalise your experience.
                </p>
                {!formData.photo ? (
                  <div className="space-y-4">
                    <label
                      className="group flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all"
                      style={{
                        borderColor: "var(--brand)",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(139,115,85,0.06)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: "rgba(139,115,85,0.12)" }}
                      >
                        <Camera style={{ color: "var(--brand)" }} size={40} />
                      </div>
                      <div className="text-center">
                        <p
                          className="mb-1 font-light"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Upload Photo
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--brand)" }}
                        >
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
                    <div
                      className="rounded-2xl p-5 border-2"
                      style={{
                        background: "rgba(139,115,85,0.08)",
                        borderColor: "rgba(139,115,85,0.25)",
                      }}
                    >
                      <p
                        className="text-sm font-light"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <strong style={{ color: "var(--text-primary)" }}>
                          Your Privacy Matters:{" "}
                        </strong>
                        Your photos are encrypted and used only for skin
                        analysis. We never share your images without consent.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div
                      className="relative rounded-3xl overflow-hidden p-4 border-2"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-auto max-h-96 object-contain mx-auto rounded-2xl"
                      />
                    </div>
                    <div className="flex gap-4">
                      <label
                        className="flex-1 px-6 py-4 border-2 rounded-2xl text-center cursor-pointer transition-all"
                        style={{
                          borderColor: "var(--brand)",
                          color: "var(--brand)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--brand)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--brand)";
                        }}
                      >
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
                        onClick={() => {
                          handleInputChange("photo", null);
                          handleInputChange("photoFile", null);
                        }}
                        className="px-6 py-4 border-2 rounded-2xl transition-all"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#f87171";
                          e.currentTarget.style.color = "#f87171";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div
                      className="rounded-2xl p-4 border-2"
                      style={{
                        background: "rgba(16,185,129,0.08)",
                        borderColor: "rgba(16,185,129,0.25)",
                      }}
                    >
                      <p
                        className="text-sm font-light"
                        style={{ color: "#6ee7b7" }}
                      >
                        ✓ Photo looks great! Click "Complete Setup" to finish.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Navigation ───────────────────────────────────────────────── */}
            <div
              className="flex gap-4 mt-10 pt-10 border-t-2"
              style={{ borderColor: "var(--border)" }}
            >
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-7 py-4 border-2 rounded-2xl transition-all shadow-md"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--brand)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  ← Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex-1 px-7 py-4 rounded-2xl transition-all shadow-lg font-light"
                  style={
                    isStepValid()
                      ? {
                          background: "var(--text-primary)",
                          color: "var(--bg-base)",
                        }
                      : {
                          background: "var(--bg-muted)",
                          color: "var(--text-faint)",
                          cursor: "not-allowed",
                          opacity: 0.6,
                        }
                  }
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isLoading}
                  className="flex-1 px-7 py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 font-light"
                  style={
                    isStepValid() && !isLoading
                      ? {
                          background: "var(--text-primary)",
                          color: "var(--bg-base)",
                        }
                      : {
                          background: "var(--bg-muted)",
                          color: "var(--text-faint)",
                          cursor: "not-allowed",
                          opacity: 0.6,
                        }
                  }
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    "Complete Setup ✓"
                  )}
                </button>
              )}
            </div>
            <p
              className="text-center text-sm mt-5 font-light"
              style={{ color: "var(--brand)" }}
            >
              * Required fields
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
