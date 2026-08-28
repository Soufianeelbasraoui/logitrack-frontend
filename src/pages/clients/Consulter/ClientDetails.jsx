import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

// Icons
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import "./ClientDetails.css";
import "../../Style.css";

function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    api
      .get(`/api/clients/${id}`)
      .then((res) => {
        setClient(res.data);
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

  if (!client) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar title="Clients" />
          <main className="page-content">
            <div className="details-page-container">
              <div className="details-card text-center p-5">
                <h3>Client introuvable</h3>
                <button className="btn-details-back mt-3" onClick={() => navigate("/dashboard/Clients")}>
                  <ArrowBackOutlinedIcon fontSize="small" />
                  Retour aux clients
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const getInitials = (name = "") => {
    if (!name) return "CL";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const displayAddress =
    client.adresse ||
    (client.ville
      ? client.ville.includes("Maroc")
        ? client.ville
        : `${client.ville}, Maroc`
      : "Casablanca, Maroc");

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Clients" />

        <main className="page-content">
          <div className="details-page-container">
            <div className="details-card">
              {/* Header profile */}
              <div className="details-header">
                <div className="details-profile-left">
                  <div className="details-avatar-circle">
                    {getInitials(client.nom)}
                  </div>
                  <div>
                    <h2 className="details-name">{client.nom}</h2>
                    <span className="details-badge-id">Client #{client.id}</span>
                  </div>
                </div>

                <div className="details-actions-top">
                  <Link
                    to={`/dashboard/Clients/modifier/${client.id}`}
                    className="btn-details-edit"
                  >
                    <EditOutlinedIcon fontSize="small" />
                    Modifier
                  </Link>
                  <button
                    type="button"
                    className="btn-details-back"
                    onClick={() => navigate("/dashboard/Clients")}
                  >
                    <ArrowBackOutlinedIcon fontSize="small" />
                    Retour
                  </button>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="details-info-grid">
                <div className="details-info-card">
                  <div className="details-info-icon">
                    <EmailOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="details-info-label">Adresse Email</div>
                    <div className="details-info-value">{client.email || "Non renseigné"}</div>
                  </div>
                </div>

                <div className="details-info-card">
                  <div className="details-info-icon">
                    <PhoneOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="details-info-label">Téléphone</div>
                    <div className="details-info-value">{client.telephone || "Non renseigné"}</div>
                  </div>
                </div>

                <div className="details-info-card">
                  <div className="details-info-icon">
                    <LocationOnOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="details-info-label">Ville / Adresse</div>
                    <div className="details-info-value">{displayAddress}</div>
                  </div>
                </div>

                <div className="details-info-card">
                  <div className="details-info-icon">
                    <CalendarMonthOutlinedIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="details-info-label">Date d'inscription</div>
                    <div className="details-info-value">
                      {client.dateInscription || client.createdAt || "15/03/2024"}
                    </div>
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

export default ClientDetails;