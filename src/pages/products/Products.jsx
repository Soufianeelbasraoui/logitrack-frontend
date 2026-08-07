import "./Products.css";
import "../style.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function Products() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <header className="nav-container">
          <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4">
            <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
          </div>
        </header>
        <main className="page-content">
          <div className="nav-produits">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Produits</h5>
            </div>
            <Link  to="/dashboard/Produits/ajouter" className="btn-ajouter">
              Ajouter Produit
            </Link>
          </div>

          <div className="card mt-3 p-4">
            <h5>Liste des produits</h5>
            <p className="text-muted">
            
            </p>
          </div>

        </main>

      </div>

    </div>
  );
}

export default Products;