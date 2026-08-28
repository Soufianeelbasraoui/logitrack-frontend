import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

// Icons
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import "./OrderDetails.css";
import "../../clients/Consulter/ClientDetails.css";
import "../../../pages/Style.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    api
      .get(`/api/commandes/${id}`)
      .then((res) => {
        setOrder(res.data);
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

  if (!order) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar title="Commandes" />
          <main className="page-content">
            <div className="order-details-container">
              <div className="order-details-card text-center p-5">
                <h3>Commande introuvable</h3>
                <button
                  className="btn-details-back mt-3"
                  onClick={() => navigate("/dashboard/Orders")}
                >
                  <ArrowBackOutlinedIcon fontSize="small" />
                  Retour aux commandes
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getStatusBadge = (statut = "") => {
    const s = (statut || "").toUpperCase();
    if (s.includes("ATTENTE")) {
      return (
        <span className="order-status-badge status-en-attente">
          <span className="status-dot"></span>
          En attente
        </span>
      );
    }
    if (s.includes("EXPED")) {
      return (
        <span className="order-status-badge status-expediee">
          <span className="status-dot"></span>
          Expédiée
        </span>
      );
    }
    if (s.includes("LIVR")) {
      return (
        <span className="order-status-badge status-livree">
          <span className="status-dot"></span>
          Livrée
        </span>
      );
    }
    if (s.includes("ANNUL")) {
      return (
        <span className="order-status-badge status-annulee">
          <span className="status-dot"></span>
          Annulée
        </span>
      );
    }
    return (
      <span className="order-status-badge status-en-attente">
        <span className="status-dot"></span>
        {statut}
      </span>
    );
  };

  const clientName = order.nomClient || order.client?.nom || "Client non spécifié";

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Commandes" />

        <main className="page-content">
          <div className="order-details-container">
            <div className="order-details-card">
              {/* Header profile */}
              <div className="order-details-header">
                <div className="order-details-title-row">
                  <div className="order-avatar-icon">
                    <ReceiptLongOutlinedIcon fontSize="large" />
                  </div>
                  <div>
                    <h2 className="order-details-num">Commande #CMD-{order.id}</h2>
                    <div>{getStatusBadge(order.statut)}</div>
                  </div>
                </div>

                <div className="details-actions-top">
                  <Link
                    to={`/dashboard/Orders/modifierStatus/${order.id}`}
                    className="btn-details-edit"
                  >
                    <EditOutlinedIcon fontSize="small" />
                    Changer Statut
                  </Link>

                  <Link
                    to={`/dashboard/Orders/add-product/${order.id}`}
                    className="btn-details-edit"
                    style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}
                  >
                    <AddShoppingCartOutlinedIcon fontSize="small" />
                    Ajouter Article
                  </Link>

                  <button
                    type="button"
                    className="btn-details-back"
                    onClick={() => navigate("/dashboard/Orders")}
                  >
                    <ArrowBackOutlinedIcon fontSize="small" />
                    Retour
                  </button>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="order-details-grid">
                <div className="order-info-box">
                  <div className="order-info-icon">
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="order-info-label">Client</div>
                    <div className="order-info-value">{clientName}</div>
                  </div>
                </div>

                <div className="order-info-box">
                  <div className="order-info-icon">
                    <CalendarMonthOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="order-info-label">Date de la commande</div>
                    <div className="order-info-value">
                      {order.dateCommande || "30/05/2024"}
                    </div>
                  </div>
                </div>

                <div className="order-info-box">
                  <div className="order-info-icon">
                    <TollOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="order-info-label">Statut Actuel</div>
                    <div style={{ marginTop: "4px" }}>
                      {getStatusBadge(order.statut)}
                    </div>
                  </div>
                </div>

                <div className="order-info-box">
                  <div className="order-info-icon">
                    <ReceiptLongOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="order-info-label">Référence Système</div>
                    <div className="order-info-value">LOGI-CMD-{order.id}</div>
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

export default OrderDetails;