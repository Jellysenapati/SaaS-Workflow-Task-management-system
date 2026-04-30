import { useState } from "react";

const initialTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: ""
};

export default function TaskForm({ onCreate }) {
  const [task, setTask] = useState(initialTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(task);
    setTask(initialTask);
  };

  return (
    <div className="glass-card">
      <h3>Create New Task</h3>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <div className="form-row">
          <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}
