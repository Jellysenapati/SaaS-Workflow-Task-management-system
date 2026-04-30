import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#7c3aed", "#06b6d4", "#22c55e"];

export default function AnalyticsPanel({ analytics }) {
  if (!analytics) return null;

  const { totals, byStatus, byPriority } = analytics;

  return (
    <div className="analytics-wrap">
      <div className="glass-card stats-grid">
        <div className="stat-item">
          <span>Total Tasks</span>
          <strong>{totals.total}</strong>
        </div>
        <div className="stat-item">
          <span>Completed</span>
          <strong>{totals.completed}</strong>
        </div>
        <div className="stat-item">
          <span>Overdue</span>
          <strong>{totals.overdue}</strong>
        </div>
        <div className="stat-item">
          <span>Completion Rate</span>
          <strong>{totals.completionRate}%</strong>
        </div>
      </div>

      <div className="charts-grid">
        <div className="glass-card chart-card">
          <h3>Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" cx="50%" cy="50%" outerRadius={90}>
                {byStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card chart-card">
          <h3>Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={byPriority}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
