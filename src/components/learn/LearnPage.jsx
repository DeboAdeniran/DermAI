/* eslint-disable no-empty */
// FIX: removed inline BASE_URL + raw fetch() calls — replaced with api.js service functions
// (learn.getArticles, learn.like, chat.send)
// This enables: token refresh on 401, consistent auth headers, centralized error handling
import React, { useState, useRef, useEffect, useCallback } from "react";
import { getUser, learn, chat } from "../../services/api";
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
  Loader,
  Heart,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ─── Article Reader Modal ─────────────────────────────────────────────────────
function ArticleModal({ article, loading, onClose, onLike }) {
  const renderContent = (md) => {
    return md.split("\n").map((line, i) => {
      if (line.startsWith("## "))
        return (
          <h3 key={i} className="text-lg text-[#2a2420] font-light mt-5 mb-2">
            {line.replace("## ", "")}
          </h3>
        );
      if (line.startsWith("# "))
        return (
          <h2 key={i} className="text-xl text-[#2a2420] font-light mt-6 mb-2">
            {line.replace("# ", "")}
          </h2>
        );
      if (line.startsWith("- ") || line.startsWith("* "))
        return (
          <li
            key={i}
            className="text-sm text-[#5a5450] font-light ml-4 mb-1 list-disc"
          >
            {line.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
          </li>
        );
      if (line.trim() === "") return <br key={i} />;
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <p
          key={i}
          className="text-sm text-[#5a5450] font-light leading-relaxed mb-2"
          dangerouslySetInnerHTML={{ __html: bold }}
        />
      );
    });
  };
  if (!article) return null;
  // const renderContent = (md) => {
  //   return md.split("\n").map((line, i) => {
  //     if (line.startsWith("## "))
  //       return (
  //         <h3 key={i} className="text-lg text-[#2a2420] font-light mt-5 mb-2">
  //           {line.replace("## ", "")}
  //         </h3>
  //       );
  //     if (line.startsWith("# "))
  //       return (
  //         <h2 key={i} className="text-xl text-[#2a2420] font-light mt-6 mb-2">
  //           {line.replace("# ", "")}
  //         </h2>
  //       );
  //     if (line.startsWith("- ") || line.startsWith("* "))
  //       return (
  //         <li
  //           key={i}
  //           className="text-sm text-[#5a5450] font-light ml-4 mb-1 list-disc"
  //         >
  //           {line.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
  //         </li>
  //       );
  //     if (line.trim() === "") return <br key={i} />;
  //     const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  //     return (
  //       <p
  //         key={i}
  //         className="text-sm text-[#5a5450] font-light leading-relaxed mb-2"
  //         dangerouslySetInnerHTML={{ __html: bold }}
  //       />
  //     );
  //   });
  // };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {article.coverImage && (
          <div className="h-52 overflow-hidden rounded-t-3xl">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <span className="text-xs px-3 py-1 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full font-light">
                {article.category}
              </span>
              <h2 className="text-xl text-[#2a2420] font-light mt-3 leading-snug">
                {article.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-[#8b7355]/60 font-light">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {article.readTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={11} />
                  {article.views || 0} views
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-[#f8f6f3] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#e8e6e3] transition-all"
            >
              <X size={16} className="text-[#2a2420]" />
            </button>
          </div>

          {/* Content area — loader or actual content */}
          {loading ? (
            <div className="space-y-3 py-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 bg-[#e8e6e3] rounded-full animate-pulse ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
                />
              ))}
            </div>
          ) : (
            <div className="prose max-w-none">
              {renderContent(article.content || article.excerpt || "")}
            </div>
          )}

          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#e8e6e3]">
            <button
              onClick={() => onLike(article.slug)}
              className="flex items-center gap-2 px-4 py-2 bg-[#f8f6f3] hover:bg-rose-50 rounded-xl text-sm font-light text-[#5a5450] hover:text-rose-500 transition-all"
            >
              <Heart size={15} /> {article.likes || 0} Likes
            </button>
            <div className="flex flex-wrap gap-1.5 ml-auto">
              {article.tags?.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 bg-[#f8f6f3] text-[#8b7355] rounded-full font-light border border-[#e8e6e3]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={() => onClick(article)}
      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group border border-[#e8e6e3]/30"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-40 h-36 sm:h-auto bg-[#f8f6f3] overflow-hidden flex-shrink-0">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen size={24} className="text-[#8b7355]/20" />
            </div>
          )}
        </div>
        <div className="p-4 flex-1">
          <span className="text-[10px] px-2.5 py-0.5 bg-[#8b7355]/10 text-[#8b7355] rounded-full font-light">
            {article.category}
          </span>
          <h3 className="text-sm text-[#2a2420] font-light mt-2 mb-1 leading-snug group-hover:text-[#8b7355] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-[#5a5450] font-light line-clamp-2 mb-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-[#8b7355]/50 font-light">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {article.readTimeMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {article.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={10} />
              {article.likes || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function LearnPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const chatEndRef = useRef(null);
  const searchTimer = useRef(null);

  const user = getUser();

  // ── Fetch articles via api.js ──────────────────────────────────────────────
  // FIX: was raw fetch() with manual token header and no 401 retry
  const fetchArticles = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const data = await learn.getArticles({
          page,
          limit: 8,
          ...(searchQuery ? { search: searchQuery } : {}),
          ...(selectedCategory ? { category: selectedCategory } : {}),
        });
        setArticles(data.articles || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      } catch (e) {
        setError("Could not load articles. Please try again.");
      }
      setLoading(false);
    },
    [searchQuery, selectedCategory],
  );

  // Fetch featured articles (once)
  useEffect(() => {
    learn
      .getArticles({ featured: true, limit: 3 })
      .then((data) => setFeatured(data.articles || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  // Debounce search
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearchQuery(searchInput), 500);
    return () => clearTimeout(searchTimer.current);
  }, [searchInput]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // FIX: was raw fetch with manual token — now uses learn.like from api.js
  const handleLike = async (slug) => {
    try {
      await learn.like(slug);
      setArticles((prev) =>
        prev.map((a) =>
          a.slug === slug ? { ...a, likes: (a.likes || 0) + 1 } : a,
        ),
      );
      if (openArticle?.slug === slug)
        setOpenArticle((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
    } catch {}
  };

  const handleOpenArticle = async (article) => {
    setOpenArticle(article);
    setArticleLoading(true);
    try {
      const data = await learn.getBySlug(article.slug);
      setOpenArticle(data.article);
    } catch {
    } finally {
      setArticleLoading(false);
    }
  };

  // FIX: was raw fetch with manual token — now uses chat.send from api.js
  const handleSendChat = async () => {
    const msg = chatMessage.trim();
    if (!msg || chatLoading) return;
    const userMsg = { role: "user", content: msg };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatMessage("");
    setChatLoading(true);
    try {
      const data = await chat.send(updatedMessages);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.message || "Connection error. Please try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const CATEGORIES = [
    "Skin Basics",
    "Ingredients",
    "Routines",
    "Conditions",
    "Nigerian Skin",
    "Product Reviews",
    "Tips & Tricks",
    "Lifestyle",
  ];

  const faqQuestions = [
    {
      id: 1,
      question: "How long should I wait between skincare steps?",
      answer:
        "Generally 30-60 seconds is enough, but for active ingredients like vitamin C or retinol, wait 2-3 minutes.",
      votes: 156,
    },
    {
      id: 2,
      question: "Can I use niacinamide with vitamin C?",
      answer:
        "Yes! The old myth about them not mixing has been debunked. They work well together.",
      votes: 134,
    },
    {
      id: 3,
      question: "How often should I exfoliate?",
      answer:
        "2-3 times per week for most skin types. Start slow with chemical exfoliants.",
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
        currentPage="learn"
        userName={user?.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />
      {openArticle && (
        <ArticleModal
          article={openArticle}
          loading={articleLoading}
          onClose={() => setOpenArticle(null)}
          onLike={handleLike}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
            <GraduationCap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
              Learning Hub
            </h1>
            <p className="text-sm text-[#5a5450] font-light">
              {pagination.total > 0
                ? `${pagination.total} articles`
                : "Everything about skincare"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-[#e8e6e3]/40">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles, ingredients, topics…"
              className="w-full pl-12 pr-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 font-light text-sm"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]"
              size={18}
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b7355]"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-1.5 rounded-full text-xs font-light border transition-all ${!selectedCategory ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(cat === selectedCategory ? "" : cat)
              }
              className={`px-4 py-1.5 rounded-full text-xs font-light border transition-all ${selectedCategory === cat ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured */}
            {!searchQuery && !selectedCategory && featured.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg text-[#2a2420] font-light">
                    Featured
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {featured.map((a) => (
                    <ArticleCard
                      key={a._id || a.slug}
                      article={a}
                      onClick={handleOpenArticle}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All articles */}
            <div>
              {(searchQuery || selectedCategory) && (
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-[#8b7355]" />
                  <h2 className="text-lg text-[#2a2420] font-light">
                    {searchQuery
                      ? `Results for "${searchQuery}"`
                      : selectedCategory}
                  </h2>
                </div>
              )}
              {!searchQuery && !selectedCategory && (
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-[#8b7355]" />
                  <h2 className="text-lg text-[#2a2420] font-light">
                    All Articles
                  </h2>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-600 text-sm font-light mb-4">
                  <AlertCircle size={16} />
                  {error}
                  <button
                    onClick={() => fetchArticles(1)}
                    className="ml-auto underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              {loading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-[#e8e6e3]/30 overflow-hidden animate-pulse flex h-36"
                    >
                      <div className="w-40 bg-[#e8e6e3] flex-shrink-0" />
                      <div className="p-4 flex-1 space-y-2">
                        <div className="h-3 bg-[#e8e6e3] rounded-full w-20" />
                        <div className="h-4 bg-[#e8e6e3] rounded-full w-3/4" />
                        <div className="h-3 bg-[#e8e6e3] rounded-full w-full" />
                        <div className="h-3 bg-[#e8e6e3] rounded-full w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : articles.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#e8e6e3]/30">
                  <BookOpen
                    size={36}
                    className="text-[#8b7355]/20 mx-auto mb-3"
                  />
                  <p className="text-[#5a5450] font-light mb-1">
                    No articles found
                  </p>
                  <p className="text-xs text-[#8b7355]/60 font-light">
                    Run the article seeder to populate the database
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {articles.map((a) => (
                    <ArticleCard
                      key={a._id || a.slug}
                      article={a}
                      onClick={handleOpenArticle}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => fetchArticles(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-9 h-9 rounded-xl border border-[#e8e6e3] flex items-center justify-center text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-all disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(Math.min(pagination.pages, 5))].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => fetchArticles(i + 1)}
                      className={`w-9 h-9 rounded-xl text-sm font-light transition-all ${pagination.page === i + 1 ? "bg-[#8b7355] text-white" : "border border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => fetchArticles(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="w-9 h-9 rounded-xl border border-[#e8e6e3] flex items-center justify-center text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-all disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={18} className="text-[#8b7355]" />
                <h2 className="text-lg text-[#2a2420] font-light">
                  Most Asked Questions
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e6e3]/30 overflow-hidden">
                {faqQuestions.map((faq, i) => (
                  <div
                    key={faq.id}
                    className={`p-5 ${i !== faqQuestions.length - 1 ? "border-b border-[#e8e6e3]" : ""}`}
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <button className="w-7 h-7 rounded-lg bg-[#f8f6f3] hover:bg-[#8b7355] hover:text-white transition-all flex items-center justify-center">
                          <ChevronUp size={14} />
                        </button>
                        <span className="text-xs text-[#8b7355] font-light">
                          {faq.votes}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm text-[#2a2420] font-light mb-1">
                          {faq.question}
                        </h3>
                        <p className="text-xs text-[#5a5450] font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-[#e8e6e3]/30">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-[#8b7355]" />
                <h3 className="text-base text-[#2a2420] font-light">
                  Trending Topics
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  "Double Cleansing for Nigerian Climate",
                  "Best Affordable Retinol Alternatives",
                  "Treating Acne Scars on Dark Skin",
                  "Building Your First Routine",
                  "Natural vs Synthetic Ingredients",
                ].map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchInput(topic);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#f8f6f3] transition-all group border border-[#e8e6e3] hover:border-[#8b7355]/30 flex items-center gap-2"
                  >
                    <span className="text-sm text-[#8b7355] font-light w-5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-[#2a2420] font-light group-hover:text-[#8b7355] transition-colors flex-1">
                      {topic}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#8b7355] to-[#6d5a43] rounded-2xl p-5 text-white shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <h3 className="text-base font-light">Need Quick Help?</h3>
              </div>
              <p className="text-xs mb-4 font-light opacity-90">
                Ask our AI about ingredients, routines, or skin concerns
              </p>
              <button
                onClick={() => setChatOpen(true)}
                className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center justify-center gap-2 font-light text-sm"
              >
                <Brain size={14} /> Chat with DermAI
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Target size={18} />
                </div>
                <h3 className="text-base font-light">Your Progress</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  ["Articles Read", <Book size={14} />, 12],
                  ["Videos Watched", <Film size={14} />, 5],
                  ["Questions Asked", <MessageSquare size={14} />, 3],
                ].map(([label, icon, count]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-2.5 bg-white/10 rounded-xl"
                  >
                    <span className="text-xs font-light flex items-center gap-2">
                      {icon}
                      {label}
                    </span>
                    <span className="text-lg font-light">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {chatOpen && (
        <div
          className="fixed bottom-24 right-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-[#e8e6e3] flex flex-col"
          style={{ height: "480px" }}
        >
          <div className="bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <h3 className="font-light">Ask DermAI</h3>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafaf9]">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#8b7355] flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm border border-[#e8e6e3] max-w-[85%]">
                <p className="text-xs text-[#2a2420] font-light">
                  Hi{" "}
                  <span className="font-normal">{user?.name || "there"}</span>!
                  Ask me about ingredients, routines, or skin concerns 🧠
                </p>
              </div>
            </div>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-[#8b7355] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`rounded-xl p-3 max-w-[85%] text-xs font-light leading-relaxed ${msg.role === "user" ? "bg-[#8b7355] text-white rounded-tr-none" : "bg-white border border-[#e8e6e3] text-[#2a2420] rounded-tl-none shadow-sm"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#8b7355] flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm border border-[#e8e6e3]">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-2 h-2 bg-[#8b7355] rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-[#e8e6e3] bg-white flex-shrink-0 flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendChat()
              }
              placeholder="Type your question…"
              disabled={chatLoading}
              className="flex-1 px-3 py-2.5 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 text-xs font-light disabled:opacity-50"
            />
            <button
              onClick={handleSendChat}
              disabled={!chatMessage.trim() || chatLoading}
              className="w-10 h-10 bg-[#8b7355] text-white rounded-xl hover:bg-[#6d5a43] transition-all disabled:opacity-40 flex items-center justify-center flex-shrink-0"
            >
              {chatLoading ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#8b7355] to-[#6d5a43] text-white rounded-full shadow-2xl transition-all flex items-center justify-center z-40"
      >
        {chatOpen ? (
          <X size={22} />
        ) : (
          <>
            <Bot size={22} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center animate-pulse">
              AI
            </span>
          </>
        )}
      </button>
    </div>
  );
}
