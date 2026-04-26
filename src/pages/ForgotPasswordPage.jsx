import { useNavigate } from "react-router-dom";
import { ForgotPasswordPage as AEForgotPasswordPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  return (
    <AEForgotPasswordPage
      appName={APP_NAME}
      onBack={() => navigate("/login")}
    />
  );
}
