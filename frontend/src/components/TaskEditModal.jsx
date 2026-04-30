import { useEffect, useState } from "react";

export default function TaskEditModal({ task, onClose, onSave }) {
  const [form, setForm] = useState(task);

  useEffect(() => {
    setForm(task);
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task._id, form);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal">
        <h3>Edit Task</h3>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="form-row">
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={form.dueDate ? new Date(form.dueDate).toISOString().slice(0, 10) : ""}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
