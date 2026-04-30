export default function ReminderPanel({ tasks, settings }) {
  if (!settings?.remindersEnabled) return null;

  const now = Date.now();
  const reminderWindowMs = (settings.reminderBeforeHours || 24) * 60 * 60 * 1000;
  const dueSoon = tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;
    const due = new Date(task.dueDate).getTime();
    return due >= now && due <= now + reminderWindowMs;
  });
  const overdue = tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;
    return new Date(task.dueDate).getTime() < now;
  });

  return (
    <div className="glass-card">
      <h3>Reminders & Notifications</h3>
      <p className="subtitle">Due in next {settings.reminderBeforeHours} hour(s): {dueSoon.length}</p>
      <p className="subtitle">Overdue tasks: {overdue.length}</p>
      <div className="task-grid">
        {[...overdue, ...dueSoon].slice(0, 5).map((task) => (
          <div className="task-card" key={task._id}>
            <strong>{task.title}</strong>
            <p>Due {new Date(task.dueDate).toLocaleString()}</p>
          </div>
        ))}
        {dueSoon.length + overdue.length === 0 && <p className="empty">No reminders right now.</p>}
      </div>
    </div>
  );
}
