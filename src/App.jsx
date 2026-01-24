/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/Home/HomePage";
import { SignupPage } from "./components/signup/SignupPage";
import { LoginPage } from "./components/login/LoginPage";
import { ForgotPasswordPage } from "./components/login/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/login/ResetPasswordPage";
import { OnboardingPage } from "./components/onboarding/OnboardingPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { AnalysisPage } from "./components/analysispage/AnalysisPage";
import { ResultsPage } from "./components/analysispage/ResultsPage";
import { ProductsPage } from "./components/productpage/ProductsPage";
import { RoutinePage } from "./components/routine/RoutinePage";
import { RoutineHistoryPage } from "./components/routine/RoutineHistoryPage";
import { LearnPage } from "./components/learn/LearnPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { PrivacyPolicyPage } from "./components/legal/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/legal/TermsOfServicePage";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { Disclaimer } from "./components/legal/Disclaimer";

function App() {
  // const [currentPage, setCurrentPage] = useState("home");

  // useEffect(() => {
  //   const handleNavigation = (event) => {
  //     const customEvent = event;
  //     setCurrentPage(customEvent.detail);
  //   };

  //   window.addEventListener("navigate", handleNavigation);

  //   return () => {
  //     window.removeEventListener("navigate", handleNavigation);
  //   };
  // }, []);

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case "home":
  //       return <HomePage />;
  //     case "signup":
  //       return <SignupPage />;
  //     case "login":
  //       return <LoginPage />;
  //     case "forgot-password":
  //       return <ForgotPasswordPage />;
  //     case "reset-password":
  //       return <ResetPasswordPage />;
  //     case "onboarding":
  //       return <OnboardingPage />;
  //     case "dashboard":
  //       return <DashboardPage />;
  //     case "analysis":
  //       return <AnalysisPage />;
  //     case "results":
  //       return <ResultsPage />;
  //     case "products":
  //       return <ProductsPage />;
  //     case "routine":
  //       return <RoutinePage />;
  //     case "routine-history":
  //       return <RoutineHistoryPage />;
  //     case "learn":
  //       return <LearnPage />;
  //     case "feedback":
  //       return <FeedbackPage />;
  //     case "settings":
  //       return <SettingsPage />;
  //     case "privacy":
  //       return <PrivacyPolicyPage />;
  //     case "terms":
  //       return <TermsOfServicePage />;
  //     case "cookies":
  //       return <CookiePolicy />;
  //     case "disclaimer":
  //       return <Disclaimer />;
  //     default:
  //       return <HomePage />;
  //   }
  // };
  // return <>{renderPage()}</>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/routine" element={<RoutinePage />} />
          <Route path="/routine-history" element={<RoutineHistoryPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
