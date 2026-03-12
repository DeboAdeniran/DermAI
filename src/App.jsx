/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getToken, setToken } from "./services/api";

// Public pages
import { HomePage } from "./components/Home/HomePage";
import { SignupPage } from "./components/signup/SignupPage";
import { LoginPage } from "./components/login/LoginPage";
import { ForgotPasswordPage } from "./components/login/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/login/ResetPasswordPage";
import { PrivacyPolicyPage } from "./components/legal/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/legal/TermsOfServicePage";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { Disclaimer } from "./components/legal/Disclaimer";

// Auth-required pages
import { OnboardingPage } from "./components/onboarding/OnboardingPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { AnalysisPage } from "./components/analysispage/AnalysisPage";
import { ResultsPage } from "./components/resultspage/Resultspage";
import ProductsPage from "./components/productpage/ProductsPage";
import { RoutinePage } from "./components/routine/RoutinePage";
import { RoutineHistoryPage } from "./components/routine/RoutineHistoryPage";
import { LearnPage } from "./components/learn/LearnPage";
import { SettingsPage } from "./components/settings/SettingsPage";

// ─── Email Verification Page ──────────────────────────────────────────────────
import { VerifyEmailPage } from "./components/auth/VerifyEmailPage";

// ─── PrivateRoute — redirects to /login if not authenticated ─────────────────
function PrivateRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// ─── OAuthLanding — captures ?token= from Google OAuth redirect ──────────────
// This wraps pages that Google OAuth may redirect to (/dashboard, /onboarding)
function OAuthLanding({ children }) {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      // Clean up URL without reload
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ──────────────────────────────────────────────────────── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* ── Auth-required ───────────────────────────────────────────────── */}
        {/* OAuthLanding wraps onboarding + dashboard to capture Google OAuth ?token= */}
        <Route
          path="/onboarding"
          element={
            <OAuthLanding>
              <PrivateRoute>
                <OnboardingPage />
              </PrivateRoute>
            </OAuthLanding>
          }
        />
        <Route
          path="/dashboard"
          element={
            <OAuthLanding>
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            </OAuthLanding>
          }
        />
        <Route
          path="/analysis"
          element={
            <PrivateRoute>
              <AnalysisPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <ResultsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/routine"
          element={
            <PrivateRoute>
              <RoutinePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/routine-history"
          element={
            <PrivateRoute>
              <RoutineHistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <PrivateRoute>
              <LearnPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
