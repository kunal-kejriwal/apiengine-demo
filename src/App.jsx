import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, BlueprintFallback } from "@apiengine/react-sdk";

import LoginPage          from "./pages/LoginPage";
import SignupPage         from "./pages/SignupPage";
import VerifyEmailPage    from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage  from "./pages/ResetPasswordPage";
import DashboardPage      from "./pages/DashboardPage";
import HomePage           from "./pages/HomePage";
import PricingPage        from "./pages/PricingPage";
import AboutPage          from "./pages/AboutPage";
import BlogPage           from "./pages/BlogPage";
import JsonDbDemo         from "./pages/JsonDbDemo";
import CustomSchemaDemo   from "./pages/CustomSchemaDemo";

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/"               element={<HomePage />} />
      <Route path="/pricing"        element={<PricingPage />} />
      <Route path="/about"          element={<AboutPage />} />
      <Route path="/blog"           element={<BlogPage />} />
      <Route path="/blog/:slug"     element={<BlogPage />} />

      {/* Auth */}
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/signup"          element={<SignupPage />} />
      <Route path="/verify-email"    element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password"  element={<ResetPasswordPage />} />

      {/* Protected */}
      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route path="/dashboard"         element={<DashboardPage />} />
        <Route path="/demo/json-db"      element={<JsonDbDemo />} />
        <Route path="/demo/custom-schema" element={<CustomSchemaDemo />} />
      </Route>

      {/* Safety Net — shows Blueprint Mode for any undefined route */}
      <Route path="*" element={<BlueprintFallback />} />
    </Routes>
  );
}
