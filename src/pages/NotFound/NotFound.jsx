import { Link } from "react-router-dom";
import "./NotFound.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function NotFound() {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        <div className="not-found-container">
          <h3>404</h3>

          <h2>Page introuvable</h2>
          <p>
            La page que vous recherchez n'existe pas.
          </p>

          <Link to="/dashboard" className="btn btn-primary">
            Retour au dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;