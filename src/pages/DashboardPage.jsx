/**
 * Dashboard — protected page.
 * Demonstrates: useAuth, useStandardObject (contacts list), navigation to demos.
 */

import { useNavigate } from "react-router-dom";
import { useAuth, useStandardObject } from "@apiengine/react-sdk";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const { data: contacts, loading, error } = useStandardObject("contacts", { pageSize: 5 });

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  const card = {
    background: "var(--ae-surface)",
    border:     "1px solid var(--ae-border)",
    borderRadius: "var(--ae-radius-lg)",
    padding:    "28px",
    marginBottom: "24px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ae-bg)", padding: "40px 24px", fontFamily: "var(--ae-font)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ae-text)", margin: 0 }}>
              Dashboard
            </h1>
            <p style={{ color: "var(--ae-text-muted)", margin: "4px 0 0" }}>
              Welcome back, {user?.display_name || user?.email} 👋
            </p>
          </div>
          <button className="ae-btn ae-btn-secondary" onClick={handleLogout}>
            Sign out
          </button>
        </div>

        {/* Demo Nav */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {[
            { label: "JSON DB Demo",       path: "/demo/json-db",       icon: "🗃️" },
            { label: "Custom Schema Demo", path: "/demo/custom-schema", icon: "🧩" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{ ...card, cursor: "pointer", textAlign: "left", border: "1px solid var(--ae-border)" }}
            >
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{item.icon}</span>
              <p style={{ color: "var(--ae-text)", fontWeight: 600, margin: 0 }}>{item.label}</p>
              <p style={{ color: "var(--ae-text-muted)", fontSize: 13, margin: "4px 0 0" }}>
                Open demo →
              </p>
            </button>
          ))}
        </div>

        {/* Recent Contacts (Standard Object demo) */}
        <div style={card}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--ae-text)", marginBottom: 16 }}>
            Recent Contacts
          </h2>
          <p style={{ fontSize: 13, color: "var(--ae-text-muted)", marginBottom: 20 }}>
            Powered by <code style={{ background: "var(--ae-surface-2)", padding: "2px 6px", borderRadius: 4, fontFamily: "var(--ae-font-mono)", fontSize: 12 }}>useStandardObject("contacts")</code>
          </p>

          {loading && (
            <div className="ae-loading" style={{ padding: 24 }}>
              <div className="ae-spinner" /> Loading contacts…
            </div>
          )}
          {error && (
            <div className="ae-alert ae-alert--error">
              Could not load contacts. Make sure you have contacts in your APIEngine account.
            </div>
          )}
          {!loading && !error && contacts.length === 0 && (
            <p style={{ color: "var(--ae-text-muted)", fontSize: 14 }}>No contacts yet.</p>
          )}
          {!loading && contacts.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--ae-border)" }}>
                  {["Name", "Email", "Phone"].map((h) => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--ae-text-muted)", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--ae-border)" }}>
                    <td style={{ padding: "10px 12px", color: "var(--ae-text)" }}>
                      {[c.first_name, c.last_name].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td style={{ padding: "10px 12px", color: "var(--ae-text-muted)" }}>{c.email || "—"}</td>
                    <td style={{ padding: "10px 12px", color: "var(--ae-text-muted)" }}>{c.phone || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
