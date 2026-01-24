import { useState, useEffect } from "react";

export function ProfileUpdateModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nickname: "Ada",
    age: "28",
    gender: "female",
    location: "Lagos, Nigeria",
    skinType: "Oily",
    concerns: ["Acne", "Hyperpigmentation"],
    allergies: "Fragrance, Parabens",
    budget: "medium",
    preferences: ["Natural/Organic", "Cruelty-Free"],
    storeAccess: "both",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    alert("Profile updated successfully! ✓");
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8e6e3] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-[#2a2420]">Update Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f8f6f3] transition-colors"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#2a2420"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-sm text-[#2a2420] mb-2"
                  >
                    Preferred Name
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) =>
                      handleInputChange("nickname", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm text-[#2a2420] mb-2"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                      min="13"
                      max="120"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm text-[#2a2420] mb-2"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                    >
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
                    className="block text-sm text-[#2a2420] mb-2"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e8e6e3]"></div>

            {/* Skin Profile */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-4">Skin Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Skin Type
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["Oily", "Dry", "Combination", "Normal"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleInputChange("skinType", type)}
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${
                          formData.skinType === type
                            ? "border-[#8b7355] bg-[#8b7355] text-white"
                            : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Main Concerns
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Acne",
                      "Hyperpigmentation",
                      "Dryness",
                      "Sensitivity",
                      "Aging",
                      "Dark Spots",
                    ].map((concern) => (
                      <button
                        key={concern}
                        type="button"
                        onClick={() => toggleArrayItem("concerns", concern)}
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${
                          formData.concerns.includes(concern)
                            ? "border-[#8b7355] bg-[#8b7355] text-white"
                            : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"
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
                    className="block text-sm text-[#2a2420] mb-2"
                  >
                    Allergies / Ingredients to Avoid
                  </label>
                  <textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) =>
                      handleInputChange("allergies", e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all resize-none"
                    placeholder="e.g., Fragrance, Parabens"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#e8e6e3]"></div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg text-[#2a2420] mb-4">Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Budget Range
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: "low",
                        label: "Budget-Friendly",
                        desc: "₦500 - ₦5,000",
                      },
                      {
                        value: "medium",
                        label: "Mid-Range",
                        desc: "₦5,000 - ₦20,000",
                      },
                      { value: "high", label: "Premium", desc: "₦20,000+" },
                    ].map((budget) => (
                      <button
                        key={budget.value}
                        type="button"
                        onClick={() =>
                          handleInputChange("budget", budget.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${
                          formData.budget === budget.value
                            ? "border-[#8b7355] bg-[#8b7355]/5"
                            : "border-[#e8e6e3] bg-white hover:border-[#8b7355]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.budget === budget.value
                                ? "border-[#8b7355]"
                                : "border-[#e8e6e3]"
                            }`}
                          >
                            {formData.budget === budget.value && (
                              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-[#2a2420]">
                              {budget.label}
                            </div>
                            <div className="text-xs text-[#8b7355]">
                              {budget.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Product Preferences
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Natural/Organic",
                      "Vegan",
                      "Cruelty-Free",
                      "Local Brands",
                      "Dermatologist-Tested",
                      "Fragrance-Free",
                    ].map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => toggleArrayItem("preferences", pref)}
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${
                          formData.preferences.includes(pref)
                            ? "border-[#8b7355] bg-[#8b7355] text-white"
                            : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Shopping Access
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "online-only", label: "Online Shopping Only" },
                      {
                        value: "stores-nearby",
                        label: "Physical Stores Nearby",
                      },
                      { value: "both", label: "Both Online & In-Store" },
                    ].map((access) => (
                      <button
                        key={access.value}
                        type="button"
                        onClick={() =>
                          handleInputChange("storeAccess", access.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${
                          formData.storeAccess === access.value
                            ? "border-[#8b7355] bg-[#8b7355]/5"
                            : "border-[#e8e6e3] bg-white hover:border-[#8b7355]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.storeAccess === access.value
                                ? "border-[#8b7355]"
                                : "border-[#e8e6e3]"
                            }`}
                          >
                            {formData.storeAccess === access.value && (
                              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
                            )}
                          </div>
                          <div className="text-sm text-[#2a2420]">
                            {access.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-[#e8e6e3] px-6 py-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#e8e6e3] text-[#2a2420] rounded-xl hover:border-[#8b7355] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
