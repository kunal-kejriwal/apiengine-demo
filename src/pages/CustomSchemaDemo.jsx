/**
 * Custom Schema Demo
 * Demonstrates useCustomSchema to work with a custom object model.
 *
 * Pre-requisite: create a custom model with slug "inventory" in
 * APIEngine dashboard → Custom Objects → New Model. Add fields:
 *   - item_name  (text)
 *   - quantity   (number)
 *   - status     (text: "in_stock" | "low" | "out_of_stock")
 *
 * This page shows CRUD using useCustomSchema("inventory").
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomSchema } from "@apiengine/react-sdk";

const SCHEMA_SLUG = "inventory";

export default function CustomSchemaDemo() {
  const navigate = useNavigate();
  const { data: items, loading, error, create, update, remove } = useCustomSchema(SCHEMA_SLUG);

  const [form,    setForm]    = useState({ item_name: "", quantity: "", status: "in_stock" });
  const [saving,  setSaving]  = useState(false);
  const [editId,  setEditId]  = useState(null);

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const fields = { item_name: form.item_name, quantity: Number(form.quantity), status: form.status };
      if (editId) {
        await update(editId, fields);
        setEditId(null);
      } else {
        await create(fields);
      }
      setForm({ item_name: "", quantity: "", status: "in_stock" });
    } catch (err) {
      alert("Save failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditId(item.id);
    setForm({
      item_name: item.fields?.item_name ?? "",
      quantity:  item.fields?.quantity  ?? "",
      status:    item.fields?.status    ?? "in_stock",
    });
  }

  const card   = { background: "var(--ae-surface)", border: "1px solid var(--ae-border)", borderRadius: "var(--ae-radius-lg)", padding: 24 };
  const styles = { minHeight: "100vh", background: "var(--ae-bg)", padding: "40px 24px", fontFamily: "var(--ae-font)" };

  const statusColor = { in_stock: "var(--ae-success)", low: "var(--ae-warning)", out_of_stock: "var(--ae-error)" };

  return (
    <div style={styles}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", color: "var(--ae-text-muted)", cursor: "pointer", fontFamily: "var(--ae-font)", marginBottom: 24, fontSize: 14 }}>
          ← Back to dashboard
        </button>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ae-text)", marginBottom: 8 }}>Custom Schema Demo</h1>
        <p style={{ color: "var(--ae-text-muted)", marginBottom: 32, fontSize: 14 }}>
          Schema slug: <code style={{ background: "var(--ae-surface-2)", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>{SCHEMA_SLUG}</code>
          {" "}— create this model in your APIEngine dashboard first.
        </p>

        {/* Form */}
        <div style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ae-text)", marginBottom: 16 }}>
            {editId ? "Edit item" : "Add inventory item"}
          </h2>
          <form className="ae-auth-form" onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="ae-field">
                <label>Item name</label>
                <input
                  value={form.item_name}
                  onChange={(e) => setField("item_name", e.target.value)}
                  placeholder="Widget A"
                  required
                  disabled={saving}
                />
              </div>
              <div className="ae-field">
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={form.quantity}
                  onChange={(e) => setField("quantity", e.target.value)}
                  placeholder="100"
                  required
                  disabled={saving}
                />
              </div>
            </div>
            <div className="ae-field">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setField("status", e.target.value)} disabled={saving}>
                <option value="in_stock">In stock</option>
                <option value="low">Low stock</option>
                <option value="out_of_stock">Out of stock</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" className="ae-btn ae-btn-primary" disabled={saving}>
                {saving ? "Saving…" : (editId ? "Update item" : "Add item")}
              </button>
              {editId && (
                <button type="button" className="ae-btn ae-btn-secondary" onClick={() => { setEditId(null); setForm({ item_name: "", quantity: "", status: "in_stock" }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ae-text)", marginBottom: 16 }}>
            Inventory ({loading ? "…" : items.length})
          </h2>

          {error && (
            <div className="ae-alert ae-alert--error" style={{ marginBottom: 16 }}>
              Could not load. Make sure the <strong>{SCHEMA_SLUG}</strong> model exists in your dashboard.
            </div>
          )}
          {loading && <div className="ae-loading"><div className="ae-spinner" /></div>}
          {!loading && items.length === 0 && (
            <p style={{ color: "var(--ae-text-muted)", fontSize: 14 }}>No items yet.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--ae-surface-2)",
                  borderRadius: "var(--ae-radius)",
                  padding: "12px 16px",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ae-text)", margin: 0 }}>
                    {item.fields?.item_name ?? item.id}
                  </p>
                  <p style={{ color: "var(--ae-text-muted)", fontSize: 13, margin: "4px 0 0" }}>
                    Qty: {item.fields?.quantity ?? "?"}{" · "}
                    <span style={{ color: statusColor[item.fields?.status] || "var(--ae-text-muted)" }}>
                      {item.fields?.status ?? "unknown"}
                    </span>
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="ae-btn ae-btn-secondary ae-btn-sm" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="ae-btn ae-btn-sm"
                    style={{ borderColor: "var(--ae-error)", color: "var(--ae-error)", background: "transparent" }}
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
