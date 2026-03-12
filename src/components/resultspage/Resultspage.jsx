/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  Share2,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Flag,
  Loader,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Star,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyses, routines, getUser } from "../../services/api";

// ─── Condition education data ─────────────────────────────────────────────────
const CONDITION_INFO = {
  Acne: {
    icon: "🧴",
    what: "Acne occurs when hair follicles become clogged with oil and dead skin cells, leading to pimples, blackheads or whiteheads.",
    cause:
      "Excess sebum, bacteria (C. acnes), hormonal changes, humidity, and comedogenic products.",
    routine: [
      "Use a gentle salicylic acid or BHA cleanser twice daily",
      "Apply niacinamide serum to reduce inflammation and oil",
      "Use a lightweight, oil-free moisturiser",
      "Never skip SPF — UV worsens post-acne marks",
    ],
    nigerianTip:
      "Nigeria's humid climate worsens acne. Double-cleanse if you sweat heavily. Black soap can help as a gentle natural option.",
  },
  Hyperpigmentation: {
    icon: "🌑",
    what: "Dark patches caused by overproduction of melanin, common in deeper skin tones after inflammation, sun exposure or hormonal changes.",
    cause:
      "Sun exposure, post-inflammatory response, hormonal shifts, picking at skin.",
    routine: [
      "Apply vitamin C serum every morning before SPF",
      "Use niacinamide to inhibit melanin transfer",
      "Reapply SPF every 2 hours outdoors",
      "Introduce alpha arbutin or kojic acid at night",
    ],
    nigerianTip:
      "The Nigerian sun is intense. Even cloudy days cause UV damage. Reapply SPF every 2 hours outdoors.",
  },
  "Dark Spots": {
    icon: "🔵",
    what: "Localised areas of increased pigmentation, usually left after acne, injury or inflammation (known as PIH on dark skin).",
    cause:
      "Post-inflammatory hyperpigmentation (PIH), sun damage, picking skin lesions.",
    routine: [
      "Vitamin C serum every morning",
      "Azelaic acid or alpha arbutin at night",
      "Broad spectrum SPF 30+ daily without fail",
      "Avoid picking or squeezing spots",
    ],
    nigerianTip:
      "PIH fades much slower in melanin-rich skin. Be patient — a consistent routine over 2–3 months shows results.",
  },
  Dryness: {
    icon: "💧",
    what: "Lack of moisture in the skin's outer layer, leaving it feeling tight, rough or flaky.",
    cause:
      "Low humidity (harmattan), harsh cleansers, hot water, under-moisturising.",
    routine: [
      "Cleanse with a cream or oil-based cleanser",
      "Apply hyaluronic acid serum on damp skin",
      "Layer a rich ceramide moisturiser on top",
      "Seal with a facial oil or shea butter at night",
    ],
    nigerianTip:
      "Harmattan season (Nov–Feb) is brutal on dry skin. Shea butter is an excellent natural barrier. Layer products while skin is still slightly damp.",
  },
  Oiliness: {
    icon: "✨",
    what: "Excess sebum production giving skin a shiny appearance, often leading to enlarged pores and breakouts.",
    cause:
      "Genetics, humidity, hormones, over-stripping the skin with harsh cleansers.",
    routine: [
      "Gentle foaming or gel cleanser morning and night",
      "Niacinamide 10% serum to regulate oil production",
      "Light gel moisturiser — never skip moisturiser",
      "Clay mask 1–2 times a week",
    ],
    nigerianTip:
      "Nigeria's year-round humidity increases sebum production. Use a blotting paper during the day instead of washing your face repeatedly.",
  },
  Dehydration: {
    icon: "🫧",
    what: "Lack of water (not oil) in the skin — even oily skin can be dehydrated. Presents as dullness and fine lines.",
    cause:
      "Not drinking enough water, harsh products, air conditioning, low humidity.",
    routine: [
      "Hyaluronic acid serum on damp skin twice daily",
      "Light hydrating toner after cleansing",
      "Drink at least 1.5–2 litres of water daily",
      "Avoid long hot showers",
    ],
    nigerianTip:
      "Air conditioning in Nigerian offices and cars severely dehydrates skin. Keep a facial mist at your desk.",
  },
  Sensitivity: {
    icon: "🌸",
    what: "Skin that reacts easily to products, weather or environmental triggers with redness, stinging or itching.",
    cause:
      "Compromised skin barrier, over-exfoliation, fragranced products, stress.",
    routine: [
      "Fragrance-free, minimal ingredient cleanser",
      "Centella asiatica or aloe vera to soothe",
      "Ceramide-rich moisturiser to repair barrier",
      "Introduce new products one at a time",
    ],
    nigerianTip:
      "Synthetic fragrances common in budget Nigerian products can trigger sensitivity. Always patch test on your inner arm first.",
  },
  Dullness: {
    icon: "🌟",
    what: "Skin that lacks radiance and appears tired, flat or grey — often from dead cell buildup or poor circulation.",
    cause:
      "Dead cell accumulation, dehydration, poor diet, inadequate sleep, pollution.",
    routine: [
      "Chemical exfoliant (AHA/BHA) 2–3 times a week",
      "Vitamin C serum every morning",
      "Stay consistently hydrated inside and out",
      "Get 7–8 hours of sleep",
    ],
    nigerianTip:
      "Lagos air pollution significantly contributes to dullness. Double cleanse at night to remove pollution particles properly.",
  },
  "Large Pores": {
    icon: "🔬",
    what: "Pores that appear enlarged, usually on the nose, cheeks and chin — more visible in oily skin types.",
    cause: "Excess sebum, genetics, loss of skin elasticity, sun damage.",
    routine: [
      "BHA (salicylic acid) cleanser to clean inside pores",
      "Niacinamide serum to minimise appearance",
      "Non-comedogenic, oil-free moisturiser",
      "Retinol at night to improve skin texture over time",
    ],
    nigerianTip:
      "You cannot physically shrink pores, but keeping them clean makes them appear smaller. Consistent use of BHA shows visible results in 4–6 weeks.",
  },
  "Uneven Texture": {
    icon: "🪨",
    what: "Rough, bumpy or uneven skin surface caused by dead cell buildup, keratosis pilaris or acne scarring.",
    cause:
      "Dead cell accumulation, keratosis pilaris, healed acne, sun damage.",
    routine: [
      "AHA exfoliant (glycolic or lactic acid) 2–3x weekly",
      "Retinol at night to accelerate cell turnover",
      "Hydrating moisturiser to prevent over-drying",
      "SPF daily — exfoliated skin is more sun-sensitive",
    ],
    nigerianTip:
      "Start with lactic acid before glycolic acid if new to exfoliants — it's gentler for sensitive darker skin tones common in Nigeria.",
  },
  Wrinkles: {
    icon: "〰️",
    what: "Lines and creases in the skin from reduced collagen and elastin, repeated facial expressions, and sun damage over time.",
    cause:
      "Ageing, UV exposure, smoking, dehydration, reduced collagen production.",
    routine: [
      "Retinol 0.025–0.1% at night, 2–3x weekly to start",
      "Peptide serum or vitamin C in the morning",
      "Heavy moisturiser with ceramides or squalane",
      "Broad spectrum SPF 50 every single morning",
    ],
    nigerianTip:
      "Consistent SPF use is the single most effective anti-ageing product available. Nigerian sun accelerates photoageing significantly.",
  },
};

const SEVERITY_STYLES = {
  Mild: "bg-green-100 text-green-700",
  Moderate: "bg-amber-100 text-amber-700",
  Severe: "bg-red-100 text-red-700",
};
const TABS = {
  BEST: "best",
  BUDGET: "budget",
  NATURAL: "natural",
  LOCAL: "local",
};
const TAB_CONFIG = [
  { id: TABS.BEST, label: "Best Matches" },
  { id: TABS.BUDGET, label: "Budget Options" },
  { id: TABS.NATURAL, label: "Natural/Organic" },
  { id: TABS.LOCAL, label: "Local Brands" },
];
const CLIPBOARD_RESET_DELAY = 3000;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
const formatPrice = (p) =>
  p != null ? `₦${Number(p).toLocaleString("en-NG")}` : "";

// ─── Condition Card ───────────────────────────────────────────────────────────
function ConditionCard({ condition }) {
  const [expanded, setExpanded] = useState(false);
  const info = CONDITION_INFO[condition.name];
  const sev = SEVERITY_STYLES[condition.severity] || SEVERITY_STYLES.Mild;

  return (
    <div
      className={`border rounded-2xl transition-all ${expanded ? "border-[#8b7355]/40 bg-[#fdfcfa]" : "border-[#e8e6e3]"}`}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{info?.icon || "💆"}</span>
          <div>
            <p className="text-sm text-[#2a2420] font-normal">
              {condition.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-light ${sev}`}
              >
                {condition.severity}
              </span>
              <span className="text-xs text-[#8b7355] font-light">
                {condition.confidence}% confidence
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-16 h-1.5 bg-[#e8e6e3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8b7355] rounded-full"
              style={{ width: `${condition.confidence}%` }}
            />
          </div>
          {expanded ? (
            <ChevronUp size={16} className="text-[#8b7355]" />
          ) : (
            <ChevronDown size={16} className="text-[#8b7355]" />
          )}
        </div>
      </button>
      {expanded && info && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <p className="text-xs text-[#8b7355] font-light uppercase tracking-wide mb-1">
              What is it?
            </p>
            <p className="text-sm text-[#5a5450] font-light leading-relaxed">
              {info.what}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#8b7355] font-light uppercase tracking-wide mb-1">
              Common causes
            </p>
            <p className="text-sm text-[#5a5450] font-light leading-relaxed">
              {info.cause}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#8b7355] font-light uppercase tracking-wide mb-2">
              How to treat it
            </p>
            <ol className="space-y-1.5">
              {info.routine.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[#5a5450] font-light"
                >
                  <span className="w-5 h-5 rounded-full bg-[#8b7355] text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs text-amber-700 font-light">
              🇳🇬 {info.nigerianTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
// FIX: "Save to Routine" button now has an onClick handler
function ProductCard({ product, isFirst, analysisId }) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);

  // FIX: product.product can be null if the DB product was deleted — guard against it
  const p = product.product || product;
  const name = p?.name || "Product";
  const brand = p?.brand || "";
  const price = formatPrice(p?.price);
  const img = p?.image;
  const inStock = p?.inStock !== false;
  const jumiaUrl = p?.jumiaUrl;
  const score = product.matchScore;
  const reasons = product.whyRecommended || [];

  // FIX: don't render anything if the product reference is missing from the DB
  if (!p || !p._id) return null;

  const handleSaveToRoutine = async (period) => {
    setSaving(true);
    setShowPeriod(false);
    try {
      await routines.addProduct({
        productId: p._id.toString(),
        period,
        // Pass the category as-is — the backend STEP_TYPE_MAP handles normalisation
        stepType: p.category || "Other",
        notes: "",
      });
      setSaved(true);
    } catch (err) {
      console.error("Failed to save to routine:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`border-2 rounded-2xl p-4 sm:p-5 transition-all ${expanded ? "border-[#8b7355]/40" : "border-[#e8e6e3] hover:border-[#8b7355]/30"}`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden bg-[#f8f6f3] shrink-0">
          {img ? (
            <img src={img} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart size={24} className="text-[#8b7355]/30" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <span className="text-xs text-[#5a5450] font-light">{brand}</span>
            {isFirst && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-light">
                ⭐ Top Pick
              </span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-light flex items-center gap-1 ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {inStock ? (
                <>
                  <CheckCircle size={10} /> In Stock
                </>
              ) : (
                <>
                  <AlertCircle size={10} /> Out of Stock
                </>
              )}
            </span>
            {p.isLocalBrand && (
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-light flex items-center gap-1">
                <Flag size={10} /> Local
              </span>
            )}
          </div>
          <h3 className="text-base text-[#2a2420] font-light mb-1">{name}</h3>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg text-[#8b7355] font-light">{price}</span>
            {score != null && (
              <span className="text-xs px-2 py-1 bg-[#8b7355] text-white rounded-lg font-light">
                {score}% match
              </span>
            )}
          </div>

          {reasons.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-sm text-[#8b7355] font-light mb-2"
            >
              <ChevronDown
                size={14}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
              Why recommended
            </button>
          )}
          {expanded && (
            <ul className="space-y-1 pl-1 mb-2">
              {reasons.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-[#5a5450] font-light"
                >
                  <Check size={12} className="text-[#8b7355] mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 relative">
            {jumiaUrl && (
              <a
                href={jumiaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-[#8b7355] text-white rounded-xl text-xs font-light hover:bg-[#6d5a43] transition-all"
              >
                <ExternalLink size={12} /> Buy on Jumia
              </a>
            )}
            {/* FIX: was a button with no onClick — now opens AM/PM picker */}
            {saved ? (
              <span className="px-3 py-2 border border-emerald-300 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-light flex items-center gap-1">
                <CheckCircle size={12} /> Added to Routine
              </span>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowPeriod(!showPeriod)}
                  disabled={saving}
                  className="px-3 py-2 border border-[#e8e6e3] text-[#5a5450] rounded-xl text-xs font-light hover:border-[#8b7355] hover:text-[#8b7355] transition-all flex items-center gap-1 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader size={10} className="animate-spin" />
                  ) : null}
                  Save to Routine
                </button>
                {showPeriod && (
                  <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#e8e6e3] rounded-xl shadow-lg p-2 z-10 flex gap-1 whitespace-nowrap">
                    <button
                      onClick={() => handleSaveToRoutine("am")}
                      className="px-3 py-1.5 text-xs font-light bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-all"
                    >
                      ☀️ Morning
                    </button>
                    <button
                      onClick={() => handleSaveToRoutine("pm")}
                      className="px-3 py-1.5 text-xs font-light bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all"
                    >
                      🌙 Evening
                    </button>
                    <button
                      onClick={() => setShowPeriod(false)}
                      className="px-2 py-1.5 text-xs text-[#5a5450] hover:text-[#2a2420]"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Feedback Section ─────────────────────────────────────────────────────────
// FIX: backend + api.js had submitFeedback ready but ResultsPage never showed it
function FeedbackSection({ analysisId }) {
  const [helpful, setHelpful] = useState(null); // true | false | null
  const [accuracy, setAccuracy] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (helpful === null) return;
    setSaving(true);
    try {
      await analyses.submitFeedback(analysisId, {
        helpful,
        accuracy: accuracy || undefined,
        comment: comment || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
        <p className="text-sm text-emerald-700 font-light">
          Thank you for your feedback! 💚
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 mb-8">
      <h3 className="text-lg text-[#2a2420] font-light mb-4">
        Was this analysis helpful?
      </h3>
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setHelpful(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-light border-2 transition-all ${helpful === true ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-[#e8e6e3] text-[#5a5450] hover:border-emerald-300"}`}
        >
          <ThumbsUp size={16} /> Yes, helpful
        </button>
        <button
          onClick={() => setHelpful(false)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-light border-2 transition-all ${helpful === false ? "border-red-300 bg-red-50 text-red-600" : "border-[#e8e6e3] text-[#5a5450] hover:border-red-200"}`}
        >
          <ThumbsDown size={16} /> Not quite
        </button>
      </div>

      {helpful !== null && (
        <>
          <div className="mb-3">
            <p className="text-sm text-[#2a2420] font-light mb-2">
              Accuracy rating
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setAccuracy(n)}
                  className={`w-8 h-8 rounded-full transition-all ${n <= accuracy ? "bg-[#8b7355] text-white" : "bg-[#f8f6f3] text-[#8b7355]"}`}
                >
                  <Star size={14} className="mx-auto" />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="Any comments? (optional)"
            className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] text-sm font-light resize-none mb-3"
          />
          <button
            onClick={handleSubmit}
            disabled={saving || helpful === null}
            className="px-5 py-2.5 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl text-sm font-light disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? <Loader size={12} className="animate-spin" /> : null}
            Submit Feedback
          </button>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ResultsPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.BEST);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    analyses
      .getLatest()
      .then((data) => setAnalysis(data.analysis))
      .catch(() => setError("Could not load your analysis results."))
      .finally(() => setLoading(false));
  }, []);

  const getCurrentProducts = () => {
    if (!analysis?.recommendations) return [];
    return (
      analysis.recommendations[activeTab] || analysis.recommendations.best || []
    );
  };

  const handleDownload = () => {
    if (!analysis) return;
    const lines = [
      "DermAI Skin Analysis Results",
      "=".repeat(32),
      `Analysed: ${formatDate(analysis.createdAt)}`,
      `Skin Type: ${analysis.skinType} (${analysis.skinTypeConfidence}% confidence)`,
      "",
      "IDENTIFIED CONDITIONS:",
      ...(analysis.conditions || []).map(
        (c) => `• ${c.name}: ${c.severity} (${c.confidence}% confidence)`,
      ),
      "",
      "TOP PRODUCT RECOMMENDATIONS:",
      ...getCurrentProducts()
        .slice(0, 5)
        .map((p, i) => {
          const prod = p.product || p;
          return `${i + 1}. ${prod.name} by ${prod.brand} — ${formatPrice(prod.price)}`;
        }),
      "",
      "Generated by DermAI",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `dermai-results-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  const handleCopy = async () => {
    if (!analysis) return;
    const text = `DermAI Skin Analysis\nSkin Type: ${analysis.skinType}\nConditions: ${(analysis.conditions || []).map((c) => c.name).join(", ")}\nScore: ${analysis.analysisScore}/100`;
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), CLIPBOARD_RESET_DELAY);
  };

  const handleShare = async () => {
    if (!analysis) return;
    const text = `My DermAI skin analysis:\nSkin Type: ${analysis.skinType}\nConditions: ${(analysis.conditions || []).map((c) => c.name).join(", ")}\nScore: ${analysis.analysisScore}/100\n\nGet yours at DermAI!`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My DermAI Results", text });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(text).catch(() => {});
    alert("Results copied to clipboard!");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center">
        <Loader size={32} className="text-[#8b7355] animate-spin" />
      </div>
    );

  if (error || !analysis)
    return (
      <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle size={40} className="text-[#8b7355]/40 mx-auto mb-3" />
          <p className="text-[#5a5450] font-light mb-4">
            {error || "No analysis found."}
          </p>
          <button
            onClick={() => navigate("/analysis")}
            className="px-5 py-2.5 bg-[#8b7355] text-white rounded-full text-sm font-light flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={14} /> Run New Analysis
          </button>
        </div>
      </div>
    );

  const currentProducts = getCurrentProducts();

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <ProfileUpdateModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
      <AuthNav
        currentPage="analysis"
        userName={user?.name}
        onUpdateProfile={() => setShowProfileModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-[#8b7355] flex items-center gap-2 mb-4 font-light hover:text-[#6d5a43]"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl text-[#2a2420] font-light mb-1">
            Your Skin Analysis Results
          </h1>
          <p className="text-sm text-[#5a5450] font-light">
            Analysed on {formatDate(analysis.createdAt)}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 mb-6">
          <h2 className="text-xl text-[#2a2420] font-light mb-6">
            Analysis Summary
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl overflow-hidden bg-[#f8f6f3] aspect-square max-h-72 sm:max-h-none">
              {analysis.photoUrl ? (
                <img
                  src={analysis.photoUrl}
                  alt="Your skin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles size={36} className="text-[#8b7355]/30" />
                </div>
              )}
            </div>
            <div>
              <div className="bg-linear-to-br from-[#8b7355] to-[#6d5a43] rounded-2xl p-5 text-white mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs font-light opacity-80 mb-1">
                      Detected Skin Type
                    </p>
                    <p className="text-3xl font-light">{analysis.skinType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-light opacity-80 mb-1">Score</p>
                    <p className="text-3xl font-light">
                      {analysis.analysisScore}
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-white h-1.5 rounded-full"
                    style={{ width: `${analysis.skinTypeConfidence}%` }}
                  />
                </div>
                <p className="text-xs font-light opacity-70 mt-1">
                  {analysis.skinTypeConfidence}% confidence
                  {analysis.skinToneDescription &&
                    ` · ${analysis.skinToneDescription}`}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base text-[#2a2420] font-light">
                    Identified Conditions
                  </h3>
                  <span className="text-xs text-[#8b7355] font-light">
                    Tap each to learn more
                  </span>
                </div>
                <div className="space-y-2">
                  {(analysis.conditions || []).map((c, i) => (
                    <ConditionCard key={i} condition={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {analysis.skinTip && (
            <div className="bg-linear-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <Lightbulb size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-light leading-relaxed">
                {analysis.skinTip}
              </p>
            </div>
          )}
        </div>

        {/* Product Recommendations */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="p-5 sm:p-6 border-b border-[#e8e6e3]">
            <h2 className="text-xl text-[#2a2420] font-light">
              Recommended Products
            </h2>
            <p className="text-sm text-[#5a5450] font-light mt-1">
              Matched from our product database based on your skin profile
            </p>
          </div>
          <div className="border-b border-[#e8e6e3] overflow-x-auto">
            <div className="flex min-w-max sm:min-w-0">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none px-5 py-3.5 text-sm whitespace-nowrap transition-all font-light ${activeTab === tab.id ? "border-b-2 border-[#8b7355] text-[#2a2420] bg-[#fafaf9]" : "text-[#5a5450] hover:text-[#2a2420]"}`}
                >
                  {tab.label}{" "}
                  {analysis.recommendations?.[tab.id]?.length > 0 && (
                    <span className="ml-1 text-xs opacity-60">
                      ({analysis.recommendations[tab.id].length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 sm:p-6">
            {currentProducts.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart
                  size={32}
                  className="text-[#8b7355]/20 mx-auto mb-3"
                />
                <p className="text-sm text-[#5a5450] font-light">
                  No products in this category yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentProducts.map((p, i) => (
                  <ProductCard
                    key={i}
                    product={p}
                    isFirst={activeTab === TABS.BEST && i === 0}
                    analysisId={analysis.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Download", icon: Download, action: handleDownload },
            {
              label: copiedToClipboard ? "Copied!" : "Copy",
              icon: copiedToClipboard ? Check : Copy,
              action: handleCopy,
            },
            { label: "Share", icon: Share2, action: handleShare },
            {
              label: "Browse All",
              icon: ShoppingCart,
              action: () => navigate("/products"),
              primary: true,
            },
          ].map(({ label, icon: Icon, action, primary }) => (
            <button
              key={label}
              onClick={action}
              className={`py-3 rounded-2xl text-sm font-light flex items-center justify-center gap-2 transition-all ${primary ? "bg-[#8b7355] text-white hover:bg-[#6d5a43]" : "bg-white border border-[#e8e6e3] text-[#2a2420] hover:border-[#8b7355]"}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* FIX: Feedback section — was completely missing despite backend + api.js being ready */}
        {analysis.id && <FeedbackSection analysisId={analysis.id} />}

        {/* Run new analysis */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/analysis")}
            className="text-sm text-[#8b7355] font-light hover:underline flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw size={14} /> Run a new analysis
          </button>
        </div>
      </div>
    </div>
  );
}
