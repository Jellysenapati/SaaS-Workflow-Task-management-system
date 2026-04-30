export default function TaskList({ tasks, onStatusChange, onDelete, onEdit }) {
  return (
    <div className="glass-card">
      <h3>Your Tasks</h3>
      <div className="task-grid">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <div className="task-head">
              <h4>{task.title}</h4>
              <span className={`badge ${task.priority}`}>{task.priority}</span>
            </div>
            <p>{task.description || "No description provided."}</p>
            <div className="task-meta">
              <span>Status: {task.status}</span>
              <span>
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
              </span>
            </div>
            <div className="task-actions">
              <select value={task.status} onChange={(e) => onStatusChange(task._id, e.target.value)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button className="btn btn-danger" onClick={() => onDelete(task._id)}>
                Delete
              </button>
              <button className="btn btn-ghost" onClick={() => onEdit(task)}>
                Edit
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="empty">No tasks yet. Create your first one.</p>}
      </div>
    </div>
  );
}
