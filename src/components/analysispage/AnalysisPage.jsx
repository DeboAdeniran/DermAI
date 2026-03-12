import { useState, useRef, useEffect, useCallback } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Camera, Upload, X, Check, AlertTriangle, AlertCircle, CheckCircle,
  Image as ImageIcon, Sparkles, Sun, Droplets, Zap, Loader, RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyses, getUser } from "../../services/api";

const SKIN_CONCERNS    = ["Acne","Dark Spots","Dryness","Oiliness","Wrinkles","Sensitivity","Dullness","Large Pores"];
const SUN_EXPOSURE     = ["Minimal","Moderate","High","Very High"];
const CLIMATE_TYPES    = ["Very Dry","Dry","Moderate","Humid","Very Humid"];
const PHOTO_GUIDELINES = ["Natural lighting (near a window)","Clean face with no makeup","Face directly towards camera","High resolution (at least 800×800px)"];

const ANALYSIS_STEPS_UI = [
  { label: "Uploading your photo",          completeAt: 20  },
  { label: "Detecting skin tone & type",    completeAt: 45  },
  { label: "Identifying skin concerns",     completeAt: 65  },
  { label: "Matching products from our DB", completeAt: 80  },
  { label: "Building your AI routine",      completeAt: 95  },
  { label: "Finalising results",            completeAt: 100 },
];

function AnalysisStep({ label, isActive, isComplete }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${isComplete ? "bg-green-500" : isActive ? "bg-gradient-to-br from-[#8b7355] to-[#6d5a43]" : "bg-[#e8e6e3]"}`}>
        {isComplete ? <Check className="text-white" size={16} /> : isActive ? <div className="w-2 h-2 bg-white rounded-full animate-pulse" /> : null}
      </div>
      <span className={`text-sm font-light ${isComplete || isActive ? "text-[#2a2420]" : "text-[#5a5450]"}`}>{label}</span>
    </div>
  );
}

export function AnalysisPage() {
  const navigate = useNavigate();
  const user = getUser();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Photo state
  const [capturedImage, setCapturedImage]   = useState(null);
  const [capturedFile, setCapturedFile]     = useState(null);
  const [imageQuality, setImageQuality]     = useState(null);
  const [cameraActive, setCameraActive]     = useState(false);
  const [step, setStep]                     = useState("upload"); // upload | questionnaire | analyzing | error
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Questionnaire
  const [concerns, setConcerns]             = useState([]);
  const [sunExposure, setSunExposure]       = useState("");
  const [humidity, setHumidity]             = useState("");
  const [recentChanges, setRecentChanges]   = useState("");
  const [productReactions, setProductReactions] = useState("");

  // Analysis progress
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisId, setAnalysisId]         = useState(null);
  const [errorMessage, setErrorMessage]     = useState("");
  const progressInterval = useRef(null);
  const pollInterval     = useRef(null);

  // ── Camera ──────────────────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } });
      if (videoRef.current) { videoRef.current.srcObject = stream; setCameraActive(true); }
    } catch {
      alert("Unable to access camera. Please upload an image instead.");
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width  = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCapturedImage(dataUrl);
    setImageQuality(canvas.width >= 800 && canvas.height >= 600 ? "good" : "poor");
    // Convert to File
    canvas.toBlob((blob) => { setCapturedFile(new File([blob], "capture.jpg", { type: "image/jpeg" })); }, "image/jpeg", 0.92);
    stopCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setCapturedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target.result);
      const img = new Image();
      img.onload = () => setImageQuality(img.naturalWidth >= 800 && img.naturalHeight >= 600 ? "good" : "poor");
      img.src    = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const toggleConcern = (c) => setConcerns((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);

  // ── Submit analysis to backend ───────────────────────────────────────────────
  const submitAnalysis = async () => {
    if (!capturedFile) return;
    setStep("analyzing");
    setAnalysisProgress(5);
    setErrorMessage("");

    // Animate progress bar up to 85% while waiting for backend
    progressInterval.current = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 85) { clearInterval(progressInterval.current); return 85; }
        return prev + 0.8;
      });
    }, 400);

    try {
      const fd = new FormData();
      fd.append("photo", capturedFile);
      fd.append("concerns", JSON.stringify(concerns));
      fd.append("sunExposure", sunExposure);
      fd.append("humidity", humidity);
      fd.append("recentChanges", recentChanges);
      fd.append("productReactions", productReactions);

      const res = await analyses.create(fd);
      const id  = res.analysisId;
      setAnalysisId(id);

      // Poll status every 4s
      pollInterval.current = setInterval(async () => {
        try {
          const status = await analyses.getStatus(id);
          if (status.status === "completed") {
            clearInterval(pollInterval.current);
            clearInterval(progressInterval.current);
            setAnalysisProgress(100);
            setTimeout(() => navigate("/results"), 800);
          } else if (status.status === "failed") {
            clearInterval(pollInterval.current);
            clearInterval(progressInterval.current);
            setErrorMessage(status.error || "Analysis failed. Please try again.");
            setStep("error");
          }
        } catch {}
      }, 4000);
    } catch (err) {
      clearInterval(progressInterval.current);
      setErrorMessage(err?.message || "Failed to start analysis. Please check your connection.");
      setStep("error");
    }
  };

  useEffect(() => () => { stopCamera(); clearInterval(progressInterval.current); clearInterval(pollInterval.current); }, [stopCamera]);

  // ── ANALYZING SCREEN ────────────────────────────────────────────────────────
  if (step === "analyzing") {
    const activeStepIdx = ANALYSIS_STEPS_UI.findIndex((s) => analysisProgress < s.completeAt);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full border border-[#e8e6e3]/30">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="42" stroke="#e8e6e3" strokeWidth="8" fill="none" />
                <circle cx="48" cy="48" r="42" stroke="#8b7355" strokeWidth="8" fill="none"
                  strokeDasharray={`${(analysisProgress / 100) * 264} 264`} strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.5s ease" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl text-[#2a2420] font-light">{Math.round(analysisProgress)}%</span>
              </div>
            </div>
            <h2 className="text-2xl text-[#2a2420] mb-2 font-light">Analysing Your Skin</h2>
            <p className="text-sm text-[#5a5450] font-light">Our AI is reviewing your photo…</p>
          </div>
          <div className="space-y-3">
            {ANALYSIS_STEPS_UI.map((s, i) => (
              <AnalysisStep key={i} label={s.label}
                isComplete={analysisProgress >= s.completeAt}
                isActive={i === activeStepIdx && analysisProgress < s.completeAt} />
            ))}
          </div>
          <p className="text-xs text-[#8b7355] text-center mt-6 font-light">This usually takes 20–40 seconds</p>
        </div>
      </div>
    );
  }

  // ── ERROR SCREEN ─────────────────────────────────────────────────────────────
  if (step === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl text-[#2a2420] font-light mb-2">Analysis Failed</h2>
          <p className="text-sm text-[#5a5450] font-light mb-6">{errorMessage}</p>
          <button onClick={() => { setStep("upload"); setCapturedImage(null); setCapturedFile(null); setAnalysisProgress(0); }}
            className="px-6 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full text-sm font-light flex items-center gap-2 mx-auto">
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── QUESTIONNAIRE SCREEN ─────────────────────────────────────────────────────
  if (step === "questionnaire") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
        <ProfileUpdateModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        <AuthNav currentPage="analysis" userName={user?.name} onUpdateProfile={() => setIsProfileModalOpen(true)} />
        <div className="max-w-2xl mx-auto px-4 py-8 pt-28">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#e8e6e3]/30">
            <div className="flex items-center gap-3 mb-6">
              <img src={capturedImage} alt="preview" className="w-16 h-16 rounded-2xl object-cover border-2 border-[#8b7355]/20" />
              <div>
                <h2 className="text-xl text-[#2a2420] font-light">Tell us about your skin</h2>
                <p className="text-sm text-[#5a5450] font-light">Helps our AI give better results</p>
              </div>
            </div>

            {/* Concerns */}
            <div className="mb-6">
              <label className="block text-sm text-[#2a2420] font-light mb-3">Main skin concerns (select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {SKIN_CONCERNS.map((c) => (
                  <button key={c} onClick={() => toggleConcern(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-light border transition-all ${concerns.includes(c) ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white text-[#5a5450] border-[#e8e6e3] hover:border-[#8b7355]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sun exposure */}
            <div className="mb-6">
              <label className="block text-sm text-[#2a2420] font-light mb-3 flex items-center gap-2"><Sun size={14} className="text-[#8b7355]" /> Sun exposure level</label>
              <div className="flex flex-wrap gap-2">
                {SUN_EXPOSURE.map((s) => (
                  <button key={s} onClick={() => setSunExposure(sunExposure === s ? "" : s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-light border transition-all ${sunExposure === s ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white text-[#5a5450] border-[#e8e6e3] hover:border-[#8b7355]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Climate */}
            <div className="mb-6">
              <label className="block text-sm text-[#2a2420] font-light mb-3 flex items-center gap-2"><Droplets size={14} className="text-[#8b7355]" /> Current climate / humidity</label>
              <div className="flex flex-wrap gap-2">
                {CLIMATE_TYPES.map((c) => (
                  <button key={c} onClick={() => setHumidity(humidity === c ? "" : c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-light border transition-all ${humidity === c ? "bg-[#8b7355] text-white border-[#8b7355]" : "bg-white text-[#5a5450] border-[#e8e6e3] hover:border-[#8b7355]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent changes */}
            <div className="mb-4">
              <label className="block text-sm text-[#2a2420] font-light mb-2">Recent skin changes (optional)</label>
              <textarea value={recentChanges} onChange={(e) => setRecentChanges(e.target.value)} rows={2} placeholder="e.g. breakout after changing products last week…"
                className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 resize-none" />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-[#2a2420] font-light mb-2">Product reactions / allergies (optional)</label>
              <textarea value={productReactions} onChange={(e) => setProductReactions(e.target.value)} rows={2} placeholder="e.g. reacts to fragrance, sensitive to retinol…"
                className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] text-sm font-light focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 resize-none" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep("upload")} className="flex-1 py-3 border border-[#e8e6e3] text-[#5a5450] rounded-xl text-sm font-light hover:bg-[#f8f6f3] transition-all">Back</button>
              <button onClick={submitAnalysis} className="flex-1 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl text-sm font-light flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <Sparkles size={16} /> Analyse My Skin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── UPLOAD SCREEN ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <AuthNav currentPage="analysis" userName={user?.name} onUpdateProfile={() => setIsProfileModalOpen(true)} />
      <div className="max-w-2xl mx-auto px-4 py-8 pt-28">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg mx-auto mb-4">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-3xl text-[#2a2420] font-light mb-2">AI Skin Analysis</h1>
          <p className="text-[#5a5450] font-light text-sm">Upload a clear photo of your face for a personalised skin report</p>
        </div>

        {/* Photo guidelines */}
        <div className="bg-white rounded-2xl p-5 mb-5 border border-[#e8e6e3]/30 shadow-sm">
          <h3 className="text-sm text-[#2a2420] font-light mb-3 flex items-center gap-2"><Zap size={14} className="text-[#8b7355]" /> For best results</h3>
          <div className="grid grid-cols-2 gap-2">
            {PHOTO_GUIDELINES.map((g, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#5a5450] font-light">
                <CheckCircle size={12} className="text-[#8b7355] mt-0.5 shrink-0" /> {g}
              </div>
            ))}
          </div>
        </div>

        {/* Camera / Upload area */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e6e3]/30 overflow-hidden mb-5">
          {capturedImage ? (
            <div className="relative">
              <img src={capturedImage} alt="Captured" className="w-full max-h-80 object-cover" />
              <button onClick={() => { setCapturedImage(null); setCapturedFile(null); stopCamera(); }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white">
                <X size={16} className="text-[#2a2420]" />
              </button>
              {imageQuality === "poor" && (
                <div className="absolute bottom-3 left-3 right-3 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-amber-700 font-light">
                  <AlertTriangle size={12} /> Low resolution — results may be less accurate
                </div>
              )}
              {imageQuality === "good" && (
                <div className="absolute bottom-3 left-3 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs text-green-700 font-light">
                  <CheckCircle size={12} /> Great photo quality
                </div>
              )}
            </div>
          ) : cameraActive ? (
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full max-h-80 object-cover" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <button onClick={capturePhoto} className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#8b7355]">
                  <Camera size={22} className="text-[#8b7355]" />
                </button>
                <button onClick={stopCamera} className="w-10 h-10 bg-white/80 rounded-full shadow flex items-center justify-center">
                  <X size={16} className="text-[#2a2420]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <ImageIcon size={40} className="text-[#8b7355]/30 mx-auto mb-4" />
              <p className="text-[#5a5450] font-light text-sm mb-6">No photo selected</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={startCamera} className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full text-sm font-light hover:shadow-lg transition-all">
                  <Camera size={16} /> Use Camera
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 px-5 py-3 border border-[#e8e6e3] text-[#5a5450] rounded-full text-sm font-light hover:bg-[#f8f6f3] transition-all">
                  <Upload size={16} /> Upload Photo
                </button>
              </div>
            </div>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

        {capturedImage && (
          <button onClick={() => setStep("questionnaire")}
            className="w-full py-4 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-2xl text-base font-light flex items-center justify-center gap-2 hover:shadow-xl transition-all shadow-lg">
            <Sparkles size={18} /> Continue to Analysis
          </button>
        )}
      </div>
    </div>
  );
}