import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ProfileUpdateModal } from "./ProfileUpdateModal";
import { ContinueRoutineModal } from "./ContinueRoutineModal";
import { EducationalTipModal } from "./EducationalTipModal";
import { AuthNav } from "../ui/AuthNav";
import {
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronRight,
  Check,
  ChevronUp,
  Play,
  Pause,
  Clock,
  Sun,
  Bell,
  TrendingUp,
  Circle,
  TrendingDown,
  AlertCircle,
  Sparkles,
  Droplets,
  Shield,
  Heart,
  ShoppingCart,
  BarChart,
  Calendar,
  Target,
  Zap,
  Star,
  Users,
  Award,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const mockUser = {
  name: "Ada",
  skinType: "Oily, Acne-Prone",
  lastAnalysis: "December 15, 2024",
};

const skinHealthData = [
  { date: "Nov 21", score: 65 },
  { date: "Nov 24", score: 68 },
  { date: "Nov 27", score: 70 },
  { date: "Nov 30", score: 72 },
  { date: "Dec 3", score: 71 },
  { date: "Dec 6", score: 74 },
  { date: "Dec 9", score: 76 },
  { date: "Dec 12", score: 78 },
  { date: "Dec 15", score: 80 },
  { date: "Dec 18", score: 82 },
  { date: "Dec 21", score: 85 },
];

const amRoutine = [
  { name: "Gentle Cleanser", completed: true },
  { name: "Vitamin C Serum", completed: true },
  { name: "Moisturizer", completed: true },
  { name: "Sunscreen SPF 50", completed: false },
];

const pmRoutine = [
  { name: "Double Cleanse", completed: true },
  { name: "Toner", completed: true },
  { name: "Niacinamide Serum", completed: false },
  { name: "Night Cream", completed: false },
];

const recommendedProducts = [
  {
    id: 1,
    name: "CeraVe Hydrating Cleanser",
    brand: "CeraVe",
    price: "₦8,500",
    rating: null,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "The Ordinary Niacinamide",
    brand: "The Ordinary",
    price: "₦4,200",
    rating: "up",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Neutrogena Oil-Free Moisturizer",
    brand: "Neutrogena",
    price: "₦6,800",
    rating: "up",
    image:
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=200&fit=crop",
  },
];

const tipOfTheDay = {
  title: "Hydration is Key!",
  content:
    "Even oily skin needs moisture. Skipping moisturizer can cause your skin to produce more oil to compensate for dehydration.",
  category: "Skincare Basics",
};

const reminders = [
  {
    type: "routine",
    message: "Apply sunscreen in 2 hours",
    time: "2:00 PM",
    icon: <Sun size={16} className="text-[#5a5450]" />,
  },
  {
    type: "restock",
    message: "Vitamin C Serum running low",
    time: "3 days left",
    icon: <Bell size={16} className="text-[#5a5450]" />,
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeRoutine, setActiveRoutine] = useState("AM");
  const [productRatings, setProductRatings] = useState(
    recommendedProducts.reduce((acc, p) => ({ ...acc, [p.id]: p.rating }), {}),
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isContinueRoutineModalOpen, setIsContinueRoutineModalOpen] =
    useState(false);
  const [isEducationalTipModalOpen, setIsEducationalTipModalOpen] =
    useState(false);
  const [expandedSection, setExpandedSection] = useState("routine");

  const currentRoutine = activeRoutine === "AM" ? amRoutine : pmRoutine;
  const completedSteps = currentRoutine.filter((step) => step.completed).length;
  const progressPercentage = (completedSteps / currentRoutine.length) * 100;
  const currentScore = skinHealthData[skinHealthData.length - 1].score;

  const handleRating = (productId, rating) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: prev[productId] === rating ? null : rating,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      {/* Profile Update Modal */}
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Continue Routine Modal */}
      <ContinueRoutineModal
        isOpen={isContinueRoutineModalOpen}
        onClose={() => setIsContinueRoutineModalOpen(false)}
        routineType={activeRoutine}
      />

      {/* Educational Tip Modal */}
      <EducationalTipModal
        isOpen={isEducationalTipModalOpen}
        onClose={() => setIsEducationalTipModalOpen(false)}
        tip={tipOfTheDay}
      />

      {/* Authenticated Navigation */}
      <AuthNav
        currentPage="dashboard"
        userName={mockUser.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 sm:pt-28">
        {/* Main Dashboard Container */}
        <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2.5rem] shadow-2xl p-6 sm:p-8">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-2 font-light">
              Welcome in, {mockUser.name}
            </h1>
          </div>

          {/* Status Pills & Stats */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Status Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveRoutine("AM")}
                className={`px-4 py-2 rounded-full text-sm transition-all font-light ${
                  activeRoutine === "AM"
                    ? "bg-[#2a2420] text-white"
                    : "bg-white/60 text-[#5a5450] hover:bg-white"
                }`}
              >
                AM Routine
              </button>
              <button
                onClick={() => setActiveRoutine("PM")}
                className={`px-4 py-2 rounded-full text-sm transition-all font-light ${
                  activeRoutine === "PM"
                    ? "bg-[#2a2420] text-white"
                    : "bg-white/60 text-[#5a5450] hover:bg-white"
                }`}
              >
                PM Routine
              </button>
              <div className="px-4 py-2 rounded-full bg-white/60 text-[#5a5450] text-sm font-light">
                {mockUser.skinType}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl text-[#2a2420] font-light">
                  {currentScore}
                </span>
                <span className="text-xs text-[#8b7355] font-light">
                  Skin Score
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl text-[#2a2420] font-light">
                  {completedSteps}
                </span>
                <span className="text-xs text-[#8b7355] font-light">
                  Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl text-[#2a2420] font-light">
                  {recommendedProducts.length}
                </span>
                <span className="text-xs text-[#8b7355] font-light">
                  Products
                </span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-3">
              {/* Profile Card */}
              <div className="bg-linear-to-br from-[#2a2420] to-[#3a3430] rounded-3xl p-6 text-white shadow-lg">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
                    alt={mockUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl mb-1 font-light">{mockUser.name}</h3>
                <p className="text-sm text-white/70 font-light mb-3">
                  {mockUser.skinType}
                </p>
                <div className="bg-white/20 rounded-xl px-3 py-2 text-sm font-light">
                  Score: {currentScore}/100
                </div>
              </div>

              {/* Collapsible Sections */}
              <div className="bg-white/80 rounded-2xl overflow-hidden shadow-md">
                {/* Skin Health Section */}
                <button
                  onClick={() => toggleSection("health")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/60 transition-colors"
                >
                  <span className="text-sm text-[#2a2420] font-light">
                    Skin Health
                  </span>
                  {expandedSection === "health" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedSection === "health" && (
                  <div className="px-4 pb-3 text-xs text-[#5a5450] font-light space-y-2">
                    <div className="flex justify-between">
                      <span>Current Score</span>
                      <span className="text-[#8b7355]">{currentScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Change</span>
                      <span className="text-green-600">+5</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white/80 rounded-2xl overflow-hidden shadow-md">
                {/* Products Section */}
                <button
                  onClick={() => toggleSection("products")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/60 transition-colors"
                >
                  <span className="text-sm text-[#2a2420] font-light">
                    Product Details
                  </span>
                  {expandedSection === "products" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedSection === "products" && (
                  <div className="px-4 pb-3 text-xs text-[#5a5450] font-light space-y-2">
                    <div>Recommended: {recommendedProducts.length}</div>
                    <div>In Routine: {amRoutine.length + pmRoutine.length}</div>
                  </div>
                )}
              </div>

              <div className="bg-white/80 rounded-2xl overflow-hidden shadow-md">
                {/* Reminders Section */}
                <button
                  onClick={() => toggleSection("reminders")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/60 transition-colors"
                >
                  <span className="text-sm text-[#2a2420] font-light">
                    Reminders
                  </span>
                  {expandedSection === "reminders" ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedSection === "reminders" && (
                  <div className="px-4 pb-3 text-xs text-[#5a5450] font-light space-y-2">
                    {reminders.map((reminder, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {reminder.icon}
                        <span>{reminder.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 space-y-4">
              {/* Progress Widget */}
              <div className="bg-white/90 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#2a2420] font-light">
                    Progress
                  </h3>
                  <button className="p-2 hover:bg-[#f8f6f3] rounded-lg transition-colors">
                    <ChevronUp size={16} className="text-[#5a5450]" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl text-[#2a2420] font-light">
                      {completedSteps}
                    </span>
                    <span className="text-sm text-[#8b7355] font-light">
                      / {currentRoutine.length} steps
                    </span>
                  </div>
                  <p className="text-xs text-[#5a5450] font-light">
                    Current {activeRoutine} Routine
                  </p>
                </div>

                {/* Progress Bar Chart */}
                <div className="flex items-end justify-between h-32 gap-2 mb-4">
                  {currentRoutine.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div
                        className="w-full bg-[#f8f6f3] rounded-t-lg relative overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                            step.completed ? "bg-[#2a2420]" : "bg-[#e8e6e3]"
                          }`}
                          style={{ height: step.completed ? "80%" : "30%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-[#8b7355] font-light">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#c4a882] rounded-xl px-3 py-2 inline-block">
                  <span className="text-xs text-white font-light">
                    {Math.round(progressPercentage)}% Complete
                  </span>
                </div>
              </div>

              {/* Skin Health Chart */}
              <div className="bg-white/90 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#2a2420] font-light">
                    Skin Health Tracker
                  </h3>
                  <button className="p-2 hover:bg-[#f8f6f3] rounded-lg transition-colors">
                    <ChevronUp size={16} className="text-[#5a5450]" />
                  </button>
                </div>

                {/* Circular Progress */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e8e6e3"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#c4a882"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${(currentScore / 100) * 352} 352`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl text-[#2a2420] font-light">
                        {currentScore}
                      </span>
                      <span className="text-xs text-[#8b7355] font-light">
                        Score
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={skinHealthData.slice(-7)}>
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#8b7355"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="p-2 bg-white border border-[#e8e6e3] rounded-lg hover:bg-[#f8f6f3] transition-colors">
                    <Play size={16} className="text-[#5a5450]" />
                  </button>
                  <button className="p-2 bg-white border border-[#e8e6e3] rounded-lg hover:bg-[#f8f6f3] transition-colors">
                    <Pause size={16} className="text-[#5a5450]" />
                  </button>
                  <button className="p-2 bg-[#2a2420] text-white rounded-lg hover:bg-[#3a3430] transition-colors">
                    <Clock size={16} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="bg-white/90 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#2a2420] font-light">
                    Recommended Products
                  </h3>
                  <button
                    onClick={() => navigate("/products")}
                    className="text-sm text-[#8b7355] hover:text-[#2a2420] transition-colors font-light"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-[#f8f6f3] rounded-2xl hover:bg-white transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#8b7355] font-light">
                          {product.brand}
                        </p>
                        <h4 className="text-sm text-[#2a2420] font-light truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm text-[#2a2420] font-light">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleRating(product.id, "up")}
                          className={`p-2 rounded-lg transition-all ${
                            productRatings[product.id] === "up"
                              ? "bg-green-100 text-green-600"
                              : "bg-white text-[#8b7355] hover:bg-green-50"
                          }`}
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleRating(product.id, "down")}
                          className={`p-2 rounded-lg transition-all ${
                            productRatings[product.id] === "down"
                              ? "bg-red-100 text-red-600"
                              : "bg-white text-[#8b7355] hover:bg-red-50"
                          }`}
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Routine Task List */}
            <div className="lg:col-span-3 space-y-4">
              {/* Routine Progress */}
              <div className="bg-white/90 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-[#2a2420] font-light">Today</h3>
                  <span className="text-3xl font-light text-[#2a2420]">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>

                <div className="flex gap-2 mb-6">
                  <div className="flex-1 h-2 bg-[#c4a882] rounded-full"></div>
                  <div className="flex-1 h-2 bg-[#2a2420] rounded-full"></div>
                  <div className="flex-1 h-2 bg-[#e8e6e3] rounded-full"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-[#5a5450]">AM</span>
                    <span className="text-[#8b7355]">
                      {amRoutine.filter((s) => s.completed).length}/
                      {amRoutine.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-light">
                    <span className="text-[#5a5450]">PM</span>
                    <span className="text-[#8b7355]">
                      {pmRoutine.filter((s) => s.completed).length}/
                      {pmRoutine.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Routine Task Card */}
              <div className="bg-[#2a2420] rounded-3xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light">
                    {activeRoutine} Routine
                  </h3>
                  <span className="text-2xl font-light">
                    {completedSteps}/{currentRoutine.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {currentRoutine.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          step.completed ? "bg-[#c4a882]" : "bg-white/20"
                        }`}
                      >
                        {step.completed ? (
                          <Check size={16} />
                        ) : (
                          <span className="text-xs">{idx + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-light truncate">
                          {step.name}
                        </p>
                        <p className="text-xs text-white/60 font-light">
                          {step.completed ? "Completed" : "Pending"}
                        </p>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${step.completed ? "bg-[#c4a882]" : "bg-white/20"}`}
                      ></div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsContinueRoutineModalOpen(true)}
                  className="w-full mt-4 px-4 py-3 bg-white text-[#2a2420] rounded-xl hover:bg-white/90 transition-all font-light"
                >
                  Continue Routine →
                </button>
              </div>

              {/* Tip Card */}
              <div className="bg-linear-to-br from-[#8b7355] to-[#6d5a43] rounded-3xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={20} />
                  <span className="text-xs font-light opacity-90">
                    {tipOfTheDay.category}
                  </span>
                </div>
                <h4 className="text-sm mb-2 font-light">{tipOfTheDay.title}</h4>
                <p className="text-xs opacity-90 font-light mb-3">
                  {tipOfTheDay.content}
                </p>
                <button
                  onClick={() => setIsEducationalTipModalOpen(true)}
                  className="text-xs underline hover:no-underline transition-all font-light"
                >
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
