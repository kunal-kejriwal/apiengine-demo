/**
 * JSON DB Demo
 * Demonstrates useCollection and useJsonRecord to store/retrieve arbitrary data.
 * Uses a collection named "notes" — create it in your APIEngine dashboard first.
 *
 * Shows:
 *   - List all records from a collection
 *   - Create a new record
 *   - Delete a record
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollection, api } from "@apiengine/react-sdk";

const SLUG = "notes";

export default function JsonDbDemo() {
  const navigate                        = useNavigate();
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [saving,  setSaving]  = useState(false);
  const [version, setVersion] = useState(0);

  const { data: notes, loading: notesLoading } = useCollection(SLUG, { limit: 20, refreshKey: version });

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await api.post(`/api/v1/db/${SLUG}/`, {
        name:        title,
        description: content,
        category:    "note",
        data:        { created_at: new Date().toISOString() },
      });
      setTitle("");
      setContent("");
      setVersion((v) => v + 1);
    } catch (err) {
      alert("Create failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/api/v1/db/${SLUG}/${id}/`);
      setVersion((v) => v + 1);
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.detail || err.message));
    }
  }

  const card   = { background: "var(--ae-surface)", border: "1px solid var(--ae-border)", borderRadius: "var(--ae-radius-lg)", padding: 24 };
  const styles = { minHeight: "100vh", background: "var(--ae-bg)", padding: "40px 24px", fontFamily: "var(--ae-font)" };

  return (
    <div style={styles}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", color: "var(--ae-text-muted)", cursor: "pointer", fontFamily: "var(--ae-font)", marginBottom: 24, fontSize: 14 }}>
          ← Back to dashboard
        </button>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--ae-text)", marginBottom: 8 }}>JSON DB Demo</h1>
        <p style={{ color: "var(--ae-text-muted)", marginBottom: 32, fontSize: 14 }}>
          Collection: <code style={{ background: "var(--ae-surface-2)", padding: "2px 6px", borderRadius: 4, fontFamily: "monospace" }}>{SLUG}</code> — store any JSON data, zero schema.
        </p>

        {/* Create form */}
        <div style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ae-text)", marginBottom: 16 }}>Create a note</h2>
          <form className="ae-auth-form" onSubmit={handleCreate}>
            <div className="ae-field">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My note title"
                required
                disabled={saving}
              />
            </div>
            <div className="ae-field">
              <label>Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write anything…"
                rows={3}
                disabled={saving}
              />
            </div>
            <button type="submit" className="ae-btn ae-btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Create note"}
            </button>
          </form>
        </div>

        {/* Notes list */}
        <div style={card}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ae-text)", marginBottom: 16 }}>
            All notes ({notesLoading ? "…" : notes?.length ?? 0})
          </h2>
          {notesLoading && <div className="ae-loading"><div className="ae-spinner" /></div>}
          {!notesLoading && (!notes || notes.length === 0) && (
            <p style={{ color: "var(--ae-text-muted)", fontSize: 14 }}>No notes yet. Create one above.</p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {notes?.map((note) => (
              <div
                key={note.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  background: "var(--ae-surface-2)",
                  borderRadius: "var(--ae-radius)",
                  padding: "14px 16px",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600, color: "var(--ae-text)", margin: 0 }}>{note.name}</p>
                  {note.description && (
                    <p style={{ color: "var(--ae-text-muted)", fontSize: 13, margin: "4px 0 0" }}>
                      {note.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(note.id)}
                  style={{ background: "none", border: "none", color: "var(--ae-error)", cursor: "pointer", fontSize: 18, marginLeft: 12 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
