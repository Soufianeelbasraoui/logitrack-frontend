import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

// Icons
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

import "./Consulter.css";
import "../../Style.css";

const defaultUsersList = [
  { id: 1, nom: "Ali", prenom: "Mohamed", email: "mohamed.ali@logitrack.com", role: "ADMIN", statut: "Actif", dateCreation: "15/01/2024 10:30" },
  { id: 2, nom: "El Amrani", prenom: "Sara", email: "sara.amrani@logitrack.com", role: "ADMIN", statut: "Actif", dateCreation: "16/01/2024 09:15" },
  { id: 3, nom: "Benali", prenom: "Youssef", email: "youssef.benali@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "18/01/2024 11:45" },
  { id: 4, nom: "Ait Ali", prenom: "Hassan", email: "hassan.aitali@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "20/01/2024 14:20" },
  { id: 5, nom: "Kabbaj", prenom: "Nadia", email: "nadia.kabbaj@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "21/01/2024 08:50" },
  { id: 6, nom: "Amine", prenom: "Ahmed", email: "ahmed.amine@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "22/01/2024 10:05" },
  { id: 7, nom: "Kabbaj", prenom: "Imane", email: "imane.kabbaj@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "23/01/2024 13:10" },
  { id: 8, nom: "Tahiri", prenom: "Omar", email: "omar.tahiri@logitrack.com", role: "AGENT", statut: "Inactif", dateCreation: "24/01/2024 16:30" },
  { id: 9, nom: "Benjelloun", prenom: "Laila", email: "laila.benjelloun@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "25/01/2024 09:00" },
  { id: 10, nom: "El Idrissi", prenom: "Mehdi", email: "mehdi.idrissi@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "26/01/2024 11:25" },
];

const ROLE_PERMISSIONS = {
  ADMIN: [
    "Gestion complète des utilisateurs et attribution des rôles",
    "Supervision globale de l'inventaire et des stocks",
    "Gestion et suivi de toutes les commandes clients",
    "Accès aux tableaux de bord financiers et statistiques avancées",
  ],
  MANAGER: [
    "Gestion de l'inventaire, des catégories et des prix",
    "Création, traitement et validation des commandes",
    "Consultation et mise à jour des fiches clients",
    "Exportation des rapports d'activité opérationnels",
  ],
  AGENT: [
    "Mise à jour des statuts d'expédition des commandes",
    "Consultation des fiches produits et quantités disponibles",
    "Consultation des coordonnées clients pour livraison",
    "Signalement des anomalies de commande en temps réel",
  ],
};

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    api
      .get(`/api/users/${id}`)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          // Fallback to demo user
          const fallback = defaultUsersList.find((u) => String(u.id) === String(id));
          setUser(fallback || null);
        }
      })
      .catch(() => {
        // Fallback to demo user
        const fallback = defaultUsersList.find((u) => String(u.id) === String(id));
        setUser(fallback || null);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [id]);

  if (loader) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar title="Détails Utilisateur" />
          <main className="page-content">
            <div className="user-details-container">
              <div className="user-not-found-card">
                <div className="user-not-found-icon">👤</div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0" }}>
                  Utilisateur introuvable
                </h2>
                <p style={{ color: "#64748B", marginBottom: "24px" }}>
                  L'utilisateur avec l'identifiant #{id} n'existe pas ou a été supprimé.
                </p>
                <button
                  className="user-details-back-link"
                  onClick={() => navigate("/dashboard/userList")}
                >
                  <ArrowBackRoundedIcon fontSize="small" />
                  <span>Retour à la liste des utilisateurs</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Helper for initials
  const getInitials = (prenom = "", nom = "") => {
    const p = (prenom || "").trim().charAt(0);
    const n = (nom || "").trim().charAt(0);
    if (p || n) return (p + n).toUpperCase();
    return (user.email || "US").slice(0, 2).toUpperCase();
  };

  const fullName = `${user.prenom || ""} ${user.nom || ""}`.trim() || user.email || "Utilisateur";
  const userRole = (user.role || "AGENT").toUpperCase();
  const isActive = (user.statut || "Actif").toLowerCase() === "actif";

  // Avatar gradient based on role
  const getAvatarGradient = (role) => {
    switch (role) {
      case "ADMIN":
        return "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)";
      case "MANAGER":
        return "linear-gradient(135deg, #F97316 0%, #EA580C 100%)";
      case "AGENT":
      default:
        return "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)";
    }
  };

  const permissions = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.AGENT;

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Détails Utilisateur" />
        <main className="page-content">
          <div className="user-details-container">
            {/* Top Navigation & Actions */}
            <div className="user-details-top-bar">
              <Link to="/dashboard/userList" className="user-details-back-link">
                <ArrowBackRoundedIcon fontSize="small" />
                <span>Retour aux utilisateurs</span>
              </Link>

              <div className="user-details-actions">
                <Link
                  to={`/dashboard/userList/userForm?id=${user.id}`}
                  className="user-details-edit-btn"
                >
                  <EditOutlinedIcon fontSize="small" />
                  <span>Modifier l'utilisateur</span>
                </Link>
              </div>
            </div>

            {/* Profile Header Card */}
            <div className="user-profile-header-card">
              <div className="user-profile-banner"></div>
              <div className="user-profile-summary">
                <div
                  className="user-avatar-large"
                  style={{ background: getAvatarGradient(userRole) }}
                >
                  {getInitials(user.prenom, user.nom)}
                  <span
                    className={`user-status-indicator ${isActive ? "active" : "inactive"}`}
                    title={isActive ? "Compte actif" : "Compte inactif"}
                  ></span>
                </div>

                <div className="user-main-info">
                  <h2 className="user-fullname">{fullName}</h2>
                  <div className="user-meta-row">
                    <span className="user-id-pill">ID : #{user.id}</span>
                    <span className={`role-badge ${userRole.toLowerCase()}`}>
                      <ShieldOutlinedIcon style={{ fontSize: "14px" }} />
                      <span>{userRole}</span>
                    </span>
                    <span className={`status-pill ${isActive ? "actif" : "inactif"}`}>
                      <span className="status-dot"></span>
                      <span>{isActive ? "Actif" : "Inactif"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="user-details-grid">
              {/* Prénom & Nom */}
              <div className="user-info-card">
                <div className="user-info-icon-box orange">
                  <PersonOutlineOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Nom complet</span>
                  <span className="user-info-value">{fullName}</span>
                </div>
              </div>

              {/* Email */}
              <div className="user-info-card">
                <div className="user-info-icon-box blue">
                  <MailOutlineOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Adresse Email</span>
                  <span className="user-info-value">{user.email || "Non renseigné"}</span>
                </div>
              </div>

              {/* Rôle */}
              <div className="user-info-card">
                <div className="user-info-icon-box purple">
                  <ShieldOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Rôle & Privilèges</span>
                  <span className="user-info-value">
                    {userRole === "ADMIN" && "Administrateur Système"}
                    {userRole === "MANAGER" && "Responsable Logistique"}
                    {userRole === "AGENT" && "Agent Opérationnel"}
                  </span>
                </div>
              </div>

              {/* Statut du compte */}
              <div className="user-info-card">
                <div className="user-info-icon-box green">
                  <CheckCircleOutlineOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Statut du compte</span>
                  <span className="user-info-value">
                    {isActive ? "Actif — Accès autorisé" : "Inactif — Accès suspendu"}
                  </span>
                </div>
              </div>

              {/* Date de Création */}
              <div className="user-info-card">
                <div className="user-info-icon-box orange">
                  <CalendarTodayOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Date d'inscription</span>
                  <span className="user-info-value">
                    {user.dateCreation || user.createdAt || "15/01/2024 10:30"}
                  </span>
                </div>
              </div>

              {/* Département / Organisation */}
              <div className="user-info-card">
                <div className="user-info-icon-box blue">
                  <BusinessOutlinedIcon fontSize="medium" />
                </div>
                <div className="user-info-text">
                  <span className="user-info-label">Organisation</span>
                  <span className="user-info-value">LogiTrack Platform</span>
                </div>
              </div>
            </div>

            {/* Permissions & Privilèges Card */}
            <div className="user-permissions-card">
              <div className="user-permissions-header">
                <h3 className="user-permissions-title">
                  <ShieldOutlinedIcon style={{ color: "#F97316" }} />
                  <span>Permissions & Accès associés au rôle {userRole}</span>
                </h3>
              </div>

              <div className="user-permissions-list">
                {permissions.map((perm, index) => (
                  <div key={index} className="user-permission-item">
                    <span className="user-permission-check">
                      <CheckCircleRoundedIcon fontSize="small" />
                    </span>
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetails;