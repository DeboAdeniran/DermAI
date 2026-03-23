/* eslint-disable no-empty */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Sparkles,
  Zap,
  ShoppingCart,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Flame,
  Star,
  CheckCircle2,
  ChevronRight,
  Loader,
  Bell,
  Lightbulb,
  BarChart2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  analyses,
  users,
  routines,
  products,
  notifications,
  getUser,
} from "../../services/api";

// ─── Custom chart tooltip ─────────────────────────────────────────────────────
function ScoreTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e8e6e3] rounded-xl shadow-lg px-3 py-2">
      <p className="text-xs text-[#8b7355] font-light mb-0.5">{label}</p>
      <p className="text-lg text-[#2a2420] font-light">
        {payload[0].value}
        <span className="text-xs ml-1 text-[#8b7355]">/ 100</span>
      </p>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, gradient }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-md ${gradient}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-light opacity-80">{label}</p>
        <Icon size={18} className="opacity-70" />
      </div>
      <p className="text-3xl font-light mb-1">{value ?? "—"}</p>
      {sub && <p className="text-xs font-light opacity-70">{sub}</p>}
    </div>
  );
}

export function DashboardPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const fullName = localStorage.getItem("user");

  // Data
  const [stats, setStats] = useState(null);
  const [routine, setRoutine] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [recProducts, setRecProducts] = useState([]);
  const [recentNotifs, setRecentNotifs] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState("am");
  const [completing, setCompleting] = useState(null); // stepId being completed

  const loadData = useCallback(async () => {
    const [statsRes, routineRes, analysisRes, prodsRes, notifsRes] =
      await Promise.allSettled([
        users.getStats(),
        routines.getCurrent(),
        analyses.getLatest(),
        products.getRecommended(),
        notifications.getAll(1, 5),
      ]);
    if (statsRes.status === "fulfilled") setStats(statsRes.value.stats);
    if (routineRes.status === "fulfilled") {
      setRoutine(routineRes.value.routine);
      setTodayLog(routineRes.value.todayLog);
    }
    if (analysisRes.status === "fulfilled")
      setLatestAnalysis(analysisRes.value.analysis);
    if (prodsRes.status === "fulfilled")
      setRecProducts((prodsRes.value.products || []).slice(0, 3));
    if (notifsRes.status === "fulfilled") {
      setRecentNotifs(notifsRes.value.notifications || []);
      setUnreadCount(notifsRes.value.unreadCount || 0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Mark a step complete ─────────────────────────────────────────────────────
  const handleCompleteStep = async (stepId) => {
    setCompleting(stepId);
    try {
      const allSteps =
        activePeriod === "am" ? routine?.amSteps || [] : routine?.pmSteps || [];
      await routines.completeSession(
        activePeriod,
        allSteps.map((s) => s._id),
        [],
      );
      await loadData();
    } catch {}
    setCompleting(null);
  };

  // ── Mark whole session done ──────────────────────────────────────────────────
  const handleCompleteSession = async () => {
    const allSteps =
      activePeriod === "am" ? routine?.amSteps || [] : routine?.pmSteps || [];
    setCompleting("session");
    try {
      await routines.completeSession(
        activePeriod,
        allSteps.map((s) => s._id),
        [],
      );
      await loadData();
    } catch {}
    setCompleting(null);
  };

  // ── Chart data ───────────────────────────────────────────────────────────────
  const chartData = (stats?.scoreHistory || []).map((p) => ({
    date: new Date(p.date).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
    }),
    score: p.score,
  }));
  const hasChart = chartData.length >= 2;
  const scoreDiff = hasChart
    ? chartData[chartData.length - 1].score - chartData[0].score
    : 0;

  // ── Today's steps ────────────────────────────────────────────────────────────
  const currentSteps =
    activePeriod === "am" ? routine?.amSteps || [] : routine?.pmSteps || [];
  const completedIds = new Set([
    ...(todayLog?.amStepsCompleted || []).map((s) => s.stepId),
    ...(todayLog?.pmStepsCompleted || []).map((s) => s.stepId),
  ]);
  const sessionDone =
    activePeriod === "am" ? todayLog?.amCompleted : todayLog?.pmCompleted;
  const completedCount = currentSteps.filter(
    (s) => completedIds.has(s._id?.toString()) || sessionDone,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="dashboard"
        userName={user?.firstName}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 sm:pt-28">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 17
                ? "afternoon"
                : "evening"}
            {user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-sm text-[#5a5450] font-light mt-1">
            Here's your skin health overview for today
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader size={28} className="text-[#8b7355] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ── Left/Main column ─────────────────────────────────────────── */}
            <div className="xl:col-span-2 space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard
                  label="Skin Score"
                  value={stats?.currentSkinScore ?? "—"}
                  sub={
                    scoreDiff !== 0
                      ? `${scoreDiff > 0 ? "+" : ""}${scoreDiff} vs 30d ago`
                      : "No change"
                  }
                  icon={Sparkles}
                  gradient="bg-gradient-to-br from-[#8b7355] to-[#6d5a43]"
                />
                <StatCard
                  label="Day Streak"
                  value={stats?.routineStreak ?? 0}
                  sub={`Best: ${stats?.longestStreak ?? 0}`}
                  icon={Flame}
                  gradient="bg-gradient-to-br from-amber-500 to-orange-600"
                />
                <StatCard
                  label="Analyses"
                  value={stats?.totalAnalyses ?? 0}
                  sub="lifetime total"
                  icon={BarChart2}
                  gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
                />
                <StatCard
                  label="Notifications"
                  value={unreadCount}
                  sub="unread"
                  icon={Bell}
                  gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
                />
              </div>

              {/* Skin score chart */}
              <div className="bg-white/90 rounded-3xl p-5 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg text-[#2a2420] font-light">
                      Skin Health Trend
                    </h3>
                    <p className="text-xs text-[#5a5450] font-light mt-0.5">
                      Last 30 days
                    </p>
                  </div>
                  {hasChart && (
                    <div
                      className={`flex items-center gap-1.5 text-sm font-light px-3 py-1.5 rounded-full ${scoreDiff >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {scoreDiff >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {scoreDiff >= 0 ? "+" : ""}
                      {scoreDiff} pts
                    </div>
                  )}
                </div>

                {hasChart ? (
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="scoreGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b7355"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b7355"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e8e6e3"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "#8b7355" }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 10, fill: "#8b7355" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<ScoreTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#8b7355"
                        strokeWidth={2.5}
                        fill="url(#scoreGrad)"
                        dot={false}
                        activeDot={{
                          r: 5,
                          fill: "#8b7355",
                          stroke: "white",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BarChart2 size={36} className="text-[#8b7355]/20 mb-3" />
                    <p className="text-sm text-[#5a5450] font-light mb-3">
                      Complete more analyses to see your progress chart
                    </p>
                    <button
                      onClick={() => navigate("/analysis")}
                      className="text-sm text-[#8b7355] font-light hover:underline flex items-center gap-1"
                    >
                      Run first analysis <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Today's routine */}
              <div className="bg-white/90 rounded-3xl p-5 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#2a2420] font-light">
                    Today's Routine
                  </h3>
                  <button
                    onClick={() => navigate("/routine")}
                    className="text-xs text-[#8b7355] font-light flex items-center gap-1 hover:underline"
                  >
                    View full <ChevronRight size={12} />
                  </button>
                </div>

                {!routine ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-[#5a5450] font-light mb-3">
                      No routine yet — run a skin analysis first
                    </p>
                    <button
                      onClick={() => navigate("/analysis")}
                      className="px-4 py-2 bg-[#8b7355] text-white rounded-full text-xs font-light"
                    >
                      Start Analysis
                    </button>
                  </div>
                ) : (
                  <>
                    {/* AM/PM tabs */}
                    <div className="flex gap-2 mb-4">
                      {["am", "pm"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setActivePeriod(p)}
                          className={`flex-1 py-2 rounded-xl text-sm font-light transition-all ${activePeriod === p ? "bg-[#2a2420] text-white" : "bg-[#f8f6f3] text-[#5a5450] hover:bg-[#e8e6e3]"}`}
                        >
                          {p === "am" ? "☀️ Morning" : "🌙 Evening"}
                        </button>
                      ))}
                    </div>

                    {/* Progress bar */}
                    {currentSteps.length > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-[#5a5450] font-light mb-1">
                          <span>
                            {sessionDone ? currentSteps.length : completedCount}
                            /{currentSteps.length} steps
                          </span>
                          <span>
                            {sessionDone
                              ? 100
                              : Math.round(
                                  (completedCount / currentSteps.length) * 100,
                                )}
                            %
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#e8e6e3] rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-[#8b7355] to-[#c4a882] rounded-full transition-all"
                            style={{
                              width: `${sessionDone ? 100 : Math.round((completedCount / currentSteps.length) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {sessionDone ? (
                      <div className="text-center py-6">
                        <CheckCircle2
                          size={32}
                          className="text-emerald-500 mx-auto mb-2"
                        />
                        <p className="text-sm text-emerald-700 font-light">
                          🎉 {activePeriod.toUpperCase()} routine complete!
                          Streak: {stats?.routineStreak ?? 0} days 🔥
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2 mb-4">
                          {currentSteps.slice(0, 4).map((step) => {
                            const done = completedIds.has(step._id?.toString());
                            const prod = step.product;
                            return (
                              <div
                                key={step._id}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${done ? "bg-emerald-50 opacity-70" : "bg-[#f8f6f3]"}`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-light shrink-0 ${done ? "bg-emerald-500 text-white" : "bg-[#8b7355]/10 text-[#8b7355]"}`}
                                >
                                  {done ? (
                                    <CheckCircle2 size={14} />
                                  ) : (
                                    step.stepOrder
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-light truncate ${done ? "line-through text-[#8b7355]/50" : "text-[#2a2420]"}`}
                                  >
                                    {prod?.name || step.stepType}
                                  </p>
                                  {prod?.brand && (
                                    <p className="text-xs text-[#8b7355] font-light">
                                      {prod.brand}
                                    </p>
                                  )}
                                </div>
                                {completing === step._id ? (
                                  <Loader
                                    size={14}
                                    className="text-[#8b7355] animate-spin shrink-0"
                                  />
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                        <button
                          onClick={handleCompleteSession}
                          disabled={completing === "session"}
                          className="w-full py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl text-sm font-light flex items-center justify-center gap-2 hover:shadow-md transition-all disabled:opacity-60"
                        >
                          {completing === "session" ? (
                            <Loader size={14} className="animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          Complete {activePeriod.toUpperCase()} Routine
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Latest analysis snapshot */}
              {latestAnalysis && (
                <button
                  onClick={() => navigate("/results")}
                  className="w-full bg-white/90 rounded-3xl p-5 shadow-lg flex items-center gap-4 text-left hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#f8f6f3] shrink-0">
                    {latestAnalysis.photoUrl ? (
                      <img
                        src={latestAnalysis.photoUrl}
                        alt="skin"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Sparkles
                        size={24}
                        className="m-auto mt-4 text-[#8b7355]/30"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#8b7355] font-light mb-1">
                      Latest Analysis
                    </p>
                    <p className="text-base text-[#2a2420] font-light truncate">
                      {latestAnalysis.skinType} Skin · Score{" "}
                      {latestAnalysis.analysisScore}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(latestAnalysis.conditions || [])
                        .slice(0, 2)
                        .map((c) => (
                          <span
                            key={c.name}
                            className="text-xs bg-[#8b7355]/10 text-[#8b7355] px-2 py-0.5 rounded-full font-light"
                          >
                            {c.name}
                          </span>
                        ))}
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-[#8b7355] shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              )}
            </div>

            {/* ── Right sidebar ─────────────────────────────────────────────── */}
            <div className="space-y-5">
              {/* Quick actions */}
              <div className="bg-white/90 rounded-3xl p-5 shadow-lg">
                <h3 className="text-base text-[#2a2420] font-light mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "New Analysis",
                      icon: Sparkles,
                      path: "/analysis",
                      primary: true,
                    },
                    {
                      label: "My Routine",
                      icon: Zap,
                      path: "/routine",
                      primary: false,
                    },
                    {
                      label: "Products",
                      icon: ShoppingCart,
                      path: "/products",
                      primary: false,
                    },
                    {
                      label: "Learn",
                      icon: BookOpen,
                      path: "/learn",
                      primary: false,
                    },
                  ].map(({ label, icon: Icon, path, primary }) => (
                    <button
                      key={label}
                      onClick={() => navigate(path)}
                      className={`py-3 rounded-xl text-xs font-light flex flex-col items-center gap-1.5 transition-all ${primary ? "bg-gradient-to-br from-[#8b7355] to-[#6d5a43] text-white shadow-md" : "bg-[#f8f6f3] text-[#5a5450] hover:bg-[#e8e6e3]"}`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin tip */}
              {latestAnalysis?.skinTip && (
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-5 border border-amber-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={16} className="text-amber-600" />
                    <p className="text-xs text-amber-700 font-light uppercase tracking-wide">
                      Skin Tip
                    </p>
                  </div>
                  <p className="text-sm text-amber-800 font-light leading-relaxed">
                    {latestAnalysis.skinTip}
                  </p>
                </div>
              )}

              {/* Recommended products */}
              {recProducts.length > 0 && (
                <div className="bg-white/90 rounded-3xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base text-[#2a2420] font-light">
                      For Your Skin
                    </h3>
                    <button
                      onClick={() => navigate("/products")}
                      className="text-xs text-[#8b7355] font-light hover:underline"
                    >
                      See all
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recProducts.map((rec, i) => {
                      const p = rec.product || rec;
                      return (
                        <button
                          key={i}
                          onClick={() => navigate("/products")}
                          className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f8f6f3] transition-all text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#f8f6f3] overflow-hidden shrink-0">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ShoppingCart
                                size={14}
                                className="m-auto mt-2.5 text-[#8b7355]/30"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#2a2420] font-light truncate">
                              {p.name}
                            </p>
                            <p className="text-xs text-[#8b7355] font-light">
                              ₦{Number(p.price).toLocaleString("en-NG")}
                            </p>
                          </div>
                          {rec.matchScore && (
                            <span className="text-[10px] bg-[#8b7355]/10 text-[#8b7355] px-1.5 py-0.5 rounded-full font-light shrink-0">
                              {rec.matchScore}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent notifications */}
              {recentNotifs.length > 0 && (
                <div className="bg-white/90 rounded-3xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base text-[#2a2420] font-light flex items-center gap-2">
                      Notifications
                      {unreadCount > 0 && (
                        <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </h3>
                    <button
                      onClick={() => navigate("/notifications")}
                      className="text-xs text-[#8b7355] font-light hover:underline"
                    >
                      All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentNotifs.slice(0, 4).map((n) => (
                      <div
                        key={n._id}
                        className={`p-3 rounded-xl text-xs font-light ${!n.isRead ? "bg-[#fdf9f5] border border-[#8b7355]/20" : "bg-[#f8f6f3]"}`}
                      >
                        <p
                          className={`leading-snug ${!n.isRead ? "text-[#2a2420]" : "text-[#5a5450]"}`}
                        >
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Streak milestone */}
              {(stats?.routineStreak || 0) >= 3 && (
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame size={20} />
                    <p className="text-base font-light">
                      {stats.routineStreak} Day Streak!
                    </p>
                  </div>
                  <p className="text-xs font-light opacity-80">
                    {stats.routineStreak >= 30
                      ? "Incredible dedication! You're a skincare champion 🏆"
                      : stats.routineStreak >= 14
                        ? "Two weeks in! Your skin is loving the consistency 🌟"
                        : stats.routineStreak >= 7
                          ? "One week strong! Keep going, results are coming 💪"
                          : "Great start! Consistency is the key to great skin ✨"}
                  </p>
                  {stats.longestStreak > stats.routineStreak && (
                    <p className="text-xs font-light opacity-60 mt-1">
                      Personal best: {stats.longestStreak} days
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
