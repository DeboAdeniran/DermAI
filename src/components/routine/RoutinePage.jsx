/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Sun,
  Moon,
  Bell,
  Clock,
  DollarSign,
  Package,
  Calendar,
  Plus,
  X,
  Edit,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Droplets,
  Zap,
  Shield,
  Heart,
  Wind,
  Cloud,
  Star,
  Thermometer,
  MoonStar,
  Palette,
  Droplet,
  Waves,
  CloudRain,
  SunDim,
  Sunrise,
  Sunset,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RoutinePage() {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeRoutine, setActiveRoutine] = useState("am");
  const [expandedInstructions, setExpandedInstructions] = useState([]);

  const mockUser = { name: "Ada" };

  // AM Routine State
  const [amRoutine, setAmRoutine] = useState([
    {
      id: "am-cleanse",
      product: {
        name: "Hydrating Facial Cleanser",
        brand: "CeraVe",
        image:
          "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "",
    },
    {
      id: "am-treat",
      product: {
        name: "Niacinamide 10% + Zinc 1%",
        brand: "The Ordinary",
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "Wait 2-3 minutes before next step",
    },
    {
      id: "am-moisturize",
      product: {
        name: "Hydro Boost Water Gel",
        brand: "Neutrogena",
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "",
    },
    {
      id: "am-protect",
      product: {
        name: "Anthelios SPF 50+",
        brand: "La Roche-Posay",
        image:
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "Reapply every 2 hours if outdoors",
    },
  ]);

  // PM Routine State
  const [pmRoutine, setPmRoutine] = useState([
    {
      id: "pm-cleanse",
      product: {
        name: "Hydrating Facial Cleanser",
        brand: "CeraVe",
        image:
          "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "Double cleanse if wearing makeup",
    },
    {
      id: "pm-treat",
      product: null,
      skipped: false,
      reminder: false,
      notes: "",
    },
    {
      id: "pm-moisturize",
      product: {
        name: "Hydro Boost Water Gel",
        brand: "Neutrogena",
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200",
      },
      skipped: false,
      reminder: true,
      notes: "",
    },
    {
      id: "pm-repair",
      product: null,
      skipped: false,
      reminder: false,
      notes: "",
    },
  ]);

  // Weekly Treatments
  const [weeklyTreatments, setWeeklyTreatments] = useState([
    {
      id: "exfoliate",
      name: "Exfoliation",
      frequency: "Twice a week (Monday & Thursday)",
      product: {
        name: "Paula's Choice 2% BHA",
        brand: "Paula's Choice",
        image:
          "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200",
      },
    },
    {
      id: "mask",
      name: "Face Mask",
      frequency: "Once a week (Sunday)",
      product: null,
    },
  ]);

  const getCurrentRoutine = () =>
    activeRoutine === "am" ? amRoutine : pmRoutine;
  const setCurrentRoutine = (routine) => {
    if (activeRoutine === "am") {
      setAmRoutine(routine);
    } else {
      setPmRoutine(routine);
    }
  };

  const toggleSkip = (stepId) => {
    const routine = getCurrentRoutine();
    const updated = routine.map((step) =>
      step.id === stepId ? { ...step, skipped: !step.skipped } : step,
    );
    setCurrentRoutine(updated);
  };

  const toggleReminder = (stepId) => {
    const routine = getCurrentRoutine();
    const updated = routine.map((step) =>
      step.id === stepId ? { ...step, reminder: !step.reminder } : step,
    );
    setCurrentRoutine(updated);
  };

  const updateNotes = (stepId, notes) => {
    const routine = getCurrentRoutine();
    const updated = routine.map((step) =>
      step.id === stepId ? { ...step, notes } : step,
    );
    setCurrentRoutine(updated);
  };

  const removeProduct = (stepId) => {
    const routine = getCurrentRoutine();
    const updated = routine.map((step) =>
      step.id === stepId ? { ...step, product: null } : step,
    );
    setCurrentRoutine(updated);
  };

  // Calculate routine summary
  const calculateCost = () => {
    const totalAm = amRoutine.reduce(
      (sum, step) => sum + (step.product && !step.skipped ? 10000 : 0),
      0,
    );
    const totalPm = pmRoutine.reduce(
      (sum, step) => sum + (step.product && !step.skipped ? 10000 : 0),
      0,
    );
    return totalAm + totalPm;
  };

  const calculateTime = () => {
    const amTime = amRoutine.filter((s) => s.product && !s.skipped).length * 2;
    const pmTime = pmRoutine.filter((s) => s.product && !s.skipped).length * 2;
    return { am: amTime, pm: pmTime };
  };

  const stepLabels = {
    "am-cleanse": "Step 1: Cleanse",
    "am-treat": "Step 2: Treat",
    "am-moisturize": "Step 3: Moisturize",
    "am-protect": "Step 4: Protect",
    "pm-cleanse": "Step 1: Cleanse",
    "pm-treat": "Step 2: Treat",
    "pm-moisturize": "Step 3: Moisturize",
    "pm-repair": "Step 4: Repair",
  };

  // Get step icon component
  const getStepIcon = (stepId) => {
    const iconProps = { size: 24, className: "text-[#8b7355]" };

    switch (stepId) {
      case "am-cleanse":
      case "pm-cleanse":
        return <Droplet {...iconProps} />;
      case "am-treat":
      case "pm-treat":
        return <Zap {...iconProps} />;
      case "am-moisturize":
      case "pm-moisturize":
        return <Droplets {...iconProps} />;
      case "am-protect":
        return <SunDim {...iconProps} />;
      case "pm-repair":
        return <MoonStar {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };

  const stepInstructions = {
    "am-cleanse": [
      "Wet your face with lukewarm water",
      "Apply a small amount of cleanser to your fingertips",
      "Gently massage in circular motions for 30-60 seconds",
      "Rinse thoroughly with lukewarm water",
      "Pat dry with a clean towel",
    ],
    "am-treat": [
      "Apply 2-3 drops to clean, dry skin",
      "Gently pat into skin, avoiding the eye area",
      "Wait 1-2 minutes for absorption",
      "Allow to fully absorb before applying next product",
    ],
    "am-moisturize": [
      "Take a pea-sized amount of moisturizer",
      "Dot on forehead, cheeks, nose, and chin",
      "Gently massage upward and outward",
      "Don't forget your neck",
      "Wait 1-2 minutes before applying sunscreen",
    ],
    "am-protect": [
      "Apply generously (about ½ teaspoon for face)",
      "Apply to all exposed areas of face and neck",
      "Wait 15 minutes before sun exposure",
      "Reapply every 2 hours when outdoors",
      "Reapply immediately after swimming or sweating",
    ],
    "pm-cleanse": [
      "Remove makeup with micellar water first (if wearing makeup)",
      "Wet your face with lukewarm water",
      "Apply cleanser and massage for 30-60 seconds",
      "Rinse thoroughly with lukewarm water",
      "Pat dry gently with a clean towel",
    ],
    "pm-treat": [
      "Apply treatment to clean, dry skin",
      "Use 2-3 drops or pea-sized amount",
      "Gently pat into targeted areas",
      "Allow 2-3 minutes for full absorption",
      "Follow with moisturizer",
    ],
    "pm-moisturize": [
      "Take a slightly larger amount than morning",
      "Apply to face and neck",
      "Use gentle upward strokes",
      "Allow skin to absorb for a few minutes",
      "Can apply eye cream before or after",
    ],
    "pm-repair": [
      "Apply after moisturizer has absorbed",
      "Use as the last step in your routine",
      "Apply a thin layer to affected areas",
      "Allow to work overnight",
      "Start with 2-3 times per week if using retinol",
    ],
  };

  const toggleInstructions = (stepId) => {
    setExpandedInstructions((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId],
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="routine"
        userName={mockUser.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2a2420] font-light">
                My Skincare Routine
              </h1>
              <p className="text-sm sm:text-base text-[#5a5450] font-light">
                Customize your morning and evening routines
              </p>
            </div>
          </div>

          {/* Routine Toggle */}
          <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-xl p-3 flex gap-3 border border-[#e8e6e3]/30">
            <button
              onClick={() => setActiveRoutine("am")}
              className={`flex-1 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-light ${
                activeRoutine === "am"
                  ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-lg"
                  : "text-[#5a5450] hover:bg-white/60"
              }`}
            >
              <Sun size={20} />
              <span className="hidden sm:inline">Morning Routine</span>
              <span className="sm:hidden">AM</span>
            </button>
            <button
              onClick={() => setActiveRoutine("pm")}
              className={`flex-1 px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-3 font-light ${
                activeRoutine === "pm"
                  ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-lg"
                  : "text-[#5a5450] hover:bg-white/60"
              }`}
            >
              <Moon size={20} />
              <span className="hidden sm:inline">Evening Routine</span>
              <span className="sm:hidden">PM</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Routine Steps */}
            <div className="space-y-4">
              {getCurrentRoutine().map((step, index) => (
                <div
                  key={step.id}
                  className={`bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-3xl shadow-xl overflow-hidden border border-[#e8e6e3]/30 transition-all ${
                    step.skipped ? "opacity-60" : "hover:shadow-2xl"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                          {getStepIcon(step.id)}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg text-[#2a2420] font-light">
                            {stepLabels[step.id]}
                          </h3>
                          {step.product && (
                            <span className="text-xs text-[#5a5450] font-light">
                              {step.product.brand}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReminder(step.id)}
                          className={`p-2.5 rounded-xl transition-all ${
                            step.reminder
                              ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                              : "bg-white/60 text-[#5a5450] border border-[#e8e6e3] hover:border-[#8b7355]"
                          }`}
                          title={step.reminder ? "Reminder on" : "Reminder off"}
                        >
                          <Bell size={16} />
                        </button>
                        <button
                          onClick={() => toggleSkip(step.id)}
                          className={`px-4 py-2 rounded-xl text-sm transition-all font-light ${
                            step.skipped
                              ? "bg-red-100 text-red-600 border border-red-200"
                              : "bg-white/60 text-[#5a5450] border border-[#e8e6e3] hover:border-[#8b7355]"
                          }`}
                        >
                          {step.skipped ? "Skipped" : "Skip"}
                        </button>
                      </div>
                    </div>

                    {step.product ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden bg-[#f8f6f3] shrink-0 shadow-md">
                          <img
                            src={step.product.image}
                            alt={step.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base text-[#2a2420] mb-3 font-light">
                            {step.product.name}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => removeProduct(step.id)}
                              className="px-4 py-2 border-2 border-[#e8e6e3] text-[#5a5450] rounded-xl hover:border-red-500 hover:text-red-500 transition-all text-sm font-light flex items-center gap-2"
                            >
                              <X size={16} />
                              Remove
                            </button>
                            <button
                              onClick={() => navigate("/products")}
                              className="px-4 py-2 border-2 border-[#8b7355] text-[#8b7355] rounded-xl hover:bg-[#8b7355] hover:text-white transition-all text-sm font-light flex items-center gap-2"
                            >
                              <Edit size={16} />
                              Replace
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate("/products")}
                        className="w-full py-6 border-3 border-dashed border-[#e8e6e3] rounded-xl hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all text-sm text-[#5a5450] hover:text-[#8b7355] flex items-center justify-center gap-2 font-light"
                      >
                        <Plus size={18} />
                        Add Product
                      </button>
                    )}

                    {/* Instructions Section */}
                    {step.product && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleInstructions(step.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-linear-to-r from-[#8b7355]/5 to-[#6d5a43]/5 border border-[#e8e6e3] rounded-xl hover:border-[#8b7355] transition-all group"
                        >
                          <span className="text-sm text-[#2a2420] font-light flex items-center gap-2">
                            <Info size={16} className="text-[#8b7355]" />
                            How to Apply
                          </span>
                          {expandedInstructions.includes(step.id) ? (
                            <ChevronUp
                              size={18}
                              className="text-[#8b7355] group-hover:text-[#6d5a43]"
                            />
                          ) : (
                            <ChevronDown
                              size={18}
                              className="text-[#8b7355] group-hover:text-[#6d5a43]"
                            />
                          )}
                        </button>
                        {expandedInstructions.includes(step.id) && (
                          <div className="mt-3 p-4 bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-200/50">
                            <ol className="space-y-2">
                              {stepInstructions[step.id].map(
                                (instruction, i) => (
                                  <li
                                    key={i}
                                    className="text-sm text-[#2a2420] font-light flex gap-3"
                                  >
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] text-white text-xs flex items-center justify-center font-light">
                                      {i + 1}
                                    </span>
                                    <span className="flex-1">
                                      {instruction}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Notes Section */}
                    {step.product && (
                      <div className="mt-4">
                        <label className="block text-sm text-[#5a5450] mb-2 font-light flex items-center gap-2">
                          <Info size={14} />
                          Notes (optional)
                        </label>
                        <textarea
                          value={step.notes}
                          onChange={(e) => updateNotes(step.id, e.target.value)}
                          placeholder="Add any special instructions..."
                          rows={2}
                          className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent text-sm resize-none font-light placeholder:text-[#5a5450]/50"
                        />
                        {step.notes && (
                          <div className="mt-2 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 flex gap-2">
                            <AlertCircle
                              size={16}
                              className="text-blue-600 shrink-0 mt-0.5"
                            />
                            <p className="text-sm text-blue-800 font-light">
                              {step.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Treatments */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-3xl shadow-xl p-6 border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Calendar size={20} className="text-[#8b7355]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#2a2420] font-light">
                    Weekly Treatments
                  </h2>
                  <p className="text-xs text-[#5a5450] font-light">
                    Special care for your skin
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {weeklyTreatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    className="border-2 border-[#e8e6e3] rounded-xl p-4 hover:border-[#8b7355]/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base text-[#2a2420] mb-1 font-light">
                          {treatment.name}
                        </h3>
                        <p className="text-sm text-[#5a5450] font-light flex items-center gap-2">
                          <Clock size={14} />
                          {treatment.frequency}
                        </p>
                      </div>
                    </div>
                    {treatment.product ? (
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f8f6f3] shadow-md">
                          <img
                            src={treatment.product.image}
                            alt={treatment.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-[#8b7355] font-light">
                            {treatment.product.brand}
                          </span>
                          <p className="text-sm text-[#2a2420] font-light">
                            {treatment.product.name}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          alert("Add treatment product coming soon!")
                        }
                        className="w-full py-4 border-2 border-dashed border-[#e8e6e3] rounded-lg hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all text-sm text-[#5a5450] hover:text-[#8b7355] flex items-center justify-center gap-2 font-light"
                      >
                        <Plus size={16} />
                        Add Product
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Routine Summary */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-3xl shadow-xl p-6 sticky top-24 border border-[#e8e6e3]/30">
              <h2 className="text-xl text-[#2a2420] mb-6 font-light">
                Routine Summary
              </h2>

              <div className="space-y-4">
                {/* Time Commitment */}
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-600" size={18} />
                    <h3 className="text-sm text-blue-900 font-light">
                      Time Commitment
                    </h3>
                  </div>
                  <p className="text-2xl text-blue-700 mb-1 font-light">
                    {calculateTime().am + calculateTime().pm} min
                  </p>
                  <p className="text-xs text-blue-700 font-light">
                    AM: {calculateTime().am} min | PM: {calculateTime().pm} min
                  </p>
                </div>

                {/* Monthly Cost */}
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-green-600" size={18} />
                    <h3 className="text-sm text-green-900 font-light">
                      Estimated Cost
                    </h3>
                  </div>
                  <p className="text-2xl text-green-700 mb-1 font-light">
                    ₦{calculateCost().toLocaleString()}
                  </p>
                  <p className="text-xs text-green-700 font-light">
                    Per month (average)
                  </p>
                </div>

                {/* Active Products */}
                <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="text-purple-600" size={18} />
                    <h3 className="text-sm text-purple-900 font-light">
                      Active Products
                    </h3>
                  </div>
                  <p className="text-2xl text-purple-700 font-light">
                    {
                      [...amRoutine, ...pmRoutine].filter(
                        (s) => s.product && !s.skipped,
                      ).length
                    }
                  </p>
                </div>

                {/* Next Restock */}
                <div className="bg-linear-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-orange-600" size={18} />
                    <h3 className="text-sm text-orange-900 font-light">
                      Next Restock
                    </h3>
                  </div>
                  <p className="text-lg text-orange-700 font-light">
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString("en-NG", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-orange-700 font-light">~30 days</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button className="w-full px-6 py-3 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2 font-light">
                  <CheckCircle size={18} />
                  Save Routine
                </button>
                <button className="w-full px-6 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-[#8b7355] hover:text-[#8b7355] transition-all font-light">
                  Print Routine
                </button>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <div className="flex gap-2">
                  <Sparkles
                    size={16}
                    className="text-yellow-600 shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-yellow-800 font-light">
                    <strong className="font-normal">Pro tip:</strong>{" "}
                    Consistency is key! Try to follow your routine at the same
                    time each day for best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
