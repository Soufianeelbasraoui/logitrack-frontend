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
import logoImg from "../../assets/logo1.png";

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
          <img src={logoImg} alt="LogiTrack Logo" className="sidebar-brand-logo-img" />
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