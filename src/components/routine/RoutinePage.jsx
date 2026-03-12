/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Flame,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader,
  Sparkles,
  History,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routines, users, getUser } from "../../services/api";

const STEP_INSTRUCTIONS = {
  Cleanse: [
    "Wet face with lukewarm water",
    "Apply cleanser, massage 30–60 seconds",
    "Rinse thoroughly",
    "Pat dry gently",
  ],
  Tone: [
    "Apply toner to a cotton pad or hands",
    "Press gently into skin — don't rub",
    "Allow to absorb fully before next step",
  ],
  Treat: [
    "Apply a few drops to fingertips",
    "Press lightly into skin",
    "Allow 2–3 minutes before moisturiser",
  ],
  Moisturize: [
    "Dispense pea-sized amount",
    "Apply in upward circular motions",
    "Include neck area",
  ],
  Protect: [
    "Apply sunscreen as the last AM step",
    "Use generous amount — ¼ tsp for face",
    "Reapply every 2 hours outdoors",
  ],
  "Eye Care": [
    "Use ring finger — least pressure",
    "Tap gently around orbital bone",
    "Never pull or rub eye area",
  ],
  Other: ["Follow product instructions", "Patch test if new product"],
};

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toLocalDateStr = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export function RoutinePage() {
  const navigate = useNavigate();
  const user = getUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState("am");
  const [routine, setRoutine] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [weekLogs, setWeekLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [expandedStep, setExpandedStep] = useState(null);

  const loadData = useCallback(async () => {
    const [routineRes, statsRes, historyRes] = await Promise.allSettled([
      routines.getCurrent(),
      users.getStats(),
      routines.getHistory(1, 7),
    ]);
    if (routineRes.status === "fulfilled") {
      setRoutine(routineRes.value.routine);
      setTodayLog(routineRes.value.todayLog);
    }
    if (statsRes.status === "fulfilled") setStats(statsRes.value.stats);
    if (historyRes.status === "fulfilled")
      setWeekLogs(historyRes.value.logs || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentSteps =
    activePeriod === "am" ? routine?.amSteps || [] : routine?.pmSteps || [];
  const completedIds = new Set([
    ...(todayLog?.amStepsCompleted || []).map((s) => s.stepId),
    ...(todayLog?.pmStepsCompleted || []).map((s) => s.stepId),
  ]);
  const sessionDone =
    activePeriod === "am" ? todayLog?.amCompleted : todayLog?.pmCompleted;
  const completedCount = sessionDone
    ? currentSteps.length
    : currentSteps.filter((s) => completedIds.has(s._id?.toString())).length;
  const completionPct =
    currentSteps.length > 0
      ? Math.round((completedCount / currentSteps.length) * 100)
      : 0;

  const handleCompleteSession = async () => {
    if (sessionDone || completing) return;
    setCompleting(true);
    try {
      await routines.completeSession(
        activePeriod,
        currentSteps.map((s) => s._id?.toString()),
        [],
      );
      await loadData();
    } catch (err) {
      console.error(err);
    }
    setCompleting(false);
  };

  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return d;
  });

  const completedDates = new Set(
    weekLogs
      .filter((l) => l.amCompleted || l.pmCompleted)
      .map((l) => l.dateString),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="routine"
        userName={user?.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light mb-1">
            My Routine
          </h1>
          <p className="text-sm text-[#5a5450] font-light">
            Consistency is the secret to great skin
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader size={28} className="text-[#8b7355] animate-spin" />
          </div>
        ) : (
          <>
            {/* Streak stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                {
                  label: "Day Streak",
                  value: stats?.routineStreak ?? 0,
                  icon: Flame,
                  color: "from-amber-500 to-orange-600",
                },
                {
                  label: "Best Streak",
                  value: stats?.longestStreak ?? 0,
                  icon: Star,
                  color: "from-[#8b7355] to-[#6d5a43]",
                },
                {
                  label: "Skin Score",
                  value: stats?.currentSkinScore ?? 0,
                  icon: Sparkles,
                  color: "from-emerald-500 to-teal-600",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className={`bg-linear-to-br ${color} rounded-2xl p-4 text-white shadow-md`}
                >
                  <Icon size={16} className="opacity-70 mb-2" />
                  <p className="text-2xl font-light">{value}</p>
                  <p className="text-xs font-light opacity-70 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Week calendar — FIX: shows real completion ticks for all past days */}
            <div className="bg-white/90 rounded-3xl p-5 shadow-lg mb-6">
              <h3 className="text-base text-[#2a2420] font-light mb-4">
                This Week
              </h3>
              <div className="grid grid-cols-7 gap-1.5">
                {weekDates.map((d, i) => {
                  const isToday = d.toDateString() === today.toDateString();
                  // FIX: use local date string to match stored dateString
                  const dateStr = toLocalDateStr(d);
                  // FIX: was `done = isToday ? (todayLog?.amCompleted...) : false`
                  // Now checks completedDates set which includes all past 7 days
                  const done =
                    completedDates.has(dateStr) ||
                    (isToday &&
                      (todayLog?.amCompleted || todayLog?.pmCompleted));
                  return (
                    <div
                      key={i}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${isToday ? "border-2 border-[#8b7355] bg-[#fdf9f5]" : "bg-[#f8f6f3]"}`}
                    >
                      <p className="text-[10px] text-[#5a5450] font-light">
                        {WEEK_DAYS[(d.getDay() + 6) % 7]}
                      </p>
                      <p
                        className={`text-sm font-light ${isToday ? "text-[#8b7355]" : "text-[#2a2420]"}`}
                      >
                        {d.getDate()}
                      </p>
                      {done ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full ${isToday ? "bg-[#8b7355]/20" : "bg-[#e8e6e3]"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!routine ? (
              <div className="bg-white/90 rounded-3xl p-10 text-center shadow-lg">
                <Sparkles
                  size={40}
                  className="text-[#8b7355]/20 mx-auto mb-4"
                />
                <p className="text-[#5a5450] font-light mb-4">
                  No routine set up yet.
                </p>
                <button
                  onClick={() => navigate("/analysis")}
                  className="px-5 py-2.5 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full text-sm font-light"
                >
                  Run Skin Analysis First
                </button>
              </div>
            ) : (
              <div className="bg-white/90 rounded-3xl shadow-lg overflow-hidden">
                {/* AM/PM tabs */}
                <div className="flex border-b border-[#e8e6e3]">
                  {["am", "pm"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setActivePeriod(p)}
                      className={`flex-1 py-4 text-sm font-light transition-all ${activePeriod === p ? "bg-[#2a2420] text-white" : "text-[#5a5450] hover:bg-[#f8f6f3]"}`}
                    >
                      {p === "am" ? "☀️ Morning Routine" : "🌙 Evening Routine"}
                    </button>
                  ))}
                </div>

                <div className="p-5 sm:p-6">
                  {/* Progress */}
                  <div className="flex justify-between text-xs text-[#5a5450] font-light mb-1.5">
                    <span>
                      {completedCount}/{currentSteps.length} steps{" "}
                      {sessionDone ? "· Complete ✓" : ""}
                    </span>
                    <span>{completionPct}%</span>
                  </div>
                  <div className="h-2 bg-[#e8e6e3] rounded-full mb-6">
                    <div
                      className="h-full bg-linear-to-r from-[#8b7355] to-[#c4a882] rounded-full transition-all duration-500"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>

                  {/* Completion banner */}
                  {sessionDone && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 text-center">
                      <CheckCircle2
                        size={28}
                        className="text-emerald-500 mx-auto mb-2"
                      />
                      <p className="text-sm text-emerald-700 font-light">
                        🎉 {activePeriod.toUpperCase()} routine complete!
                      </p>
                      <p className="text-xs text-emerald-600 font-light mt-0.5">
                        Streak: {stats?.routineStreak ?? 0} days 🔥
                      </p>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-3 mb-5">
                    {currentSteps.length === 0 ? (
                      <p className="text-sm text-[#5a5450] font-light text-center py-4">
                        No {activePeriod.toUpperCase()} steps in your routine
                        yet.
                      </p>
                    ) : (
                      currentSteps.map((step) => {
                        const done =
                          sessionDone || completedIds.has(step._id?.toString());
                        const product = step.product;
                        const expanded = expandedStep === step._id;
                        const instrs =
                          STEP_INSTRUCTIONS[step.stepType] ||
                          STEP_INSTRUCTIONS.Other;

                        return (
                          <div
                            key={step._id}
                            className={`border rounded-2xl transition-all ${done ? "border-emerald-200 bg-emerald-50" : "border-[#e8e6e3] bg-white"}`}
                          >
                            <div className="flex items-center gap-3 p-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${done ? "bg-emerald-500 text-white" : "bg-[#8b7355]/10 text-[#8b7355]"}`}
                              >
                                {done ? (
                                  <CheckCircle2 size={16} />
                                ) : (
                                  step.stepOrder
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-light truncate ${done ? "line-through text-[#5a5450]" : "text-[#2a2420]"}`}
                                >
                                  {product?.name || step.stepType}
                                </p>
                                <p className="text-xs text-[#8b7355] font-light">
                                  {product?.brand || step.stepType}
                                </p>
                                {step.notes && (
                                  <p className="text-xs text-[#5a5450] font-light mt-0.5 italic">
                                    {step.notes}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  setExpandedStep(expanded ? null : step._id)
                                }
                                className="w-7 h-7 rounded-full bg-[#f8f6f3] flex items-center justify-center shrink-0"
                              >
                                {expanded ? (
                                  <ChevronUp
                                    size={14}
                                    className="text-[#8b7355]"
                                  />
                                ) : (
                                  <ChevronDown
                                    size={14}
                                    className="text-[#8b7355]"
                                  />
                                )}
                              </button>
                            </div>

                            {expanded && (
                              <div className="px-4 pb-4 pt-0">
                                <div className="bg-[#f8f6f3] rounded-xl p-3">
                                  <p className="text-xs text-[#8b7355] font-light uppercase tracking-wide mb-2">
                                    How to apply
                                  </p>
                                  <ol className="space-y-1.5">
                                    {instrs.map((inst, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-xs text-[#5a5450] font-light"
                                      >
                                        <span className="w-4 h-4 rounded-full bg-[#8b7355] text-white text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                                          {i + 1}
                                        </span>
                                        {inst}
                                      </li>
                                    ))}
                                  </ol>
                                  {step.waitTimeMinutes > 0 && (
                                    <p className="text-xs text-amber-700 font-light mt-2 bg-amber-50 rounded-lg p-2">
                                      ⏱️ Wait {step.waitTimeMinutes} min before
                                      applying next product
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {!sessionDone && currentSteps.length > 0 && (
                    <button
                      onClick={handleCompleteSession}
                      disabled={completing}
                      className="w-full py-4 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-2xl text-sm font-light flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60"
                    >
                      {completing ? (
                        <Loader size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                      Complete {activePeriod.toUpperCase()} Routine
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bottom actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => navigate("/products")}
                className="flex-1 py-3 bg-white/90 border border-[#e8e6e3] text-[#5a5450] rounded-2xl text-sm font-light flex items-center justify-center gap-2 hover:border-[#8b7355] transition-all shadow-sm"
              >
                <ShoppingCart size={16} /> Add Product
              </button>
              <button
                onClick={() => navigate("/routine-history")}
                className="flex-1 py-3 bg-white/90 border border-[#e8e6e3] text-[#5a5450] rounded-2xl text-sm font-light flex items-center justify-center gap-2 hover:border-[#8b7355] transition-all shadow-sm"
              >
                <History size={16} /> View History
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
