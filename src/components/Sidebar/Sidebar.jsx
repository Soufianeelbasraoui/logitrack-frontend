import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../assets/logo1.png";
import { logout } from "../../services/authService";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar-container d-flex">
      <div className="sidbar-logo">
        <img src={logo} alt="LogiTrack" className="logo" />
        <h2 className="logo-text text-primary">
          Logi<span>Track</span>
        </h2>
      </div>
      <div className="sidbar-nav sidebar-link">
        <nav className="sidebar-nav-list">
          <NavLink to="/dashboard" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <HomeIcon className="sidebar-icon me-2" />Dashboard
          </NavLink>
          <NavLink to="/dashboard/Clients" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <PeopleIcon className="sidebar-icon me-2" />Clients
          </NavLink>
          <NavLink to="/dashboard/Products" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <IntegrationInstructionsIcon className="sidebar-icon me-2" />Produits
          </NavLink>
          <NavLink to="/dashboard/Orders" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <PendingActionsIcon className="sidebar-icon me-2" />Commandes
          </NavLink>
          <NavLink to="/dashboard/userList" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <GroupIcon className="sidebar-icon me-2" />Utilisateurs
          </NavLink>
          <NavLink to="/dashboard/Profile" className="nav-link mt-3 sidebar-nav-link d-flex align-items-center rounded-3">
            <AccountCircleIcon className="sidebar-icon me-2" />Profile
          </NavLink>
        </nav>
      </div>

      <button className="sidebar-logout d-flex align-items-center justify-content-center" onClick={handleLogout}>
        <LogoutIcon /> Déconnexion
      </button>
    </aside>
  );
}

export default Sidebar;