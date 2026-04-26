import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginPage as AELoginPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";
const LOGO_URL = import.meta.env.VITE_APP_LOGO_URL || "";

export default function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  return (
    <AELoginPage
      appName={APP_NAME}
      logoSrc={LOGO_URL || undefined}
      emailVerified={params.get("email_verified") === "1"}
      onSuccess={() => navigate("/dashboard")}
      onForgot={() => navigate("/forgot-password")}
      onSignup={() => navigate("/signup")}
    />
  );
}
