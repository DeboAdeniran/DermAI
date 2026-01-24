import { useState, useRef, useEffect } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  Camera,
  Upload,
  X,
  Check,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  Sun,
  Droplets,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Constants
const IMAGE_QUALITY_THRESHOLD = { width: 800, height: 800 };
const ANALYSIS_PROGRESS_INTERVAL = 100;
const ANALYSIS_PROGRESS_INCREMENT = 2;

const SKIN_CONCERNS = [
  "Acne",
  "Dark Spots",
  "Dryness",
  "Oiliness",
  "Wrinkles",
  "Sensitivity",
  "Dullness",
  "Large Pores",
];

const SUN_EXPOSURE_LEVELS = ["Minimal", "Moderate", "High", "Very High"];
const CLIMATE_TYPES = ["Very Dry", "Dry", "Moderate", "Humid", "Very Humid"];

const PHOTO_GUIDELINES = [
  "Natural lighting (near a window)",
  "Clean face with no makeup",
  "Face directly towards camera",
  "High resolution (at least 800x800px)",
];

const ANALYSIS_BENEFITS = [
  {
    title: "AI Skin Analysis",
    description: "Advanced detection of skin type, tone, and concerns",
  },
  {
    title: "Personalized Products",
    description: "Curated recommendations from Nigerian retailers",
  },
  {
    title: "Custom Routine",
    description: "Step-by-step skincare routine tailored for you",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your skin's improvement over time",
  },
];

// Image Quality Checker
const ImageQualityChecker = {
  check: (img) => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    return width >= IMAGE_QUALITY_THRESHOLD.width &&
      height >= IMAGE_QUALITY_THRESHOLD.height
      ? "good"
      : "poor";
  },
};

// Camera Service
const CameraService = {
  start: async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Unable to access camera. Please check permissions or upload an image instead.",
      );
      return false;
    }
  },

  stop: (videoRef) => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  },

  capture: (videoRef) => {
    if (!videoRef.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      return canvas.toDataURL("image/jpeg");
    }
    return null;
  },
};

// File Handler
const FileHandler = {
  read: (file, onLoad) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        onLoad(result);
      };
      reader.readAsDataURL(file);
    }
  },
};

// Analysis Progress Component
function AnalysisStep({ label, isActive, isComplete }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${
          isComplete
            ? "bg-linear-to-br from-green-500 to-green-600"
            : isActive
              ? "bg-linear-to-br from-[#8b7355] to-[#6d5a43]"
              : "bg-[#e8e6e3]"
        }`}
      >
        {isComplete ? (
          <Check className="text-white" size={16} />
        ) : isActive ? (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        ) : null}
      </div>
      <span
        className={`text-sm font-light ${
          isComplete || isActive ? "text-[#2a2420]" : "text-[#5a5450]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Analysis Progress Screen Component
function AnalysisProgressScreen({ analysisProgress }) {
  const ANALYSIS_STEPS = [
    { label: "Detecting skin tone", threshold: 20, completeAt: 40 },
    { label: "Identifying concerns", threshold: 40, completeAt: 60 },
    { label: "Matching products", threshold: 60, completeAt: 80 },
    { label: "Generating recommendations", threshold: 80, completeAt: 100 },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef] flex items-center justify-center p-4">
      <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-[2.5rem] shadow-2xl p-8 sm:p-12 max-w-md w-full border border-[#e8e6e3]/30">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-[#e8e6e3]"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-[#8b7355] transition-all duration-300"
              style={{
                clipPath: `polygon(0 0, ${analysisProgress}% 0, ${analysisProgress}% 100%, 0 100%)`,
                transform: "rotate(-90deg)",
                transformOrigin: "center",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-[#8b7355] animate-pulse" size={32} />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl text-[#2a2420] mb-3 font-light">
            Analyzing Your Skin
          </h2>
          <p className="text-[#5a5450] mb-6 font-light">
            Our AI is examining your unique skin characteristics
          </p>

          <div className="bg-white/60 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#5a5450] font-light">
                Progress
              </span>
              <span className="text-sm text-[#8b7355] font-light">
                {analysisProgress}%
              </span>
            </div>
            <div className="w-full bg-[#e8e6e3] rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-[#8b7355] to-[#6d5a43] h-full rounded-full transition-all duration-300 shadow-md"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3 text-left">
            {ANALYSIS_STEPS.map((step, index) => (
              <AnalysisStep
                key={index}
                label={step.label}
                isActive={analysisProgress > step.threshold}
                isComplete={analysisProgress > step.completeAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Image Quality Indicator Component
function ImageQualityIndicator({ quality }) {
  if (!quality) return null;

  const isGood = quality === "good";

  return (
    <div
      className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
        isGood
          ? "bg-green-50 border-2 border-green-200"
          : "bg-yellow-50 border-2 border-yellow-200"
      }`}
    >
      {isGood ? (
        <>
          <CheckCircle className="text-green-600" size={24} />
          <div className="flex-1">
            <p className="text-sm text-green-800 font-light">
              <strong className="font-normal">Great photo quality!</strong> Your
              image is perfect for analysis.
            </p>
          </div>
        </>
      ) : (
        <>
          <AlertTriangle className="text-yellow-600" size={24} />
          <div className="flex-1">
            <p className="text-sm text-yellow-800 font-light">
              <strong className="font-normal">Low resolution detected.</strong>{" "}
              For best results, upload a higher quality image.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Photo Guidelines Component
function PhotoGuidelinesCard({ showExamples, onToggle }) {
  return (
    <>
      <button
        onClick={onToggle}
        className="mt-6 text-sm text-[#8b7355] hover:underline font-light flex items-center gap-1 mx-auto"
      >
        <AlertCircle size={16} />
        Tips for best results
      </button>

      {showExamples && (
        <div className="mt-4 p-5 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100">
          <h4 className="text-sm text-blue-900 mb-3 font-light flex items-center gap-2">
            <CheckCircle size={16} />
            Photo Guidelines:
          </h4>
          <ul className="space-y-2 text-sm text-blue-800 font-light">
            {PHOTO_GUIDELINES.map((guideline, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={16} className="shrink-0 mt-0.5 text-blue-600" />
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

// Upload Zone Component
function UploadZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onCameraStart,
}) {
  const fileInputRef = useRef(null);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative border-3 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all ${
        isDragging
          ? "border-[#8b7355] bg-[#8b7355]/5"
          : "border-[#e8e6e3] hover:border-[#8b7355]/50"
      }`}
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
        <Upload className="text-[#8b7355]" size={32} />
      </div>
      <h3 className="text-lg text-[#2a2420] mb-2 font-light">
        Drop your image here
      </h3>
      <p className="text-sm text-[#5a5450] mb-6 font-light">
        or click to browse files
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2 font-light"
        >
          <Upload size={18} />
          Choose File
        </button>
        <button
          onClick={onCameraStart}
          className="px-6 py-3 border-2 border-[#8b7355] text-[#8b7355] rounded-full hover:bg-[#8b7355] hover:text-white transition-all flex items-center justify-center gap-2 font-light"
        >
          <Camera size={18} />
          Use Camera
        </button>
      </div>
    </div>
  );
}

// Camera View Component
function CameraView({ videoRef, onCapture, onCancel }) {
  return (
    <div className="mt-6 relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded-2xl shadow-lg"
      />
      <div className="mt-4 flex gap-3 justify-center">
        <button
          onClick={onCapture}
          className="px-6 py-3 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all flex items-center gap-2 font-light"
        >
          <Camera size={18} />
          Capture
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2 font-light"
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </div>
  );
}

// Uploaded Image Preview Component
function UploadedImagePreview({ image, quality, onRemove }) {
  return (
    <div>
      <div className="relative">
        <img
          src={image}
          alt="Uploaded"
          className="w-full rounded-2xl shadow-lg"
        />
        <button
          onClick={onRemove}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 transition-all"
        >
          <X className="text-red-500" size={20} />
        </button>
      </div>
      <ImageQualityIndicator quality={quality} />
    </div>
  );
}

// Questionnaire Component
function SkinQuestionnaire({
  concerns,
  onConcernToggle,
  sunExposure,
  onSunExposureChange,
  humidity,
  onHumidityChange,
  recentChanges,
  onRecentChangesChange,
  productReactions,
  onProductReactionsChange,
  onSubmit,
}) {
  return (
    <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-2xl p-6 sm:p-8 border border-[#e8e6e3]/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center">
          <Sparkles size={20} className="text-[#8b7355]" />
        </div>
        <div>
          <h2 className="text-xl text-[#2a2420] font-light">Tell Us More</h2>
          <p className="text-sm text-[#5a5450] font-light">
            Help us personalize your recommendations
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Primary Concerns */}
        <div>
          <label className="block text-sm text-[#2a2420] mb-3 font-light">
            What are your main skin concerns?
          </label>
          <div className="flex flex-wrap gap-2">
            {SKIN_CONCERNS.map((concern) => (
              <button
                key={concern}
                onClick={() => onConcernToggle(concern)}
                className={`px-4 py-2 rounded-full text-sm transition-all font-light ${
                  concerns.includes(concern)
                    ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                    : "bg-white/60 text-[#5a5450] border-2 border-[#e8e6e3] hover:border-[#8b7355]"
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>

        {/* Sun Exposure */}
        <div>
          <label className="block text-sm text-[#2a2420] mb-3 font-light flex items-center gap-2">
            <Sun size={16} className="text-[#8b7355]" />
            How much sun exposure do you get daily?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUN_EXPOSURE_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => onSunExposureChange(level)}
                className={`px-4 py-3 rounded-xl text-sm transition-all font-light ${
                  sunExposure === level
                    ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                    : "bg-white/60 text-[#5a5450] border-2 border-[#e8e6e3] hover:border-[#8b7355]"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Climate/Humidity */}
        <div>
          <label className="block text-sm text-[#2a2420] mb-3 font-light flex items-center gap-2">
            <Droplets size={16} className="text-[#8b7355]" />
            What's your climate like?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CLIMATE_TYPES.map((climate) => (
              <button
                key={climate}
                onClick={() => onHumidityChange(climate)}
                className={`px-4 py-3 rounded-xl text-sm transition-all font-light ${
                  humidity === climate
                    ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-md"
                    : "bg-white/60 text-[#5a5450] border-2 border-[#e8e6e3] hover:border-[#8b7355]"
                }`}
              >
                {climate}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Changes */}
        <div>
          <label className="block text-sm text-[#2a2420] mb-3 font-light">
            Any recent changes in your skin?
          </label>
          <textarea
            value={recentChanges}
            onChange={(e) => onRecentChangesChange(e.target.value)}
            placeholder="E.g., new breakouts, increased dryness, sensitivity..."
            rows={3}
            className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light placeholder:text-[#5a5450]/50 resize-none"
          />
        </div>

        {/* Product Reactions */}
        <div>
          <label className="block text-sm text-[#2a2420] mb-3 font-light flex items-center gap-2">
            <Zap size={16} className="text-[#8b7355]" />
            Any known product sensitivities or allergies?
          </label>
          <textarea
            value={productReactions}
            onChange={(e) => onProductReactionsChange(e.target.value)}
            placeholder="E.g., fragrances, essential oils, specific ingredients..."
            rows={3}
            className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light placeholder:text-[#5a5450]/50 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="mt-8 w-full px-8 py-4 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-2xl transition-all flex items-center justify-center gap-2 text-lg font-light"
      >
        <Sparkles size={20} />
        Analyze My Skin
      </button>
    </div>
  );
}

// Benefits Sidebar Component
function BenefitsSidebar() {
  return (
    <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-2xl p-6 border border-[#e8e6e3]/30 sticky top-24">
      <h3 className="text-lg text-[#2a2420] mb-4 font-light">
        What You'll Get
      </h3>
      <div className="space-y-4">
        {ANALYSIS_BENEFITS.map((benefit, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center shrink-0">
              <CheckCircle className="text-[#8b7355]" size={20} />
            </div>
            <div>
              <h4 className="text-sm text-[#2a2420] mb-1 font-light">
                {benefit.title}
              </h4>
              <p className="text-xs text-[#5a5450] font-light">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
        <p className="text-xs text-blue-800 font-light">
          <strong className="font-normal">Privacy First:</strong> Your photos
          are processed securely and never shared without your consent.
        </p>
      </div>
    </div>
  );
}

// Main Component
export function AnalysisPage() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageQuality, setImageQuality] = useState(null);
  const [showExamples, setShowExamples] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);

  // Questionnaire state
  const [concerns, setConcerns] = useState([]);
  const [recentChanges, setRecentChanges] = useState("");
  const [sunExposure, setSunExposure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [productReactions, setProductReactions] = useState("");

  const mockUser = {
    name: "Ada",
  };

  useEffect(() => {
    return () => {
      CameraService.stop(videoRef);
    };
  }, []);

  const handleImageLoad = (imageData) => {
    setUploadedImage(imageData);

    const img = new Image();
    img.onload = () => setImageQuality(ImageQualityChecker.check(img));
    img.src = imageData;
  };

  const handleFileSelect = (file) => {
    FileHandler.read(file, handleImageLoad);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleCameraStart = async () => {
    const success = await CameraService.start(videoRef);
    setIsCameraActive(success);
  };

  const handleCameraStop = () => {
    CameraService.stop(videoRef);
    setIsCameraActive(false);
  };

  const handlePhotoCapture = () => {
    const imageData = CameraService.capture(videoRef);
    if (imageData) {
      handleImageLoad(imageData);
      handleCameraStop();
    }
  };

  const handleConcernToggle = (concern) => {
    setConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern],
    );
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/results");
          }, 1000);
          return 100;
        }
        return prev + ANALYSIS_PROGRESS_INCREMENT;
      });
    }, ANALYSIS_PROGRESS_INTERVAL);
  };

  if (isAnalyzing) {
    return <AnalysisProgressScreen analysisProgress={analysisProgress} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <AuthNav
        currentPage="analysis"
        userName={mockUser.name}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2a2420] font-light">
                New Skin Analysis
              </h1>
              <p className="text-sm sm:text-base text-[#5a5450] font-light">
                Upload a clear photo for personalized recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-2xl p-6 sm:p-8 border border-[#e8e6e3]/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#8b7355]/10 flex items-center justify-center">
                  <ImageIcon size={20} className="text-[#8b7355]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#2a2420] font-light">
                    Upload Your Photo
                  </h2>
                  <p className="text-sm text-[#5a5450] font-light">
                    Take or upload a clear selfie
                  </p>
                </div>
              </div>

              {!uploadedImage ? (
                <div>
                  <UploadZone
                    isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onFileSelect={handleFileSelect}
                    onCameraStart={handleCameraStart}
                  />

                  {isCameraActive && (
                    <CameraView
                      videoRef={videoRef}
                      onCapture={handlePhotoCapture}
                      onCancel={handleCameraStop}
                    />
                  )}

                  <PhotoGuidelinesCard
                    showExamples={showExamples}
                    onToggle={() => setShowExamples(!showExamples)}
                  />
                </div>
              ) : (
                <UploadedImagePreview
                  image={uploadedImage}
                  quality={imageQuality}
                  onRemove={() => {
                    setUploadedImage(null);
                    setImageQuality(null);
                  }}
                />
              )}
            </div>

            {/* Questionnaire */}
            {uploadedImage && (
              <SkinQuestionnaire
                concerns={concerns}
                onConcernToggle={handleConcernToggle}
                sunExposure={sunExposure}
                onSunExposureChange={setSunExposure}
                humidity={humidity}
                onHumidityChange={setHumidity}
                recentChanges={recentChanges}
                onRecentChangesChange={setRecentChanges}
                productReactions={productReactions}
                onProductReactionsChange={setProductReactions}
                onSubmit={handleAnalysisStart}
              />
            )}
          </div>

          {/* Sidebar - Benefits */}
          <div className="lg:col-span-1">
            <BenefitsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
