
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import "./DashboardCart.css";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";

function DashboardCart() {
   const user = JSON.parse(localStorage.getItem("user"));
   const role = user?.role;

   const renderDashboard=()=>{
        switch(role){
          case "ADMIN":
           return<AdminDashboard/>
          case "MANAGER":
            return <ManagerDashboard/>
          case "AGENT":
            return <AgentDashboard/>
          default:
             return <h3>Accès refusé</h3>;   
        }
   }
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <header className="nav-container ">
            <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4 ">
             <strong>{user?.nom}</strong>
            <p>{role}</p>
          </div>

        </header>
        <main className="page-content">
          {renderDashboard()}
        </main>

      </div>

    </div>
  );
}

export default DashboardCart;