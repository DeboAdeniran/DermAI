import React, { useState } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Search,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Video,
  Clock,
  ChevronUp,
  MessageSquare,
  Eye,
  Book,
  Film,
  HelpCircle,
  TrendingUp,
  X,
  Send,
  Bot,
  Sparkles,
  Brain,
  GraduationCap,
  Target,
} from "lucide-react";

export function LearnPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const mockUser = { name: "Ada" };

  const categories = [
    {
      id: "science",
      title: "Skin Science",
      icon: <FlaskConical size={32} />,
      description: "Learn about skin physiology and how it works",
      articles: 24,
    },
    {
      id: "ingredients",
      title: "Ingredient Dictionary",
      icon: <BookOpen size={32} />,
      description: "A-Z guide to skincare ingredients",
      articles: 156,
    },
    {
      id: "myths",
      title: "Myth Busters",
      icon: <Lightbulb size={32} />,
      description: "Separating fact from fiction",
      articles: 18,
    },
    {
      id: "tutorials",
      title: "Video Tutorials",
      icon: <Video size={32} />,
      description: "Watch and learn proper techniques",
      articles: 32,
    },
  ];

  const featuredContent = [
    {
      id: 1,
      title: "Understanding Hyperpigmentation in African Skin",
      category: "Skin Science",
      image:
        "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 2,
      title: "The Ultimate Guide to Niacinamide",
      category: "Ingredients",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
      readTime: "6 min read",
      featured: true,
    },
    {
      id: 3,
      title: "Sunscreen Myths Debunked for Dark Skin",
      category: "Myth Busters",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      readTime: "5 min read",
      featured: true,
    },
  ];

  const trendingTopics = [
    { id: 1, title: "Double Cleansing for Nigerian Climate", views: 1234 },
    { id: 2, title: "Best Affordable Retinol Alternatives", views: 987 },
    { id: 3, title: "Treating Acne Scars on Dark Skin", views: 856 },
    { id: 4, title: "Building Your First Routine", views: 745 },
    { id: 5, title: "Natural vs Synthetic Ingredients", views: 621 },
  ];

  const faqQuestions = [
    {
      id: 1,
      question: "How long should I wait between skincare steps?",
      answer:
        "Generally 30-60 seconds is enough, but for active ingredients like vitamin C or retinol, wait 2-3 minutes before applying the next product.",
      votes: 156,
    },
    {
      id: 2,
      question: "Can I use niacinamide with vitamin C?",
      answer:
        "Yes! The old myth about niacinamide and vitamin C not mixing has been debunked. They work well together.",
      votes: 134,
    },
    {
      id: 3,
      question: "How often should I exfoliate?",
      answer:
        "For most skin types, 2-3 times per week is ideal. Start slow if you're new to chemical exfoliants.",
      votes: 98,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="dashboard"
        userName={mockUser.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2a2420] mb-2 font-light">
                Learning Hub
              </h1>
              <p className="text-sm sm:text-base text-[#5a5450] font-light">
                Everything you need to know about skincare
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for topics, ingredients, or questions..."
              className="w-full pl-12 pr-4 py-3 bg-[#f8f6f3] rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8b7355]"
              size={20}
            />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group border-2 ${
                selectedCategory === category.id
                  ? "border-[#8b7355] bg-gradient-to-br from-[#f8f6f3] to-white"
                  : "border-transparent"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center mb-3 text-[#8b7355]">
                {category.icon}
              </div>
              <h3 className="text-lg text-[#2a2420] mb-2 font-light group-hover:text-[#8b7355] transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-[#5a5450] mb-3 font-light">
                {category.description}
              </p>
              <span className="text-xs text-[#8b7355] font-light flex items-center gap-1">
                <Book size={12} />
                {category.articles} articles
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Content Carousel */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-xl text-[#2a2420] font-light">
                  Featured Content
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {featuredContent.map((content) => (
                  <div
                    key={content.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group border border-[#e8e6e3]/30"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-48 sm:h-auto bg-[#f8f6f3] overflow-hidden">
                        <img
                          src={content.image}
                          alt={content.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <span className="text-xs px-3 py-1 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full font-light">
                          {content.category}
                        </span>
                        <h3 className="text-lg sm:text-xl text-[#2a2420] mt-3 mb-2 font-light group-hover:text-[#8b7355] transition-colors">
                          {content.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#5a5450] font-light">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {content.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Q&A */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <HelpCircle size={20} className="text-[#8b7355]" />
                </div>
                <h2 className="text-xl text-[#2a2420] font-light">
                  Most Asked Questions
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3]/30">
                {faqQuestions.map((faq, index) => (
                  <div
                    key={faq.id}
                    className={`p-6 ${index !== faqQuestions.length - 1 ? "border-b border-[#e8e6e3]" : ""}`}
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1">
                        <button className="w-8 h-8 rounded-lg bg-[#f8f6f3] hover:bg-gradient-to-r from-[#8b7355] to-[#6d5a43] hover:text-white transition-all flex items-center justify-center">
                          <ChevronUp size={16} />
                        </button>
                        <span className="text-sm text-[#8b7355] font-light">
                          {faq.votes}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg text-[#2a2420] mb-2 font-light">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-[#5a5450] font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => alert("Submit question feature coming soon!")}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 font-light"
              >
                <MessageSquare size={18} />
                Submit Your Question
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-[#8b7355]" />
                </div>
                <h3 className="text-lg text-[#2a2420] font-light">
                  Trending Topics
                </h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    className="w-full text-left p-3 rounded-xl hover:bg-gradient-to-r from-[#f8f6f3] to-white transition-all group border border-[#e8e6e3] hover:border-[#8b7355]/30"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg text-[#8b7355] font-light">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-[#2a2420] font-light group-hover:text-[#8b7355] transition-colors mb-1">
                          {topic.title}
                        </p>
                        <span className="text-xs text-[#5a5450] font-light flex items-center gap-1">
                          <Eye size={12} />
                          {topic.views} views
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a43] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-light">Your Learning Progress</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-light flex items-center gap-2">
                    <Book size={16} />
                    Articles Read
                  </span>
                  <span className="text-xl font-light">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-light flex items-center gap-2">
                    <Film size={16} />
                    Videos Watched
                  </span>
                  <span className="text-xl font-light">5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span className="text-sm font-light flex items-center gap-2">
                    <MessageSquare size={16} />
                    Questions Asked
                  </span>
                  <span className="text-xl font-light">3</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <h3 className="text-lg font-light">Need Quick Help?</h3>
              </div>
              <p className="text-sm mb-4 font-light opacity-90">
                Ask our AI assistant about your skincare concerns
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="w-full px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center justify-center gap-2 font-light"
              >
                <Brain size={16} />
                Chat with DermAI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-[#e8e6e3]">
          <div className="bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="text-lg font-light">Ask DermAI</h3>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto bg-gradient-to-b from-[#f8f6f3] to-white">
            <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-[#e8e6e3]">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#8b7355] to-[#6d5a43] flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#2a2420] font-light">
                    <span className="font-normal">Hi {mockUser.name}!</span> I'm
                    your AI skincare assistant. Ask me anything about
                    ingredients, routines, or skin concerns! 🧠
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#e8e6e3] bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your skincare question..."
                className="flex-1 px-4 py-3 bg-[#f8f6f3] rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] text-sm font-light"
                onKeyPress={(e) => e.key === "Enter" && setChatMessage("")}
              />
              <button
                onClick={() => setChatMessage("")}
                className="px-4 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl hover:shadow-lg transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#8b7355] to-[#6d5a43] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-40 group"
      >
        {chatOpen ? (
          <X size={24} />
        ) : (
          <>
            <Bot size={24} />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
              AI
            </span>
          </>
        )}
      </button>
    </div>
  );
}
