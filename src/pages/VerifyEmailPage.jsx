import { useNavigate, useSearchParams } from "react-router-dom";
import { VerifyEmailPage as AEVerifyEmailPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Email is stored in sessionStorage by SignupPage (optional enhancement)
  const email  = sessionStorage.getItem("ae_pending_email") || "";
  const status = params.get("status") || "";
  const msg    = params.get("msg")    || "";

  return (
    <AEVerifyEmailPage
      appName={APP_NAME}
      email={email}
      status={status}
      errorMsg={msg}
      onLogin={() => navigate("/login")}
    />
  );
}
