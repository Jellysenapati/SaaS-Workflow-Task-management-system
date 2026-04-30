import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import AnalyticsPanel from "../components/AnalyticsPanel";
import TaskFilters from "../components/TaskFilters";
import KanbanBoard from "../components/KanbanBoard";
import TaskEditModal from "../components/TaskEditModal";
import ReminderPanel from "../components/ReminderPanel";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    sortBy: "newest"
  });
  const notifiedTaskIds = useRef(new Set());
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, analyticsRes] = await Promise.all([
        api.get("/tasks"),
        api.get("/tasks/analytics/summary")
      ]);
      setTasks(tasksRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const settings = user.settings || {};
    if (!settings.remindersEnabled || !("Notification" in window)) return;
    if (Notification.permission === "default") Notification.requestPermission();
    if (Notification.permission !== "granted") return;
    const now = Date.now();
    const windowMs = (settings.reminderBeforeHours || 24) * 60 * 60 * 1000;
    tasks.forEach((task) => {
      if (!task.dueDate || task.status === "completed") return;
      if (notifiedTaskIds.current.has(task._id)) return;
      const dueMs = new Date(task.dueDate).getTime();
      if (dueMs >= now && dueMs <= now + windowMs) {
        new Notification("Task reminder", { body: `${task.title} is due soon.` });
        notifiedTaskIds.current.add(task._id);
      }
    });
  }, [tasks, user]);

  const handleCreateTask = async (task) => {
    await api.post("/tasks", task);
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchData();
  };

  const handleUpdateTask = async (id, payload) => {
    await api.put(`/tasks/${id}`, payload);
    setEditTask(null);
    fetchData();
  };

  const handleKanbanMove = async (id, direction) => {
    const order = ["todo", "in-progress", "completed"];
    const task = tasks.find((t) => t._id === id);
    if (!task) return;
    const idx = order.indexOf(task.status);
    const next = order[idx + direction];
    if (!next) return;
    await handleUpdateTask(id, { status: next });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredTasks = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const list = tasks
      .filter((task) =>
        [task.title, task.description].join(" ").toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((task) => (filters.status === "all" ? true : task.status === filters.status))
      .filter((task) => (filters.priority === "all" ? true : task.priority === filters.priority));

    list.sort((a, b) => {
      if (filters.sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (filters.sortBy === "due-soon") return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
      if (filters.sortBy === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return list;
  }, [tasks, filters]);

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1>Productivity Dashboard</h1>
          <p>Welcome back, {user.name || "User"}.</p>
        </div>
        <div className="header-actions">
          <Link className="btn btn-ghost" to="/settings">
            Settings
          </Link>
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {loading ? (
        <div className="glass-card">
          <p>Loading your workspace...</p>
        </div>
      ) : (
        <>
          <AnalyticsPanel analytics={analytics} />
          <ReminderPanel tasks={tasks} settings={user.settings || { remindersEnabled: true, reminderBeforeHours: 24 }} />
          <TaskForm onCreate={handleCreateTask} />
          <TaskFilters filters={filters} setFilters={setFilters} />
          <div className="view-toggle">
            <button className={`btn ${viewMode === "list" ? "btn-primary" : "btn-ghost"}`} onClick={() => setViewMode("list")}>
              List View
            </button>
            <button className={`btn ${viewMode === "kanban" ? "btn-primary" : "btn-ghost"}`} onClick={() => setViewMode("kanban")}>
              Kanban View
            </button>
          </div>
          {viewMode === "list" ? (
            <TaskList
              tasks={filteredTasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onEdit={setEditTask}
            />
          ) : (
            <KanbanBoard tasks={filteredTasks} onMove={handleKanbanMove} onEdit={setEditTask} />
          )}
          <TaskEditModal task={editTask} onClose={() => setEditTask(null)} onSave={handleUpdateTask} />
        </>
      )}
    </div>
  );
}
