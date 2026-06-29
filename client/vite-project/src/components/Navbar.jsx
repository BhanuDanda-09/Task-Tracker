import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar Component
 * Shows user info and logout button when authenticated.
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully. See you soon! 👋");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark taskflow-navbar shadow-sm">
      <div className="container">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <div className="brand-icon-wrap">
            <i className="bi bi-check2-square brand-icon"></i>
          </div>
          <span className="brand-text">
            Task<span className="brand-accent">Flow</span>
          </span>
        </a>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          <span className="navbar-tagline d-none d-md-inline">
            <i className="bi bi-lightning-fill me-1 text-warning"></i>
            Stay Productive. Stay Organised.
          </span>

          {user && (
            <div className="d-flex align-items-center gap-2">
              {/* User avatar */}
              <div className="nav-user-avatar" title={user.name}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="nav-user-name d-none d-sm-inline">{user.name}</span>

              {/* Logout button */}
              <button
                id="logout-btn"
                className="nav-logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <i className="bi bi-box-arrow-right me-1" />
                <span className="d-none d-sm-inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
