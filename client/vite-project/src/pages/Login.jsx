import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

/**
 * Login Page
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await loginUser(formData);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb orb-1" />
      <div className="auth-bg-orb orb-2" />

      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="auth-card">
          {/* Header */}
          <div className="auth-card-header text-center mb-4">
            <div className="auth-logo-wrap mb-3">
              <i className="bi bi-check2-square auth-logo-icon" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your TaskFlow account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field mb-3">
              <label className="auth-label" htmlFor="login-email">
                <i className="bi bi-envelope me-2" />Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="auth-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field mb-4">
              <label className="auth-label" htmlFor="login-password">
                <i className="bi bi-lock me-2" />Password
              </label>
              <div className="auth-input-group">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="auth-submit-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Signing in…
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer text-center mt-4">
            <p className="auth-footer-text">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
