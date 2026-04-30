import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import AuthCard from "../components/AuthCard";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login.");
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Log in to manage your productivity"
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      error={error}
    />
  );
}
