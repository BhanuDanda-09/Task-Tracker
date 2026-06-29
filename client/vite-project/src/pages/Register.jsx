import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

/**
 * Register Page
 */
const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data.token, data.user);
      toast.success(`Account created! Welcome, ${data.user.name}! 🎉`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Try again.");
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
              <i className="bi bi-person-plus auth-logo-icon" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join TaskFlow and stay productive</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-field mb-3">
              <label className="auth-label" htmlFor="register-name">
                <i className="bi bi-person me-2" />Full Name
              </label>
              <input
                id="register-name"
                type="text"
                name="name"
                className="auth-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-field mb-3">
              <label className="auth-label" htmlFor="register-email">
                <i className="bi bi-envelope me-2" />Email
              </label>
              <input
                id="register-email"
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

            <div className="auth-field mb-3">
              <label className="auth-label" htmlFor="register-password">
                <i className="bi bi-lock me-2" />Password
              </label>
              <div className="auth-input-group">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="auth-input"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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

            <div className="auth-field mb-4">
              <label className="auth-label" htmlFor="register-confirm">
                <i className="bi bi-shield-check me-2" />Confirm Password
              </label>
              <div className="auth-input-group">
                <input
                  id="register-confirm"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  className="auth-input"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label="Toggle confirm password visibility"
                >
                  <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              className="auth-submit-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Creating account…
                </>
              ) : (
                <>
                  <i className="bi bi-rocket-takeoff me-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer text-center mt-4">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
