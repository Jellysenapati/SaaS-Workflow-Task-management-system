export default function TaskFilters({ filters, setFilters }) {
  return (
    <div className="glass-card filter-row">
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="due-soon">Due Soon</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}
