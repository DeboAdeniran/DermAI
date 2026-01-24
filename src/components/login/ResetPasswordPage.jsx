import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  AlertTriangle,
  Menu,
  X,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password reset successful");
    setIsSuccess(true);
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (password.length < 10)
      return { strength: 50, label: "Fair", color: "bg-yellow-500" };
    if (password.length < 12)
      return { strength: 75, label: "Good", color: "bg-blue-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <div className="max-w-md w-full">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8b7355]/10 rounded-full mb-4">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-3">
                  Reset Your Password
                </h1>
                <p className="text-[#5a5450]">
                  Choose a strong password to protect your account
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm text-[#2a2420] mb-2"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all pr-12"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355] hover:text-[#2a2420]"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#5a5450]">
                            Password strength:
                          </span>
                          <span
                            className={`text-xs ${
                              passwordStrength.strength === 100
                                ? "text-green-600"
                                : passwordStrength.strength === 75
                                  ? "text-blue-600"
                                  : passwordStrength.strength === 50
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                          >
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-[#e8e6e3] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${passwordStrength.strength}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm text-[#2a2420] mb-2"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all pr-12"
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355] hover:text-[#2a2420]"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-[#f8f6f3] p-4 rounded-xl">
                    <p className="text-xs text-[#2a2420] mb-2">
                      Password must contain:
                    </p>
                    <ul className="space-y-1 text-xs text-[#5a5450]">
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-[#e8e6e3]"}`}
                        ></span>
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-[#e8e6e3]"}`}
                        ></span>
                        One uppercase letter (recommended)
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-[#e8e6e3]"}`}
                        ></span>
                        One number (recommended)
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*]/.test(formData.password) ? "bg-green-500" : "bg-[#e8e6e3]"}`}
                        ></span>
                        One special character (recommended)
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all hover:scale-[1.02]"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-3">
                  Password Reset Successful!
                </h1>
                <p className="text-[#5a5450]">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <button
                  onClick={() => navigateToPage("/login")}
                  className="w-full px-6 py-3.5 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all hover:scale-[1.02]"
                >
                  Continue to Sign In
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[#5a5450]">
                    Remember to use your new password when signing in
                  </p>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-6 bg-[#8b7355]/10 border border-[#8b7355]/20 rounded-2xl p-4">
                <div className="flex gap-3">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="#8b7355"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 mt-0.5"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div>
                    <p className="text-sm text-[#2a2420] mb-1">Security Tip</p>
                    <p className="text-xs text-[#5a5450]">
                      If you didn't request this password change, please contact
                      our support team immediately.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
