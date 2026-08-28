import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

// Icons
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import "./ProduitDetails.css";
import "../../clients/Consulter/ClientDetails.css";
import "../../../pages/Style.css";

function ProduitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produit, setProduit] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => {
        setProduit(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  if (loader) {
    return <Loader />;
  }

  if (!produit) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar title="Produits" />
          <main className="page-content">
            <div className="product-details-container">
              <div className="product-details-card text-center p-5">
                <h3>Produit introuvable</h3>
                <button
                  className="btn-details-back mt-3"
                  onClick={() => navigate("/dashboard/Products")}
                >
                  <ArrowBackOutlinedIcon fontSize="small" />
                  Retour aux produits
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getStockStatus = (stock) => {
    const qty = Number(stock) || 0;
    if (qty > 10) {
      return (
        <span className="stock-badge stock-in">
          <span className="stock-dot"></span>
          En stock ({qty} unités)
        </span>
      );
    }
    if (qty > 0) {
      return (
        <span className="stock-badge stock-low">
          <span className="stock-dot"></span>
          Stock faible ({qty} unités)
        </span>
      );
    }
    return (
      <span className="stock-badge stock-out">
        <span className="stock-dot"></span>
        Rupture de stock
      </span>
    );
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Produits" />

        <main className="page-content">
          <div className="product-details-container">
            <div className="product-details-card">
              {/* Header profile */}
              <div className="product-details-header">
                <div className="product-details-title-row">
                  <div className="product-avatar-icon">
                    <Inventory2OutlinedIcon fontSize="large" />
                  </div>
                  <div>
                    <h2 className="product-details-name">{produit.nom}</h2>
                    <span className="product-details-cat">{produit.categorie}</span>
                  </div>
                </div>

                <div className="details-actions-top">
                  <Link
                    to={`/dashboard/Products/modifierProduit/${produit.id}`}
                    className="btn-details-edit"
                  >
                    <EditOutlinedIcon fontSize="small" />
                    Modifier
                  </Link>
                  <button
                    type="button"
                    className="btn-details-back"
                    onClick={() => navigate("/dashboard/Products")}
                  >
                    <ArrowBackOutlinedIcon fontSize="small" />
                    Retour
                  </button>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="product-details-grid">
                <div className="product-info-box">
                  <div className="product-info-icon">
                    <PaymentsOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="product-info-label">Prix Unitaire</div>
                    <div className="product-info-value">
                      {Number(produit.prix).toFixed(2)} MAD
                    </div>
                  </div>
                </div>

                <div className="product-info-box">
                  <div className="product-info-icon">
                    <WarehouseOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="product-info-label">Quantité en stock</div>
                    <div style={{ marginTop: "4px" }}>
                      {getStockStatus(produit.quantiteStock)}
                    </div>
                  </div>
                </div>

                <div className="product-info-box">
                  <div className="product-info-icon">
                    <CategoryOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="product-info-label">Catégorie</div>
                    <div className="product-info-value">{produit.categorie}</div>
                  </div>
                </div>

                <div className="product-info-box">
                  <div className="product-info-icon">
                    <Inventory2OutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="product-info-label">Identifiant Référence</div>
                    <div className="product-info-value">PRD-00{produit.id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProduitDetails;