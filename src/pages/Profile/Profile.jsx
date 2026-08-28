import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import "./Profile.css";
import "../Style.css";

import {
  Menu,
  PersonOutlineOutlined,
  LockOutlined,
  TuneOutlined,
  MailOutlineOutlined,
  PhoneOutlined,
  BadgeOutlined,
  CalendarTodayOutlined,
  AccessTimeOutlined,
  VpnKeyOutlined,
  CameraAltOutlined,
  SaveOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material";

function Profile() {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    if (token) user = jwtDecode(token);
  } catch (e) {
    console.error("Token decoding error:", e);
  }

  const [activeTab, setActiveTab] = useState("personal");

  // User form states with fallback to screenshot data
  const [fullName, setFullName] = useState(
    user?.nom && user?.prenom
      ? `${user.prenom} ${user.nom}`
      : user?.nom || "Mohamed Ali"
  );
  const [email, setEmail] = useState(
    user?.sub?.includes("@") ? user.sub : "mohamed.ali@logitrack.com"
  );
  const [phone, setPhone] = useState("+212 6 12 34 56 78");
  const [role] = useState(user?.role || "ADMIN");
  const [joinDate] = useState("15/01/2024 10:30");
  const [status, setStatus] = useState("Actif");

  const [language, setLanguage] = useState("Français");
  const [timezone, setTimezone] = useState("(GMT+01:00) Casablanca");

  // Security tab states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success("Modifications enregistrées avec succès !");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    toast.success("Mot de passe mis à jour avec succès !");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        {/* Top Navbar */}
        <Navbar title="Profil" />

        {/* Page Content */}
        <main className="page-content">
          <div className="profile-page-grid">
            {/* Left Summary Card */}
            <div className="profile-summary-card">
              <div className="profile-avatar-container">
                <div className="profile-avatar-large">
                  <svg width="68" height="68" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" fill="#dbeafe" />
                    <circle cx="50" cy="40" r="20" fill="#93c5fd" />
                    <path d="M 20,86 C 20,68 35,62 50,62 C 65,62 80,68 80,86" fill="#3b82f6" />
                  </svg>
                  <button className="avatar-camera-btn" aria-label="Changer la photo de profil">
                    <CameraAltOutlined fontSize="inherit" />
                  </button>
                </div>
                <h3 className="profile-user-name">{fullName}</h3>
                <span className="profile-role-badge">{role}</span>
              </div>

              <div className="profile-details-list">
                <div className="profile-detail-item">
                  <div className="detail-icon-box">
                    <MailOutlineOutlined fontSize="small" />
                  </div>
                  <div className="detail-text-box">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{email}</span>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="detail-icon-box">
                    <PhoneOutlined fontSize="small" />
                  </div>
                  <div className="detail-text-box">
                    <span className="detail-label">Téléphone</span>
                    <span className="detail-value">{phone}</span>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="detail-icon-box">
                    <BadgeOutlined fontSize="small" />
                  </div>
                  <div className="detail-text-box">
                    <span className="detail-label">Rôle</span>
                    <span className="detail-value">{role === "ADMIN" ? "Administrateur" : role}</span>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="detail-icon-box">
                    <CalendarTodayOutlined fontSize="small" />
                  </div>
                  <div className="detail-text-box">
                    <span className="detail-label">Date d'inscription</span>
                    <span className="detail-value">{joinDate}</span>
                  </div>
                </div>

                <div className="profile-detail-item">
                  <div className="detail-icon-box">
                    <AccessTimeOutlined fontSize="small" />
                  </div>
                  <div className="detail-text-box">
                    <span className="detail-label">Statut</span>
                    <span className="profile-status-pill">{status}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-change-password"
                onClick={() => setActiveTab("security")}
              >
                <VpnKeyOutlined fontSize="small" />
                <span>Changer le mot de passe</span>
              </button>
            </div>

            {/* Right Tabbed Details Card */}
            <div className="profile-main-card">
              {/* Tabs Navigation */}
              <div className="profile-tabs-header">
                <button
                  type="button"
                  className={`profile-tab-btn ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => setActiveTab("personal")}
                >
                  <PersonOutlineOutlined fontSize="small" />
                  <span>Informations personnelles</span>
                </button>

                <button
                  type="button"
                  className={`profile-tab-btn ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  <LockOutlined fontSize="small" />
                  <span>Sécurité</span>
                </button>

                <button
                  type="button"
                  className={`profile-tab-btn ${activeTab === "preferences" ? "active" : ""}`}
                  onClick={() => setActiveTab("preferences")}
                >
                  <TuneOutlined fontSize="small" />
                  <span>Préférences</span>
                </button>
              </div>

              {/* Tab 1: Informations personnelles */}
              {activeTab === "personal" && (
                <div className="profile-tab-content">
                  <div className="profile-section-header">
                    <h4 className="section-title">Informations personnelles</h4>
                    <p className="section-subtitle">Mettez à jour vos informations personnelles</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="profile-form">
                    <div className="form-grid-2">
                      <div className="profile-input-group">
                        <label className="profile-input-label">Nom complet</label>
                        <input
                          type="text"
                          className="profile-text-input"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Email</label>
                        <input
                          type="email"
                          className="profile-text-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Téléphone</label>
                        <input
                          type="text"
                          className="profile-text-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Rôle</label>
                        <div className="input-with-end-icon disabled">
                          <input
                            type="text"
                            className="profile-text-input"
                            value={role}
                            disabled
                          />
                          <LockOutlined className="end-icon" fontSize="small" />
                        </div>
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Date d'inscription</label>
                        <div className="input-with-end-icon disabled">
                          <input
                            type="text"
                            className="profile-text-input"
                            value={joinDate}
                            disabled
                          />
                          <CalendarTodayOutlined className="end-icon" fontSize="small" />
                        </div>
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Statut</label>
                        <div className="select-with-arrow">
                          <select
                            className="profile-select-input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="Actif">Actif</option>
                            <option value="Inactif">Inactif</option>
                          </select>
                          <KeyboardArrowDown className="select-arrow-icon" fontSize="small" />
                        </div>
                      </div>
                    </div>

                    <div className="form-submit-row">
                      <button type="submit" className="btn-save-profile">
                        <SaveOutlined fontSize="small" />
                        <span>Enregistrer les modifications</span>
                      </button>
                    </div>

                    {/* Section 2: Informations supplémentaires */}
                    <div className="profile-section-header mt-5">
                      <h4 className="section-title">Informations supplémentaires</h4>
                    </div>

                    <div className="form-grid-2">
                      <div className="profile-input-group">
                        <label className="profile-input-label">Langue</label>
                        <div className="select-with-arrow">
                          <select
                            className="profile-select-input"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            <option value="Français">Français</option>
                            <option value="English">English</option>
                            <option value="العربية">العربية</option>
                          </select>
                          <KeyboardArrowDown className="select-arrow-icon" fontSize="small" />
                        </div>
                      </div>

                      <div className="profile-input-group">
                        <label className="profile-input-label">Fuseau horaire</label>
                        <div className="select-with-arrow">
                          <select
                            className="profile-select-input"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                          >
                            <option value="(GMT+01:00) Casablanca">(GMT+01:00) Casablanca</option>
                            <option value="(GMT+02:00) Paris">(GMT+02:00) Paris</option>
                            <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                          </select>
                          <KeyboardArrowDown className="select-arrow-icon" fontSize="small" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 2: Sécurité */}
              {activeTab === "security" && (
                <div className="profile-tab-content">
                  <div className="profile-section-header">
                    <h4 className="section-title">Sécurité du compte</h4>
                    <p className="section-subtitle">Modifiez votre mot de passe pour protéger votre compte</p>
                  </div>

                  <form onSubmit={handleUpdatePassword} className="profile-form max-w-lg">
                    <div className="profile-input-group mb-3">
                      <label className="profile-input-label">Mot de passe actuel</label>
                      <input
                        type="password"
                        className="profile-text-input"
                        placeholder="Entrez votre mot de passe actuel"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>

                    <div className="profile-input-group mb-3">
                      <label className="profile-input-label">Nouveau mot de passe</label>
                      <input
                        type="password"
                        className="profile-text-input"
                        placeholder="Entrez votre nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="profile-input-group mb-4">
                      <label className="profile-input-label">Confirmer le nouveau mot de passe</label>
                      <input
                        type="password"
                        className="profile-text-input"
                        placeholder="Confirmez votre nouveau mot de passe"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn-save-profile">
                      <VpnKeyOutlined fontSize="small" />
                      <span>Mettre à jour le mot de passe</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 3: Préférences */}
              {activeTab === "preferences" && (
                <div className="profile-tab-content">
                  <div className="profile-section-header">
                    <h4 className="section-title">Préférences d'application</h4>
                    <p className="section-subtitle">Personnalisez vos notifications et paramètres d'affichage</p>
                  </div>

                  <div className="preferences-list">
                    <div className="pref-item">
                      <div>
                        <h5 className="pref-title">Notifications par Email</h5>
                        <p className="pref-desc">Recevoir des alertes lors de nouvelles commandes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="auth-checkbox" />
                    </div>

                    <div className="pref-item">
                      <div>
                        <h5 className="pref-title">Alertes Stock Faible</h5>
                        <p className="pref-desc">Être notifié quand un produit atteint le seuil critique</p>
                      </div>
                      <input type="checkbox" defaultChecked className="auth-checkbox" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;