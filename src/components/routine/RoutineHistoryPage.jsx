import React, { useState } from "react";
import { AuthNav } from "../ui/AuthNav";
import {
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Droplet,
  Sun,
  Moon,
  Award,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RoutineHistoryPage() {
  const navigate = useNavigate;
  const [userName] = useState("Ada");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("January 2026");

  const routineHistory = [
    {
      id: 1,
      date: "2026-01-12",
      displayDate: "Today",
      time: "07:30 AM",
      type: "am",
      completed: true,
      steps: [
        { name: "Gentle Cleanser", completed: true },
        { name: "Vitamin C Serum", completed: true },
        { name: "Moisturizer", completed: true },
        { name: "SPF 50 Sunscreen", completed: true },
      ],
      duration: "12 min",
      skinFeeling: "Great",
    },
    {
      id: 2,
      date: "2026-01-11",
      displayDate: "Yesterday",
      time: "10:15 PM",
      type: "pm",
      completed: true,
      steps: [
        { name: "Oil Cleanser", completed: true },
        { name: "Foam Cleanser", completed: true },
        { name: "Niacinamide Serum", completed: true },
        { name: "Night Cream", completed: true },
        { name: "Eye Cream", completed: true },
      ],
      duration: "15 min",
      skinFeeling: "Good",
    },
    {
      id: 3,
      date: "2026-01-11",
      displayDate: "Yesterday",
      time: "07:45 AM",
      type: "am",
      completed: true,
      steps: [
        { name: "Gentle Cleanser", completed: true },
        { name: "Vitamin C Serum", completed: true },
        { name: "Moisturizer", completed: true },
        { name: "SPF 50 Sunscreen", completed: true },
      ],
      duration: "10 min",
      skinFeeling: "Great",
    },
    {
      id: 4,
      date: "2026-01-10",
      displayDate: "Jan 10",
      time: "09:30 PM",
      type: "pm",
      completed: true,
      steps: [
        { name: "Oil Cleanser", completed: true },
        { name: "Foam Cleanser", completed: true },
        { name: "Niacinamide Serum", completed: true },
        { name: "Night Cream", completed: false },
        { name: "Eye Cream", completed: false },
      ],
      duration: "8 min",
      skinFeeling: "Okay",
    },
    {
      id: 5,
      date: "2026-01-10",
      displayDate: "Jan 10",
      time: "07:15 AM",
      type: "am",
      completed: false,
      steps: [
        { name: "Gentle Cleanser", completed: true },
        { name: "Vitamin C Serum", completed: false },
        { name: "Moisturizer", completed: false },
        { name: "SPF 50 Sunscreen", completed: false },
      ],
      duration: "3 min",
      skinFeeling: "Rushed",
    },
  ];

  const stats = {
    totalRoutines: 28,
    completedRoutines: 24,
    currentStreak: 7,
    longestStreak: 14,
    avgDuration: "11 min",
    completionRate: 86,
  };

  const filteredHistory = routineHistory.filter((routine) => {
    if (selectedFilter === "all") return true;
    return routine.type === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <AuthNav
        currentPage="dashboard"
        userName={userName}
        onUpdateProfile={() => navigate("/settings")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-2 font-light">
            Routine History
          </h1>
          <p className="text-[#5a5450] font-light">
            Track your skincare journey and consistency
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Total</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.totalRoutines}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Completed</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.completedRoutines}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Streak</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.currentStreak} days
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Best Streak</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.longestStreak} days
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Avg Time</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.avgDuration}
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#8b7355]" />
              <p className="text-xs text-[#5a5450] font-light">Rate</p>
            </div>
            <p className="text-2xl text-[#2a2420] font-light">
              {stats.completionRate}%
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#e8e6e3]/50 shadow-md mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <Filter size={18} className="text-[#8b7355] shrink-0" />
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap font-light ${
                  selectedFilter === "all"
                    ? "bg-[#2a2420] text-white shadow-md"
                    : "bg-[#f8f6f3] text-[#5a5450] hover:bg-white hover:shadow-sm"
                }`}
              >
                All Routines
              </button>
              <button
                onClick={() => setSelectedFilter("am")}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap font-light flex items-center gap-2 ${
                  selectedFilter === "am"
                    ? "bg-[#2a2420] text-white shadow-md"
                    : "bg-[#f8f6f3] text-[#5a5450] hover:bg-white hover:shadow-sm"
                }`}
              >
                <Sun size={16} />
                Morning
              </button>
              <button
                onClick={() => setSelectedFilter("pm")}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap font-light flex items-center gap-2 ${
                  selectedFilter === "pm"
                    ? "bg-[#2a2420] text-white shadow-md"
                    : "bg-[#f8f6f3] text-[#5a5450] hover:bg-white hover:shadow-sm"
                }`}
              >
                <Moon size={16} />
                Evening
              </button>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 bg-[#f8f6f3] rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] text-sm font-light"
            >
              <option>January 2026</option>
              <option>December 2025</option>
              <option>November 2025</option>
              <option>October 2025</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((routine) => (
            <div
              key={routine.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#e8e6e3]/50 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      routine.type === "am"
                        ? "bg-linear-to-br from-orange-100 to-yellow-100"
                        : "bg-linear-to-br from-indigo-100 to-purple-100"
                    }`}
                  >
                    {routine.type === "am" ? (
                      <Sun size={24} className="text-orange-600" />
                    ) : (
                      <Moon size={24} className="text-indigo-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg text-[#2a2420] font-light">
                        {routine.type === "am"
                          ? "Morning Routine"
                          : "Evening Routine"}
                      </h3>
                      {routine.completed ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-light">
                          Completed
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-light">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#5a5450] font-light">
                      <span>{routine.displayDate}</span>
                      <span>•</span>
                      <span>{routine.time}</span>
                      <span>•</span>
                      <span>{routine.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Skin Feeling */}
                <div className="flex items-center gap-2">
                  <Droplet size={16} className="text-[#8b7355]" />
                  <span className="text-sm text-[#5a5450] font-light">
                    Felt: {routine.skinFeeling}
                  </span>
                </div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {routine.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                      step.completed ? "bg-[#f8f6f3]" : "bg-red-50/50"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle
                        size={16}
                        className="text-green-600 shrink-0"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-red-300 shrink-0"></div>
                    )}
                    <span
                      className={`text-sm font-light ${
                        step.completed
                          ? "text-[#2a2420]"
                          : "text-[#5a5450] line-through"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Completion Progress */}
              <div className="mt-4 pt-4 border-t border-[#e8e6e3]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#5a5450] font-light">
                    {routine.steps.filter((s) => s.completed).length} of{" "}
                    {routine.steps.length} steps completed
                  </span>
                  <span className="text-xs text-[#8b7355] font-light">
                    {Math.round(
                      (routine.steps.filter((s) => s.completed).length /
                        routine.steps.length) *
                        100,
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-[#e8e6e3] rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-[#8b7355] to-[#6d5a43] h-2 rounded-full transition-all"
                    style={{
                      width: `${(routine.steps.filter((s) => s.completed).length / routine.steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 border border-[#e8e6e3]/50 shadow-md text-center">
            <Clock size={48} className="text-[#8b7355] mx-auto mb-4" />
            <h3 className="text-xl text-[#2a2420] mb-2 font-light">
              No routines found
            </h3>
            <p className="text-[#5a5450] font-light">
              Try adjusting your filters to see more history
            </p>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}
