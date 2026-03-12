/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback, useRef } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Search,
  Star,
  Heart,
  X,
  AlertCircle,
  Package,
  ExternalLink,
  Loader,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ShoppingBag,
  Droplets,
  Leaf,
  CheckCircle,
  Info,
  Plus,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import {
  products as productsApi,
  routines as routinesApi,
  getUser,
} from "../../services/api";

const CATEGORIES = [
  "Cleanser",
  "Toner",
  "Serum",
  "Treatment",
  "Moisturizer",
  "Sunscreen",
  "Eye Cream",
  "Mask",
  "Exfoliant",
  "Oil",
  "Mist",
  "Other",
];
const SKIN_TYPES = [
  "Dry",
  "Oily",
  "Combination",
  "Sensitive",
  "Normal",
  "All Types",
];
const SORT_OPTIONS = [
  { value: "match", label: "Best Match" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const STEP_TYPES = [
  "Cleanser",
  "Toner",
  "Serum",
  "Treatment",
  "Moisturizer",
  "Sunscreen",
  "Eye Cream",
  "Mask",
  "Exfoliant",
  "Oil",
  "Other",
];

const PLATFORM_COLORS = {
  Jumia: "bg-orange-500",
  Konga: "bg-red-600",
  "Nectar Beauty Hub": "bg-pink-500",
  "TOS Nigeria": "bg-slate-700",
  "Skin Pop Essentiel": "bg-purple-500",
  "Allure Beauty": "bg-yellow-600",
  HealthPlus: "bg-blue-600",
  SPAR: "bg-green-700",
  "Rhema Beauty Shop": "bg-rose-500",
  "Skin Gourmet": "bg-teal-600",
  Beautyberry: "bg-fuchsia-500",
  Minimed: "bg-cyan-600",
};

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [addingToRoutine, setAddingToRoutine] = useState(false);
  const [routineSuccess, setRoutineSuccess] = useState("");
  const [routineError, setRoutineError] = useState("");
  const [period, setPeriod] = useState("am");
  const [stepType, setStepType] = useState("Moisturizer");
  const [showRoutineForm, setShowRoutineForm] = useState(false);

  if (!product) return null;

  const handleSave = async () => {
    setSaving(true);
    await onSave(product._id);
    setSaving(false);
  };

  const handleAddToRoutine = async () => {
    setAddingToRoutine(true);
    setRoutineError("");
    setRoutineSuccess("");
    try {
      await routinesApi.addProduct({
        productId: product._id,
        period,
        stepType,
      });
      setRoutineSuccess(
        `Added to your ${period.toUpperCase()} routine as a ${stepType} step! ✓`,
      );
      setShowRoutineForm(false);
    } catch (err) {
      setRoutineError("Could not add to routine. Please try again.");
    } finally {
      setAddingToRoutine(false);
    }
  };

  // Build deduplicated buy links: prefer purchaseLinks array; fall back to legacy jumiaUrl
  const buyLinks = (() => {
    const links = (product.purchaseLinks || []).map((l) => ({
      platform: l.platform || l.store || "Store",
      url: l.url,
      price: l.price,
      sellerName: l.sellerName,
    }));
    // Add legacy jumiaUrl only if not already in purchaseLinks
    if (product.jumiaUrl && !links.some((l) => l.url === product.jumiaUrl)) {
      links.unshift({
        platform: "Jumia",
        url: product.jumiaUrl,
        price: product.price,
      });
    }
    return links;
  })();

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-56 bg-[#f8f6f3] rounded-t-3xl overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={48} className="text-[#8b7355]/20" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
          >
            <X size={18} className="text-[#2a2420]" />
          </button>
          {product.isLocalBrand && (
            <span className="absolute top-4 left-4 text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-light">
              🇳🇬 Local Brand
            </span>
          )}
          {!product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1.5 font-light">
              Out of Stock
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Name + Save */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="text-sm text-[#8b7355] font-light mb-0.5">
                {product.brand}
              </p>
              <h2 className="text-xl text-[#2a2420] font-light leading-snug">
                {product.name}
              </h2>
            </div>
            <button
              onClick={handleSave}
              className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all ${product.isSaved ? "bg-rose-500 border-rose-500 text-white" : "border-[#e8e6e3] text-[#8b7355] hover:border-rose-300"}`}
            >
              {saving ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Heart
                  size={16}
                  fill={product.isSaved ? "currentColor" : "none"}
                />
              )}
            </button>
          </div>

          {/* Rating + Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(product.rating || 0)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-[#5a5450] font-light">
                {product.rating?.toFixed(1) || "—"}
              </span>
              {product.reviewCount > 0 && (
                <span className="text-xs text-[#8b7355]/50 font-light">
                  ({product.reviewCount} reviews)
                </span>
              )}
            </div>
            <span className="text-xl text-[#2a2420] font-light">
              ₦{Number(product.price).toLocaleString("en-NG")}
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.category && (
              <span className="text-xs px-3 py-1 bg-[#f8f6f3] text-[#5a5450] rounded-full border border-[#e8e6e3] font-light">
                {product.category}
              </span>
            )}
            {product.isNaturalOrganic && (
              <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-light flex items-center gap-1">
                <Leaf size={10} />
                Natural
              </span>
            )}
            {product.isBudgetFriendly && (
              <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-light">
                Budget Friendly
              </span>
            )}
            {product.inStock && (
              <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-light flex items-center gap-1">
                <CheckCircle size={10} />
                In Stock
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-[#5a5450] font-light leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          {/* Skin Types */}
          {product.skinTypes?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-[#8b7355] font-light mb-2 flex items-center gap-1">
                <Droplets size={12} />
                Suitable for
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.skinTypes.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-light"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Ingredients */}
          {product.ingredients?.length > 0 && (
            <div className="mb-5">
              <p className="text-xs text-[#8b7355] font-light mb-2 flex items-center gap-1">
                <Info size={12} />
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs px-2.5 py-1 bg-[#f8f6f3] text-[#5a5450] rounded-full border border-[#e8e6e3] font-light"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Add to Routine ──────────────────────────────────────────────── */}
          <div className="mb-5 bg-[#f8f6f3] rounded-2xl p-4 border border-[#e8e6e3]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#2a2420] font-light flex items-center gap-2">
                <Plus size={16} className="text-[#8b7355]" /> Add to My Routine
              </p>
              <button
                onClick={() => {
                  setShowRoutineForm((f) => !f);
                  setRoutineSuccess("");
                  setRoutineError("");
                }}
                className="text-xs text-[#8b7355] font-light flex items-center gap-1 hover:underline"
              >
                {showRoutineForm ? "Cancel" : "Set up"}{" "}
                <ChevronDown
                  size={12}
                  className={`transition-transform ${showRoutineForm ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {routineSuccess && (
              <div className="flex items-center gap-2 text-emerald-700 text-sm font-light bg-emerald-50 rounded-xl px-3 py-2">
                <CheckCircle size={14} />
                {routineSuccess}
              </div>
            )}
            {routineError && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-light bg-red-50 rounded-xl px-3 py-2">
                <AlertCircle size={14} />
                {routineError}
              </div>
            )}

            {showRoutineForm && (
              <div className="mt-3 space-y-3">
                {/* AM / PM toggle */}
                <div>
                  <p className="text-xs text-[#5a5450] font-light mb-1.5">
                    Which routine?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPeriod("am")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-light border transition-all ${period === "am" ? "bg-amber-400 text-white border-amber-400" : "bg-white border-[#e8e6e3] text-[#5a5450] hover:border-amber-300"}`}
                    >
                      <Sun size={15} /> Morning (AM)
                    </button>
                    <button
                      onClick={() => setPeriod("pm")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-light border transition-all ${period === "pm" ? "bg-indigo-500 text-white border-indigo-500" : "bg-white border-[#e8e6e3] text-[#5a5450] hover:border-indigo-300"}`}
                    >
                      <Moon size={15} /> Night (PM)
                    </button>
                  </div>
                </div>

                {/* Step type */}
                <div>
                  <p className="text-xs text-[#5a5450] font-light mb-1.5">
                    Step type
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {STEP_TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setStepType(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-light border transition-all ${stepType === t ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToRoutine}
                  disabled={addingToRoutine}
                  className="w-full py-2.5 bg-[#8b7355] text-white rounded-xl text-sm font-light flex items-center justify-center gap-2 hover:bg-[#6d5a43] transition-all disabled:opacity-50"
                >
                  {addingToRoutine ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <Plus size={14} />
                  )}
                  Add to {period.toUpperCase()} Routine
                </button>
              </div>
            )}
          </div>

          {/* Buy Links */}
          <div>
            <p className="text-sm text-[#2a2420] font-light mb-3 flex items-center gap-2">
              <ShoppingBag size={16} className="text-[#8b7355]" />
              Where to Buy
            </p>
            {buyLinks.length > 0 ? (
              <div className="space-y-2">
                {buyLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-[#e8e6e3] hover:border-[#8b7355]/40 hover:bg-[#fafaf9] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg ${PLATFORM_COLORS[link.platform] || "bg-[#8b7355]"} flex items-center justify-center`}
                      >
                        <ShoppingBag size={14} className="text-white" />
                      </span>
                      <div>
                        <p className="text-sm text-[#2a2420] font-light">
                          {link.platform}
                        </p>
                        {link.sellerName && (
                          <p className="text-xs text-[#8b7355]/60 font-light">
                            {link.sellerName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {link.price && (
                        <span className="text-sm text-[#5a5450] font-light">
                          ₦{Number(link.price).toLocaleString("en-NG")}
                        </span>
                      )}
                      <ExternalLink
                        size={14}
                        className="text-[#8b7355] group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#8b7355]/60 font-light py-3 text-center bg-[#f8f6f3] rounded-xl">
                No purchase links available yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onSave, onClick }) {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation();
    setSaving(true);
    await onSave(product._id);
    setSaving(false);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#e8e6e3]/60 hover:border-[#8b7355]/40 hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
    >
      <div className="relative h-48 bg-[#f8f6f3] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={32} className="text-[#8b7355]/20" />
          </div>
        )}
        <button
          onClick={handleSave}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all ${product.isSaved ? "bg-rose-500 text-white" : "bg-white text-[#8b7355] hover:bg-rose-50"}`}
        >
          {saving ? (
            <Loader size={14} className="animate-spin" />
          ) : (
            <Heart size={14} fill={product.isSaved ? "currentColor" : "none"} />
          )}
        </button>
        {!product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1 font-light">
            Out of Stock
          </div>
        )}
        {product.isLocalBrand && (
          <span className="absolute top-2.5 left-2.5 text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-light">
            🇳🇬 Local
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[#8b7355] font-light mb-0.5">
          {product.brand}
        </p>
        <h3 className="text-sm text-[#2a2420] font-light leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-2">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-[#5a5450] font-light">
            {product.rating?.toFixed(1) || "—"}
          </span>
          {product.reviewCount > 0 && (
            <span className="text-xs text-[#8b7355]/50 font-light">
              ({product.reviewCount})
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base text-[#2a2420] font-light">
            ₦{Number(product.price).toLocaleString("en-NG")}
          </span>
          <div className="flex gap-1 flex-wrap justify-end">
            {product.isNaturalOrganic && (
              <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-light">
                Natural
              </span>
            )}
            {product.isBudgetFriendly && (
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-light">
                Budget
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 w-full py-2 bg-[#f8f6f3] border border-[#e8e6e3] rounded-xl text-xs font-light flex items-center justify-center gap-1.5 text-[#8b7355] group-hover:bg-[#8b7355] group-hover:text-white group-hover:border-[#8b7355] transition-all">
          <ShoppingBag size={12} /> View Details & Buy
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e6e3]/60 overflow-hidden animate-pulse">
      <div className="h-48 bg-[#e8e6e3]" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-[#e8e6e3] rounded-full w-20" />
        <div className="h-4 bg-[#e8e6e3] rounded-full w-3/4" />
        <div className="h-3 bg-[#e8e6e3] rounded-full w-1/2" />
        <div className="h-8 bg-[#e8e6e3] rounded-xl mt-3" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const user = getUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [showFilters, setShowFilters] = useState(false);
  const searchTimer = useRef(null);

  const fetchProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = { page, limit: 12, sortBy };
        if (searchQuery) params.search = searchQuery;
        if (selectedCategory) params.category = selectedCategory;
        if (selectedSkinType) params.skinType = selectedSkinType;
        const data = await productsApi.getAll(params);
        setProductList(data.products || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      } catch {
        setError("Could not load products. Please try again.");
      }
      setLoading(false);
    },
    [searchQuery, selectedCategory, selectedSkinType, sortBy],
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearchQuery(searchInput), 500);
    return () => clearTimeout(searchTimer.current);
  }, [searchInput]);

  const handleSave = async (productId) => {
    try {
      const res = await productsApi.save(productId);
      setProductList((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, isSaved: res.saved } : p,
        ),
      );

      if (selectedProduct?._id === productId) {
        setSelectedProduct((prev) => ({ ...prev, isSaved: res.saved }));
      }
    } catch {}
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSkinType("");
    setSortBy("match");
  };
  const hasFilters =
    searchQuery || selectedCategory || selectedSkinType || sortBy !== "match";

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="products"
        userName={user?.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 sm:pt-28">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
              Products
            </h1>
            <p className="text-sm text-[#5a5450] font-light mt-1">
              {pagination.total > 0
                ? `${pagination.total} products`
                : "Loading…"}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-light transition-all ${showFilters ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white text-[#5a5450] border-[#e8e6e3] hover:border-[#8b7355]"}`}
          >
            <SlidersHorizontal size={15} /> Filters{" "}
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]"
            size={17}
          />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products, brands, ingredients…"
            className="w-full pl-11 pr-10 py-3.5 bg-white rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 text-sm font-light shadow-sm"
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

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-[#e8e6e3] p-5 mb-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#5a5450] font-light mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5a5450] font-light mb-2">
                  Skin Type
                </label>
                <select
                  value={selectedSkinType}
                  onChange={(e) => setSelectedSkinType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30"
                >
                  <option value="">All Skin Types</option>
                  {SKIN_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5a5450] font-light mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#8b7355] font-light hover:underline flex items-center gap-1"
              >
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Filter pills */}
        {hasFilters && !showFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#8b7355] text-white rounded-full font-light">
                "{searchQuery}"{" "}
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                  }}
                >
                  <X size={10} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#8b7355] text-white rounded-full font-light">
                {selectedCategory}{" "}
                <button onClick={() => setSelectedCategory("")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {selectedSkinType && (
              <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#8b7355] text-white rounded-full font-light">
                {selectedSkinType}{" "}
                <button onClick={() => setSelectedSkinType("")}>
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-600 text-sm font-light mb-5">
            <AlertCircle size={16} />
            {error}
            <button
              onClick={() => fetchProducts(1)}
              className="ml-auto underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="text-center py-16">
            <Package size={40} className="text-[#8b7355]/20 mx-auto mb-3" />
            <p className="text-[#5a5450] font-light mb-3">No products found.</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#8b7355] underline font-light"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onSave={handleSave}
                onClick={() => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => fetchProducts(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="w-9 h-9 rounded-xl border border-[#e8e6e3] flex items-center justify-center text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-all disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            {[...Array(Math.min(pagination.pages, 7))].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => fetchProducts(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-light transition-all ${pagination.page === page ? "bg-[#8b7355] text-white" : "border border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => fetchProducts(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="w-9 h-9 rounded-xl border border-[#e8e6e3] flex items-center justify-center text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-all disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
