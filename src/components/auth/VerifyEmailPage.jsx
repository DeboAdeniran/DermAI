import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../../services/api";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }

    auth.verifyEmail(token)
      .then(() => {
        setStatus("success");
        setMessage("Your email has been verified! You can now log in.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Invalid or expired verification link. Please request a new one.");
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="mb-6 font-light text-3xl">
          <span className="text-[#2a2420]">derm</span><span className="text-[#8b7355]">AI</span>
        </div>

        {status === "loading" && (
          <>
            <Loader size={40} className="text-[#8b7355] animate-spin mx-auto mb-4" />
            <p className="text-[#5a5450] font-light">Verifying your email…</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl text-[#2a2420] font-light mb-3">Email Verified! ✨</h1>
            <p className="text-[#5a5450] font-light mb-6">{message}</p>
            <button onClick={() => navigate("/login")}
              className="w-full py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-2xl font-light hover:shadow-lg transition-all">
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl text-[#2a2420] font-light mb-3">Verification Failed</h1>
            <p className="text-[#5a5450] font-light mb-6">{message}</p>
            <button onClick={() => navigate("/login")}
              className="w-full py-3 bg-gradient-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-2xl font-light hover:shadow-lg transition-all">
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}