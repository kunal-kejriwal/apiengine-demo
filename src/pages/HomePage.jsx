import { useNavigate } from "react-router-dom";
import {
  AppNavbar,
  AppHero,
  Features,
  JsonDbForm,
  CustomObjectForm,
  StandardObjectForm,
} from "@apiengine/react-sdk";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--ae-bg, #0f172a)", minHeight: "100vh", fontFamily: "var(--ae-font)" }}>

      {/* Auth-aware navbar — adapts automatically to guest vs logged-in */}
      <AppNavbar
        navItems={[
          { label: "Home",    href: "/" },
          { label: "Pricing", href: "/pricing" },
          { label: "About",   href: "/about" },
        ]}
        onNavigate={navigate}
      />

      {/* Auth-aware hero — CTA switches based on user state */}
      <AppHero
        headline={{
          guest: `Welcome to ${import.meta.env.VITE_APP_NAME || "My App"}`,
          user:  "You're in — welcome back!",
        }}
        subheadline={{
          guest: "Sign up in seconds. No credit card required.",
          user:  "Head to your dashboard to pick up where you left off.",
        }}
        guestCtaText="Create account"
        guestCtaPath="/signup"
        userCtaText="Go to Dashboard"
        userCtaPath="/dashboard"
        secondaryCta={{ text: "Sign in", href: "/login" }}
        badge="APIEngine SDK v0.8"
        onNavigate={navigate}
      />

      {/* Feature grid — updated to include v0.8 additions */}
      <Features
        config={{
          title: "Everything in one SDK",
          subtitle: "Auth, data, UI components, and a developer safety net — zero boilerplate.",
          columns: 3,
          items: [
            { icon: "🔐", title: "JWT Auth",           description: "Login, signup, and automatic silent token refresh." },
            { icon: "✉️", title: "Email Verification",  description: "6-digit code flow — only verified users get in."    },
            { icon: "🛡️", title: "Protected Routes",    description: "Wrap any route with <ProtectedRoute> and redirect guests." },
            { icon: "🧭", title: "Auth-Aware Navbar",   description: "<AppNavbar> shows Login/Signup for guests, avatar + Sign Out for users." },
            { icon: "🎯", title: "Blueprint Mode",      description: "Any undefined route shows a guided 3-step scaffold instead of a blank 404." },
            { icon: "🗃️", title: "Live Data Forms",     description: "Push records to JSON DB, Custom Objects, or Standard Objects in one line." },
          ],
        }}
      />

      {/* ── Live form demos ──────────────────────────────────────────── */}
      <section style={{ padding: "64px 24px 80px", maxWidth: 1040, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.12)",
            color: "#818cf8",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 999,
            padding: "4px 14px",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Live Demos
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ae-text, #f1f5f9)", margin: "0 0 8px" }}>
            Push records to your backend
          </h2>
          <p style={{ color: "var(--ae-text-muted, #94a3b8)", fontSize: 14, margin: 0 }}>
            Submit any form below — the record appears in your APIEngine dashboard instantly.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>

          {/* Form A — JSON DB (any slug, any key-value data) */}
          <JsonDbForm
            allowSlugInput
            defaultName="Demo record"
          />

          {/* Form B — Custom Object (pass your own field definitions) */}
          <CustomObjectForm
            slug="feedback"
            fields={[
              { name: "message",  label: "Message",  type: "textarea", required: true,
                hint: "Create a 'feedback' model in Custom Objects first." },
              { name: "rating",   label: "Rating (1–5)", type: "number" },
              { name: "category", label: "Category", type: "select",
                options: ["general", "bug", "feature", "praise"] },
            ]}
            submitLabel="Submit Feedback"
          />

          {/* Form C — Standard Object (fields are auto-generated from entity type) */}
          <StandardObjectForm
            entity="contacts"
            submitLabel="Create Contact"
          />

        </div>
      </section>

    </div>
  );
}
