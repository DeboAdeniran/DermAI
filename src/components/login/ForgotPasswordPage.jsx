import { useState } from "react";
import { Lock, ArrowLeft, CheckCircle, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  const handleResend = () => {
    console.log("Resending password reset email to:", email);
    alert("Reset link sent again! Check your inbox.");
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
                  className="flex items-center gap-2 px-4 py-2 text-[#5a5450] hover:text-[#2a2420] rounded-full hover:bg-[#f8f6f3] transition-all font-light text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#e8e6e3] text-[#2a2420] rounded-xl hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all font-light"
                >
                  <ArrowLeft size={18} className="text-[#8b7355]" />
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        <div className="max-w-md w-full">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8b7355]/10 rounded-full mb-4">
                  <Lock className="w-6 h-6 text-[#8b7355]" />
                </div>
                <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-3">
                  Forgot Password?
                </h1>
                <p className="text-[#5a5450]">
                  No worries! Enter your email address and we'll send you a link
                  to reset your password.
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-[#2a2420] mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-[#f8f6f3] rounded-xl border border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all hover:scale-[1.02]"
                  >
                    Send Reset Link
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigateToPage("/login")}
                    className="text-[#8b7355] hover:text-[#2a2420] transition-colors flex items-center gap-2 justify-center mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8b7355]/10 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-[#8b7355]" />
                </div>
                <h1 className="text-3xl sm:text-4xl text-[#2a2420] mb-3">
                  Check Your Email
                </h1>
                <p className="text-[#5a5450] mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-[#2a2420]">{email}</p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="bg-[#f8f6f3] p-4 rounded-xl">
                    <p className="text-sm text-[#5a5450] mb-3">
                      <strong className="text-[#2a2420]">What's next?</strong>
                    </p>
                    <ol className="space-y-2 text-sm text-[#5a5450]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#8b7355] shrink-0 mt-0.5">
                          1.
                        </span>
                        <span>Check your inbox for an email from DermAI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8b7355] shrink-0 mt-0.5">
                          2.
                        </span>
                        <span>Click the reset password link in the email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#8b7355] shrink-0 mt-0.5">
                          3.
                        </span>
                        <span>Create a new password for your account</span>
                      </li>
                    </ol>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-[#5a5450] text-center mb-3">
                      Didn't receive the email?
                    </p>
                    <button
                      onClick={handleResend}
                      className="w-full px-6 py-3 border-2 border-[#8b7355] text-[#8b7355] rounded-xl hover:bg-[#8b7355] hover:text-white transition-all"
                    >
                      Resend Email
                    </button>
                  </div>

                  {/* Demo Link - In production, this would be sent via email */}
                  <div className="pt-4 border-t border-[#e8e6e3]">
                    <p className="text-xs text-[#8b7355] text-center mb-3">
                      Demo: Click below to simulate the email link
                    </p>
                    <button
                      onClick={() => navigateToPage("/reset-password")}
                      className="w-full px-6 py-3 bg-[#8b7355] text-white rounded-xl hover:bg-[#2a2420] transition-all text-sm"
                    >
                      Go to Reset Password Page →
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[#e8e6e3]">
                    <button
                      onClick={() => navigateToPage("/login")}
                      className="w-full px-6 py-3 bg-[#2a2420] text-white rounded-xl hover:bg-[#3a3430] transition-all"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 pt-6 border-t border-[#e8e6e3]">
                  <p className="text-xs text-[#8b7355] text-center">
                    Check your spam folder if you don't see the email within a
                    few minutes
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Contact Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#8b7355]">
              Need help?{" "}
              <button
                onClick={() => {
                  navigateToPage("/home");
                  setTimeout(() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="underline hover:text-[#2a2420] transition-colors"
              >
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
