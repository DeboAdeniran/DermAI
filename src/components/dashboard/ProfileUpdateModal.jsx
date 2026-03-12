import { useState, useEffect } from "react";
import { users, getUser, saveUser } from "../../services/api";
import { Loader } from "lucide-react";

export function ProfileUpdateModal({ isOpen, onClose }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // FIX: was hardcoded dummy data — now loads real user from localStorage
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    skinType: "",
    concerns: [],
    allergies: "",
    budget: "",
    preferences: [],
    storeAccess: "",
  });

  // Load real user data when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setSuccess(false);
    const u = getUser();
    if (u) {
      setFormData({
        name: u.name || "",
        age: u.age ? String(u.age) : "",
        gender: u.gender || "",
        location: u.location || "",
        skinType: u.skinProfile?.skinType || "",
        concerns: u.skinProfile?.concerns || [],
        allergies: u.skinProfile?.allergies || "",
        budget: u.preferences?.budget || "",
        preferences: u.preferences?.preferences || [],
        storeAccess: u.preferences?.storeAccess || "",
      });
    }
  }, [isOpen]);

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

  // FIX: was console.log + alert with no API call — now calls real endpoints
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      // Update basic profile (name, age, gender, location)
      const profileRes = await users.updateProfile({
        name: formData.name,
        // FIX: schema expects Number — empty string must be omitted, otherwise send as Number
        ...(formData.age !== "" ? { age: Number(formData.age) } : {}),
        gender: formData.gender,
        location: formData.location,
      });

      // Update skin profile
      await users.updateSkinProfile({
        skinType: formData.skinType,
        concerns: formData.concerns,
        allergies: formData.allergies,
      });

      // Update preferences
      await users.updatePreferences({
        budget: formData.budget,
        preferences: formData.preferences,
        storeAccess: formData.storeAccess,
      });

      // Save updated user to localStorage so nav name refreshes
      if (profileRes?.user) {
        saveUser(profileRes.user);
        // Dispatch event so AuthNav can pick up the name change
        window.dispatchEvent(new Event("user:updated"));
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8e6e3] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl text-[#2a2420] font-light">Update Profile</h2>
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="p-6 space-y-6">
            {/* Error / Success */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 font-light">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 font-light">
                ✓ Profile saved successfully!
              </div>
            )}

            {/* Basic Info */}
            <div>
              <h3 className="text-lg text-[#2a2420] font-light mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#2a2420] mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      min="13"
                      max="120"
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#2a2420] mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                    >
                      <option value="">Select</option>
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
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#e8e6e3]" />

            {/* Skin Profile */}
            <div>
              <h3 className="text-lg text-[#2a2420] font-light mb-4">
                Skin Profile
              </h3>
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
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${formData.skinType === type ? "border-[#8b7355] bg-[#8b7355] text-white" : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Skin Concerns
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Acne",
                      "Hyperpigmentation",
                      "Dark Spots",
                      "Dryness",
                      "Oiliness",
                      "Sensitivity",
                      "Dullness",
                      "Large Pores",
                    ].map((concern) => (
                      <button
                        key={concern}
                        type="button"
                        onClick={() => toggleArrayItem("concerns", concern)}
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${formData.concerns.includes(concern) ? "border-[#8b7355] bg-[#8b7355] text-white" : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"}`}
                      >
                        {concern}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Allergies / Ingredients to Avoid
                  </label>
                  <textarea
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

            <div className="border-t border-[#e8e6e3]" />

            {/* Preferences */}
            <div>
              <h3 className="text-lg text-[#2a2420] font-light mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#2a2420] mb-2">
                    Budget Range
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        value: "Budget (Under ₦5,000)",
                        label: "Budget-Friendly",
                        desc: "Under ₦5,000",
                      },
                      {
                        value: "Mid-range (₦5,000 - ₦15,000)",
                        label: "Mid-Range",
                        desc: "₦5,000 – ₦15,000",
                      },
                      {
                        value: "Premium (₦15,000+)",
                        label: "Premium",
                        desc: "₦15,000+",
                      },
                    ].map((b) => (
                      <button
                        key={b.value}
                        type="button"
                        onClick={() => handleInputChange("budget", b.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${formData.budget === b.value ? "border-[#8b7355] bg-[#8b7355]/5" : "border-[#e8e6e3] bg-white hover:border-[#8b7355]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.budget === b.value ? "border-[#8b7355]" : "border-[#e8e6e3]"}`}
                          >
                            {formData.budget === b.value && (
                              <div className="w-2 h-2 rounded-full bg-[#8b7355]" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm text-[#2a2420]">
                              {b.label}
                            </div>
                            <div className="text-xs text-[#8b7355]">
                              {b.desc}
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
                        className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${formData.preferences.includes(pref) ? "border-[#8b7355] bg-[#8b7355] text-white" : "border-[#e8e6e3] bg-white text-[#2a2420] hover:border-[#8b7355]"}`}
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
                      { value: "Online only", label: "Online Shopping Only" },
                      {
                        value: "Physical stores",
                        label: "Physical Stores Nearby",
                      },
                      { value: "Both", label: "Both Online & In-Store" },
                    ].map((a) => (
                      <button
                        key={a.value}
                        type="button"
                        onClick={() =>
                          handleInputChange("storeAccess", a.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left ${formData.storeAccess === a.value ? "border-[#8b7355] bg-[#8b7355]/5" : "border-[#e8e6e3] bg-white hover:border-[#8b7355]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.storeAccess === a.value ? "border-[#8b7355]" : "border-[#e8e6e3]"}`}
                          >
                            {formData.storeAccess === a.value && (
                              <div className="w-2 h-2 rounded-full bg-[#8b7355]" />
                            )}
                          </div>
                          <div className="text-sm text-[#2a2420]">
                            {a.label}
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
              className="flex-1 px-6 py-3 border-2 border-[#e8e6e3] text-[#2a2420] rounded-xl hover:border-[#8b7355] transition-all font-light"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all font-light disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader size={14} className="animate-spin" /> Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
