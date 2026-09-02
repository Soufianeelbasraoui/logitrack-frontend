import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  SpaceDashboardOutlined,
  PeopleAltOutlined,
  Inventory2Outlined,
  AssignmentOutlined,
  GroupOutlined,
  BarChartOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { logout } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let user = null;
  try {
    if (token) user = jwtDecode(token);
  } catch (e) {
    console.error("Token decoding error:", e);
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L40 12V32L22 42L4 32V12L22 2Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
            <path d="M22 2V22M22 22L40 12M22 22L4 12" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M22 22V42" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="22,7 34,14 22,21 10,14" fill="rgba(99, 179, 237, 0.4)" />
            <polygon points="10,16 22,23 22,37 10,30" fill="rgba(59, 130, 246, 0.5)" />
            <polygon points="22,23 34,16 34,30 22,37" fill="rgba(37, 99, 235, 0.7)" />
          </svg>
        </div>
        <h2 className="sidebar-brand-name">
          Logi<span>Track</span>
        </h2>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav-list">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <SpaceDashboardOutlined className="sidebar-item-icon" />
          <span>Tableau de bord</span>
        </NavLink>

        <NavLink
          to="/dashboard/Clients"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <PeopleAltOutlined className="sidebar-item-icon" />
          <span>Clients</span>
        </NavLink>

        <NavLink
          to="/dashboard/Products"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <Inventory2Outlined className="sidebar-item-icon" />
          <span>Produits</span>
        </NavLink>

        <NavLink
          to="/dashboard/Orders"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <AssignmentOutlined className="sidebar-item-icon" />
          <span>Commandes</span>
        </NavLink>

        {user?.role === "ADMIN" && (
          <NavLink
            to="/dashboard/userList"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
          >
            <GroupOutlined className="sidebar-item-icon" />
            <span>Utilisateurs</span>
          </NavLink>
        )}

        <NavLink
          to="/dashboard/Profile"
          className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
        >
          <AccountCircleOutlined className="sidebar-item-icon" />
          <span>Profil</span>
        </NavLink>

        {user?.role === "ADMIN" && (
          <NavLink
            to="/dashboard/Settings"
            className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
          >
            <SettingsOutlined className="sidebar-item-icon" />
            <span>Paramètres</span>
          </NavLink>
        )}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <LogoutOutlined fontSize="small" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;