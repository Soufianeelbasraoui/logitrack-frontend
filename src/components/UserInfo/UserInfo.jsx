import { jwtDecode } from "jwt-decode";
import { NotificationsNoneOutlined } from "@mui/icons-material";

function UserInfo() {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error("Error decoding token:", e);
    }
  }

  const displayName = user?.nom && user?.prenom 
    ? `${user.prenom} ${user.nom}` 
    : user?.nom || user?.sub || "elbasraoui";
  const displayRole = user?.role || "ADMIN";

  const getInitials = (name) => {
    if (!name) return "EL";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="nav-right-section">
      <button className="nav-notification-btn" aria-label="Notifications">
        <NotificationsNoneOutlined fontSize="small" />
        <span className="nav-notification-badge">5</span>
      </button>

      <div className="nav-user-profile">
        <div className="nav-user-avatar">
          {getInitials(displayName)}
        </div>
        <div className="nav-user-info">
          <span className="nav-user-name">{displayName}</span>
          <span className="nav-user-role">{displayRole}</span>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;