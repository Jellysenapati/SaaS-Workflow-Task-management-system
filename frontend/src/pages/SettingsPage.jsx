import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function SettingsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm] = useState({
    name: user.name || "",
    password: "",
    settings: {
      theme: user.settings?.theme || "dark",
      remindersEnabled: user.settings?.remindersEnabled ?? true,
      reminderBeforeHours: user.settings?.reminderBeforeHours || 24
    }
  });
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    const { data } = await api.put("/users/profile", form);
    localStorage.setItem("user", JSON.stringify(data));
    setMessage("Settings saved successfully.");
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1>Profile & Settings</h1>
          <p>Manage account preferences and reminders.</p>
        </div>
        <Link to="/dashboard" className="btn btn-ghost">
          Back to Dashboard
        </Link>
      </header>
      <div className="glass-card">
        <form className="task-form" onSubmit={handleSave}>
          <div className="input-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="input-group">
            <label>New Password (optional)</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="form-row">
            <select
              value={form.settings.theme}
              onChange={(e) =>
                setForm({ ...form, settings: { ...form.settings, theme: e.target.value } })
              }
            >
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
            <select
              value={String(form.settings.remindersEnabled)}
              onChange={(e) =>
                setForm({
                  ...form,
                  settings: { ...form.settings, remindersEnabled: e.target.value === "true" }
                })
              }
            >
              <option value="true">Reminders On</option>
              <option value="false">Reminders Off</option>
            </select>
            <input
              type="number"
              min={1}
              max={168}
              value={form.settings.reminderBeforeHours}
              onChange={(e) =>
                setForm({
                  ...form,
                  settings: { ...form.settings, reminderBeforeHours: Number(e.target.value) || 24 }
                })
              }
            />
          </div>
          {message && <p>{message}</p>}
          <button className="btn btn-primary" type="submit">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
