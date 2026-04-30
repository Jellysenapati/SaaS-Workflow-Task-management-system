const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" }
];

export default function KanbanBoard({ tasks, onMove, onEdit }) {
  return (
    <div className="glass-card">
      <h3>Kanban Board</h3>
      <div className="kanban-grid">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);
          return (
            <div className="kanban-column" key={column.id}>
              <h4>{column.title}</h4>
              {columnTasks.map((task) => (
                <div className="task-card" key={task._id}>
                  <strong>{task.title}</strong>
                  <p>{task.description || "No description"}</p>
                  <div className="task-actions">
                    {column.id !== "todo" && (
                      <button className="btn btn-ghost" onClick={() => onMove(task._id, -1)}>
                        Back
                      </button>
                    )}
                    {column.id !== "completed" && (
                      <button className="btn btn-primary" onClick={() => onMove(task._id, 1)}>
                        Forward
                      </button>
                    )}
                    <button className="btn btn-ghost" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
              {columnTasks.length === 0 && <p className="empty">No tasks</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
