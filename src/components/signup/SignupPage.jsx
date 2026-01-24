import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Menu, X, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!acceptedTerms) {
      alert("Please accept the Terms of Service to continue");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle signup
    console.log("Signup:", formData);
    // Redirect to onboarding flow
    navigate("/onboarding");
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
    alert("Google OAuth integration would happen here");
  };

  const handleFacebookSignup = () => {
    console.log("Facebook signup");
    alert("Facebook OAuth integration would happen here");
  };

  const navigateToPage = (path, options = {}) => {
    navigate(path);

    if (options.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (options.closeMenu && options.setIsMenuOpen) {
      options.setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef] flex flex-col">
      {/* Enhanced Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-full">
            <div className="flex justify-between items-center h-14 px-4 sm:px-6">
              {/* Logo */}
              <button
                onClick={() => navigateToPage("/home")}
                className="flex items-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center group-hover:shadow-lg transition-all">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <span className="text-[#2a2420] font-light tracking-tight text-base">
                  <span className="text-[#2a2420]">derm</span>
                  <span className="text-[#8b7355]">AI</span>
                </span>
              </button>

              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => navigateToPage("/login")}
                  className="px-4 py-2 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
                >
                  Sign In
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-full hover:bg-[#f8f6f3] transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X size={22} strokeWidth={2} />
                ) : (
                  <Menu size={22} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm sm:hidden z-40 mt-20"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-24 left-4 right-4 sm:hidden z-50">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e8e6e3]/50 overflow-hidden">
              <div className="p-6">
                <div className="space-y-3">
                  <button
                    onClick={() => navigateToPage("/home")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#e8e6e3] text-[#2a2420] rounded-xl hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all font-light"
                  >
                    <ArrowLeft size={18} className="text-[#8b7355]" />
                    Back to Home
                  </button>

                  <button
                    onClick={() => navigateToPage("/login")}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-xl hover:shadow-xl transition-all font-light"
                  >
                    <LogIn size={18} />
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-3 font-light">
              Create your account
            </h1>
            <p className="text-[#5a5450] font-light">
              Start your personalized skincare journey today
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-2xl p-6 sm:p-8 border border-[#e8e6e3]/50">
            {/* Social Sign Up */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-[#e8e6e3] rounded-2xl hover:bg-[#f8f6f3] hover:shadow-md transition-all font-light"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-[#2a2420]">Continue with Google</span>
              </button>

              <button
                onClick={handleFacebookSignup}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-[#e8e6e3] rounded-2xl hover:bg-[#f8f6f3] hover:shadow-md transition-all font-light"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2">
                  <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                </svg>
                <span className="text-[#2a2420]">Continue with Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e8e6e3]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#8b7355] font-light">
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#2a2420] mb-2 font-light"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f6f3] rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all font-light"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#2a2420] mb-2 font-light"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#f8f6f3] rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all font-light"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-[#2a2420] mb-2 font-light"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all pr-12 font-light"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355] hover:text-[#2a2420] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-[#2a2420] mb-2 font-light"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#f8f6f3] rounded-2xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent transition-all pr-12 font-light"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355] hover:text-[#2a2420] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-[#e8e6e3] text-[#8b7355] focus:ring-[#8b7355] shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-[#5a5450] font-light"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/terms")}
                    className="text-[#8b7355] hover:text-[#2a2420] underline"
                  >
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/privacy")}
                    className="text-[#8b7355] hover:text-[#2a2420] underline"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3.5 bg-[#2a2420] text-white rounded-2xl hover:bg-[#3a3430] transition-all hover:shadow-lg mt-6 font-light"
              >
                Create Account
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-[#5a5450] font-light">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#8b7355] hover:text-[#2a2420] transition-colors font-light"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-sm text-[#8b7355] mt-6 font-light">
            By signing up, you agree to receive personalized skincare
            recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
