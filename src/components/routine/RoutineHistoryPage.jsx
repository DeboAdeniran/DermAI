import { useState, useEffect, useCallback } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Calendar, CheckCircle, Clock, TrendingUp, Sun, Moon,
  Award, Filter, Loader, AlertCircle, ChevronDown, ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { routines, users, getUser } from "../../services/api";

const formatDate = (d) => {
  const date = new Date(d);
  const today = new Date(); today.setHours(0,0,0,0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate()-1);
  if (date.toDateString() === today.toDateString())     return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return date.toLocaleDateString("en-NG", { month:"short", day:"numeric" });
};
const formatTime = (d) => d ? new Date(d).toLocaleTimeString("en-NG", { hour:"2-digit", minute:"2-digit" }) : "";

export function RoutineHistoryPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [logs, setLogs]             = useState([]);
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [filter, setFilter]         = useState("all"); // all | am | pm
  const [expandedLog, setExpandedLog] = useState(null);
  const [pagination, setPagination] = useState({ page:1, pages:1, total:0 });

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    const [historyRes, statsRes] = await Promise.allSettled([
      routines.getHistory(page, 20),
      users.getStats(),
    ]);
    if (historyRes.status === "fulfilled") {
      setLogs(historyRes.value.logs || []);
      setPagination(historyRes.value.pagination || { page:1, pages:1, total:0 });
    } else { setError("Could not load history."); }
    if (statsRes.status === "fulfilled") setStats(statsRes.value.stats);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Expand logs by period filter
  const filteredLogs = logs.filter((log) => {
    if (filter === "am") return log.amCompleted || (log.amStepsCompleted?.length > 0);
    if (filter === "pm") return log.pmCompleted || (log.pmStepsCompleted?.length > 0);
    return true;
  });

  const completionRate = logs.length > 0
    ? Math.round((logs.filter(l => l.amCompleted || l.pmCompleted).length / logs.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <AuthNav currentPage="dashboard" userName={user?.name} onUpdateProfile={() => setIsProfileModalOpen(true)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pt-24 sm:pt-28">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light">Routine History</h1>
          <p className="text-sm text-[#5a5450] font-light mt-1">Track your skincare consistency over time</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label:"Total Logs",      value:pagination.total,             icon:Calendar,  color:"from-[#8b7355] to-[#6d5a43]" },
            { label:"Completed",       value:logs.filter(l=>l.amCompleted||l.pmCompleted).length, icon:CheckCircle, color:"from-emerald-500 to-teal-600" },
            { label:"Current Streak",  value:`${stats?.routineStreak ?? 0}d`, icon:TrendingUp, color:"from-amber-500 to-orange-500" },
            { label:"Completion Rate", value:`${completionRate}%`,          icon:Award,     color:"from-blue-500 to-indigo-500"  },
          ].map(({ label, value, icon:Icon, color }) => (
            <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-md`}>
              <Icon size={16} className="opacity-70 mb-2" />
              <p className="text-2xl font-light">{value}</p>
              <p className="text-xs font-light opacity-70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {[["all","All"],["am","Morning Only"],["pm","Evening Only"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-4 py-2 rounded-xl text-xs font-light transition-all ${filter === v ? "bg-[#2a2420] text-white" : "bg-white text-[#5a5450] border border-[#e8e6e3] hover:border-[#8b7355]"}`}>
              {v === "am" && "☀️ "}{v === "pm" && "🌙 "}{l}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-600 text-sm font-light mb-5">
            <AlertCircle size={16} />{error}
            <button onClick={() => loadData()} className="ml-auto underline">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader size={28} className="text-[#8b7355] animate-spin" /></div>
        ) : filteredLogs.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-12 text-center shadow-lg">
            <Calendar size={36} className="text-[#8b7355]/20 mx-auto mb-3" />
            <p className="text-[#5a5450] font-light mb-3">No routine logs yet.</p>
            <button onClick={() => navigate("/routine")} className="px-5 py-2.5 bg-[#8b7355] text-white rounded-full text-sm font-light">Start Your Routine</button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const hasAM  = log.amCompleted || (log.amStepsCompleted?.length > 0);
              const hasPM  = log.pmCompleted || (log.pmStepsCompleted?.length > 0);
              const bothDone = log.amCompleted && log.pmCompleted;
              const expanded = expandedLog === log._id;

              return (
                <div key={log._id} className="bg-white/90 rounded-2xl shadow-sm border border-[#e8e6e3]/50 overflow-hidden">
                  <button className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setExpandedLog(expanded ? null : log._id)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${bothDone ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-[#8b7355] to-[#6d5a43]"}`}>
                        {bothDone ? <CheckCircle size={18} /> : <Clock size={18} />}
                      </div>
                      <div>
                        <p className="text-sm text-[#2a2420] font-light">{formatDate(log.date)}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {hasAM && <span className={`flex items-center gap-1 text-xs font-light ${log.amCompleted ? "text-emerald-600" : "text-amber-600"}`}><Sun size={10} /> AM {log.amCompleted ? "✓" : "partial"}</span>}
                          {hasPM && <span className={`flex items-center gap-1 text-xs font-light ${log.pmCompleted ? "text-emerald-600" : "text-amber-600"}`}><Moon size={10} /> PM {log.pmCompleted ? "✓" : "partial"}</span>}
                          {!hasAM && !hasPM && <span className="text-xs text-[#5a5450] font-light">No completion</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-lg text-[#2a2420] font-light">{log.routineScore ?? 0}<span className="text-xs text-[#8b7355] ml-0.5">/100</span></p>
                        <p className="text-xs text-[#5a5450] font-light">score</p>
                      </div>
                      {expanded ? <ChevronUp size={16} className="text-[#8b7355]" /> : <ChevronDown size={16} className="text-[#8b7355]" />}
                    </div>
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 border-t border-[#e8e6e3] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {hasAM && (
                        <div className="bg-amber-50 rounded-xl p-3">
                          <p className="text-xs text-amber-700 font-light flex items-center gap-1 mb-2"><Sun size={11} /> Morning {log.amCompleted ? "— Completed" : "— Partial"}</p>
                          {log.amCompletedAt && <p className="text-xs text-amber-600 font-light mb-1">at {formatTime(log.amCompletedAt)}</p>}
                          <p className="text-xs text-amber-700 font-light">{log.amStepsCompleted?.length || 0} steps completed</p>
                        </div>
                      )}
                      {hasPM && (
                        <div className="bg-indigo-50 rounded-xl p-3">
                          <p className="text-xs text-indigo-700 font-light flex items-center gap-1 mb-2"><Moon size={11} /> Evening {log.pmCompleted ? "— Completed" : "— Partial"}</p>
                          {log.pmCompletedAt && <p className="text-xs text-indigo-600 font-light mb-1">at {formatTime(log.pmCompletedAt)}</p>}
                          <p className="text-xs text-indigo-700 font-light">{log.pmStepsCompleted?.length || 0} steps completed</p>
                        </div>
                      )}
                      {log.skinNotes && <p className="text-xs text-[#5a5450] font-light col-span-full italic">"{log.skinNotes}"</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && !loading && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(pagination.pages)].map((_, i) => (
              <button key={i} onClick={() => loadData(i+1)}
                className={`w-9 h-9 rounded-xl text-sm font-light transition-all ${pagination.page === i+1 ? "bg-[#8b7355] text-white" : "bg-white border border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}>
                {i+1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}