import React, { useState } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  X,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Package,
  Check,
  Percent,
  Tag,
  Thermometer,
  Zap,
  Droplets,
  Shield,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

// Mock user data
const mockUser = { name: "Ada" };

// Mock products data
const allProducts = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    price: 8500,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300",
    category: "Cleanser",
    skinTypes: ["Dry", "Normal", "Combination"],
    concerns: ["Dehydration", "Sensitivity"],
    matchScore: 98,
    inStock: true,
    rating: 4.8,
    reviews: 1234,
    ingredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
  },
  {
    id: 2,
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    price: 6200,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300",
    category: "Treatment",
    skinTypes: ["Oily", "Combination"],
    concerns: ["Hyperpigmentation", "Large Pores", "Oiliness"],
    matchScore: 96,
    inStock: true,
    rating: 4.7,
    reviews: 2156,
    ingredients: ["Niacinamide", "Zinc PCA"],
  },
  {
    id: 3,
    name: "Hydro Boost Water Gel",
    brand: "Neutrogena",
    price: 12000,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300",
    category: "Moisturizer",
    skinTypes: ["All Types"],
    concerns: ["Dehydration", "Oiliness"],
    matchScore: 94,
    inStock: true,
    rating: 4.6,
    reviews: 987,
    ingredients: ["Hyaluronic Acid", "Olive Extract"],
  },
  {
    id: 4,
    name: "Anthelios Sunscreen SPF 50+",
    brand: "La Roche-Posay",
    price: 15500,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300",
    category: "Sunscreen",
    skinTypes: ["All Types"],
    concerns: ["Hyperpigmentation", "Sun Protection"],
    matchScore: 92,
    inStock: true,
    rating: 4.9,
    reviews: 1543,
    ingredients: ["Mexoryl XL", "Vitamin E"],
  },
  {
    id: 5,
    name: "2% BHA Liquid Exfoliant",
    brand: "Paula's Choice",
    price: 18000,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300",
    category: "Treatment",
    skinTypes: ["Oily", "Combination"],
    concerns: ["Acne", "Uneven Texture", "Large Pores"],
    matchScore: 90,
    inStock: false,
    rating: 4.8,
    reviews: 2341,
    ingredients: ["Salicylic Acid", "Green Tea Extract"],
  },
  {
    id: 6,
    name: "Kind to Skin Refreshing Facial Wash",
    brand: "Simple",
    price: 3500,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300",
    category: "Cleanser",
    skinTypes: ["Sensitive", "Normal"],
    concerns: ["Sensitivity"],
    matchScore: 85,
    inStock: true,
    rating: 4.5,
    reviews: 567,
    ingredients: ["Vitamin B5", "Bisabolol"],
  },
];

// Available categories, skin types, and concerns for filters
const availableCategories = [
  "Cleanser",
  "Treatment",
  "Moisturizer",
  "Sunscreen",
];
const availableSkinTypes = [
  "Dry",
  "Oily",
  "Combination",
  "Sensitive",
  "Normal",
];
const availableConcerns = [
  "Acne",
  "Hyperpigmentation",
  "Dehydration",
  "Sensitivity",
  "Large Pores",
];

export function ProductsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("match");

  const filterProducts = () => {
    let products = allProducts.filter((product) => {
      // Search by name or brand
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Skin type filter
      if (
        selectedSkinTypes.length > 0 &&
        !product.skinTypes.some((type) => selectedSkinTypes.includes(type))
      ) {
        return false;
      }

      // Concerns filter
      if (
        selectedConcerns.length > 0 &&
        !product.concerns.some((concern) => selectedConcerns.includes(concern))
      ) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Ingredient search
      if (
        searchIngredient &&
        !product.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchIngredient.toLowerCase()),
        )
      ) {
        return false;
      }

      return true;
    });

    // Sort products
    if (sortBy === "match") {
      products = products.sort(
        (a, b) => (b.matchScore || 0) - (a.matchScore || 0),
      );
    } else if (sortBy === "price-low") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products = products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products = products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  };

  const filteredProducts = filterProducts();

  const toggleFilter = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSkinTypes([]);
    setSelectedConcerns([]);
    setPriceRange([0, 50000]);
    setSearchIngredient("");
    setInStockOnly(false);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedSkinTypes.length +
    selectedConcerns.length +
    (inStockOnly ? 1 : 0) +
    (searchIngredient ? 1 : 0);

  // Helper function to get concern icon
  const getConcernIcon = (concern) => {
    switch (concern.toLowerCase()) {
      case "acne":
        return <AlertCircle size={14} />;
      case "dehydration":
        return <Droplets size={14} />;
      case "sensitivity":
        return <Thermometer size={14} />;
      case "sun protection":
        return <Shield size={14} />;
      default:
        return <Zap size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="products"
        userName={mockUser.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2a2420] font-light">
                  Product Recommendations
                </h1>
                <p className="text-sm sm:text-base text-[#5a5450] font-light">
                  {filteredProducts.length} products matched to your skin
                </p>
              </div>
            </div>
          </div>

          {/* Search and Sort Bar */}
          <div className="bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2rem] shadow-xl p-4 border border-[#e8e6e3]/30">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5a5450]"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products or brands..."
                  className="w-full pl-12 pr-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] font-light"
              >
                <option value="match">Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-light ${
                  showFilters
                    ? "bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                    : "bg-white/60 border-2 border-[#e8e6e3] text-[#5a5450] hover:border-[#8b7355]"
                }`}
              >
                <Filter size={18} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2rem] shadow-xl p-6 border border-[#e8e6e3]/30 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg text-[#2a2420] font-light">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#8b7355] hover:underline font-light"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="text-sm text-[#2a2420] mb-3 font-light">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {availableCategories.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() =>
                              toggleFilter(
                                selectedCategories,
                                setSelectedCategories,
                                cat,
                              )
                            }
                            className="w-4 h-4 rounded border-2 border-[#e8e6e3] text-[#8b7355] focus:ring-[#8b7355]"
                          />
                          <span className="text-sm text-[#5a5450] font-light">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Skin Type Filter */}
                  <div className="pt-6 border-t border-[#e8e6e3]">
                    <h4 className="text-sm text-[#2a2420] mb-3 font-light">
                      Skin Type
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {availableSkinTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() =>
                            toggleFilter(
                              selectedSkinTypes,
                              setSelectedSkinTypes,
                              type,
                            )
                          }
                          className={`px-3 py-1.5 rounded-full text-xs transition-all font-light ${
                            selectedSkinTypes.includes(type)
                              ? "bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                              : "bg-white/60 text-[#5a5450] border border-[#e8e6e3] hover:border-[#8b7355]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Concerns Filter */}
                  <div className="pt-6 border-t border-[#e8e6e3]">
                    <h4 className="text-sm text-[#2a2420] mb-3 font-light">
                      Concerns
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {availableConcerns.map((concern) => (
                        <button
                          key={concern}
                          onClick={() =>
                            toggleFilter(
                              selectedConcerns,
                              setSelectedConcerns,
                              concern,
                            )
                          }
                          className={`px-3 py-1.5 rounded-full text-xs transition-all font-light ${
                            selectedConcerns.includes(concern)
                              ? "bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                              : "bg-white/60 text-[#5a5450] border border-[#e8e6e3] hover:border-[#8b7355]"
                          }`}
                        >
                          <span className="flex items-center gap-1">
                            {getConcernIcon(concern)}
                            {concern}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In Stock Filter */}
                  <div className="pt-6 border-t border-[#e8e6e3]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="w-4 h-4 rounded border-2 border-[#e8e6e3] text-[#8b7355] focus:ring-[#8b7355]"
                      />
                      <span className="text-sm text-[#2a2420] font-light">
                        In stock only
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            {filteredProducts.length === 0 ? (
              <div className="bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2rem] shadow-xl p-12 text-center border border-[#e8e6e3]/30">
                <Package className="mx-auto mb-4 text-[#8b7355]" size={48} />
                <h3 className="text-xl text-[#2a2420] mb-2 font-light">
                  No products found
                </h3>
                <p className="text-[#5a5450] mb-6 font-light">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all font-light"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[1.5rem] shadow-xl overflow-hidden border border-[#e8e6e3]/30 hover:shadow-2xl transition-all group"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 bg-[#f8f6f3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="px-4 py-2 bg-white rounded-full text-sm text-[#2a2420] font-light shadow-lg flex items-center gap-1">
                            <AlertCircle size={14} />
                            Out of Stock
                          </span>
                        </div>
                      )}

                      {/* Match Score Badge */}
                      {product.matchScore && (
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full text-xs font-light shadow-lg flex items-center gap-1">
                          <Sparkles size={12} />
                          {product.matchScore}% Match
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-all">
                          <Heart size={18} className="text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <span className="text-xs text-[#8b7355] font-light">
                        {product.brand}
                      </span>
                      <h3 className="text-base text-[#2a2420] mb-2 font-light line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-sm text-[#2a2420] font-light">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-xs text-[#5a5450] font-light">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Concerns Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.concerns.slice(0, 2).map((concern, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-[#8b7355]/10 text-[#8b7355] rounded-full text-xs font-light flex items-center gap-1"
                          >
                            {getConcernIcon(concern)}
                            {concern}
                          </span>
                        ))}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#e8e6e3]">
                        <div>
                          <span className="text-xl text-[#2a2420] font-light">
                            ₦{product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-4 py-2 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-lg transition-all text-sm font-light"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e8e6e3]/30">
            <div className="sticky top-0 bg-gradient-to-br from-[#f8f6f3] via-white to-[#fdf9f0] p-6 border-b border-[#e8e6e3] flex justify-between items-center rounded-t-[2.5rem]">
              <h2 className="text-2xl text-[#2a2420] font-light">
                Product Details
              </h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-all"
              >
                <X className="text-[#5a5450]" size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div>
                  <span className="text-sm text-[#8b7355] font-light">
                    {selectedProduct.brand}
                  </span>
                  <h3 className="text-2xl text-[#2a2420] mb-3 font-light">
                    {selectedProduct.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      <span className="text-base text-[#2a2420] font-light">
                        {selectedProduct.rating}
                      </span>
                    </div>
                    <span className="text-sm text-[#5a5450] font-light">
                      ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl text-[#2a2420] font-light">
                      ₦{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>

                  {selectedProduct.matchScore && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-green-600" size={20} />
                        <span className="text-sm text-green-800 font-light">
                          <strong className="font-normal">
                            {selectedProduct.matchScore}% match
                          </strong>{" "}
                          for your skin profile
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2 font-light">
                      <ShoppingCart size={18} />
                      Add to Routine
                    </button>
                    <button className="w-12 h-12 border-2 border-[#e8e6e3] rounded-full flex items-center justify-center hover:border-red-500 transition-all">
                      <Heart size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Sections */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg text-[#2a2420] mb-3 font-light">
                    Good For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.concerns.map((concern, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#8b7355]/10 text-[#8b7355] rounded-full text-sm font-light flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg text-[#2a2420] mb-3 font-light">
                    Suitable Skin Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.skinTypes.map((type, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/60 border border-[#e8e6e3] text-[#2a2420] rounded-full text-sm font-light"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg text-[#2a2420] mb-3 font-light">
                    Key Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 rounded-full text-sm font-light"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-5 rounded-xl border-2 ${selectedProduct.inStock ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" : "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"}`}
                >
                  <p
                    className={`text-sm ${selectedProduct.inStock ? "text-green-800" : "text-yellow-800"} font-light flex items-center gap-2`}
                  >
                    {selectedProduct.inStock ? (
                      <>
                        <CheckCircle size={16} />
                        In stock and ready to ship
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        Currently out of stock - notify me when available
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
