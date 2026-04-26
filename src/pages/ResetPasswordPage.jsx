import { useNavigate } from "react-router-dom";
import { ResetPasswordPage as AEResetPasswordPage } from "@apiengine/react-sdk";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  return (
    <AEResetPasswordPage
      onSuccess={() => navigate("/login")}
    />
  );
}
