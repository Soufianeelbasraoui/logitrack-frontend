
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AgentDashboard from "./AgentDashboard/AgentDashboard";
import "./DashboardCart.css";
import "../Style.css"
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";
import { jwtDecode } from "jwt-decode";

function DashboardCart() {
   const token = localStorage.getItem("token");
   const user =jwtDecode(token) 

   const renderDashboard=()=>{
        switch(user?.role){
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
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <header className="nav-container ">
            <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4 ">
             <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
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