import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import AuthCard from "../components/AuthCard";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/signup", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to signup.");
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Start organizing your work in one place"
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      isSignup
      error={error}
    />
  );
}
