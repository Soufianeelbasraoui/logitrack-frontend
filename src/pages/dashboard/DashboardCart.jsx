import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import "./DashboardCart.css";
import "../Style.css";
import { jwtDecode } from "jwt-decode";

function DashboardCart() {
  const token = localStorage.getItem("token");
  let user = null;

  try {
    if (token) {
      user = jwtDecode(token);
    }
  } catch (e) {
    console.error("Erreur décodage token:", e);
  }

  const displayName = user?.nom && user?.prenom 
    ? `${user.prenom} ${user.nom}` 
    : user?.nom || user?.sub || "Mohamed Ali";

  const renderDashboard = () => {
    switch (user?.role) {
      case "ADMIN":
        return <AdminDashboard user={user} displayName={displayName} />;
      case "MANAGER":
        return <ManagerDashboard user={user} displayName={displayName} />;
      case "AGENT":
        return <AgentDashboard user={user} displayName={displayName} />;
      default:
        return <AdminDashboard user={user} displayName={displayName} />;
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Tableau de bord" />

        <main className="page-content">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}

export default DashboardCart;