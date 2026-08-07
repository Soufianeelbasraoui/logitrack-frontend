import { Link } from "react-router-dom";
import "./Unauthorized.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function Unauthorized() {
  return (
    <div className="main-content">
        <Sidebar/>
      <div className="unauthorized-container">
        <h3>403</h3>
        <h2>Accès interdit</h2>
        <p>
          Vous n'avez pas l'autorisation d'accéder à cette page.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Retour au dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;