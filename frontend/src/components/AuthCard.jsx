import { Link } from "react-router-dom";

export default function AuthCard({
  title,
  subtitle,
  onSubmit,
  formData,
  setFormData,
  isSignup = false,
  error
}) {
  return (
    <div className="auth-shell">
      <div className="glass-card auth-card">
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
        <form onSubmit={onSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary full-width">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
        <p className="switch-text">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Login" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}
