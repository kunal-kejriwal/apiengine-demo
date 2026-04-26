import { useNavigate } from "react-router-dom";
import { SignupPage as AESignupPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";
const LOGO_URL = import.meta.env.VITE_APP_LOGO_URL || "";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <AESignupPage
      appName={APP_NAME}
      logoSrc={LOGO_URL || undefined}
      onSuccess={() => navigate("/verify-email")}
      onLogin={() => navigate("/login")}
    />
  );
}
