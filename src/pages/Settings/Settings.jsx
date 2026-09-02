import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./Settings.css";
import "../Style.css";

import {
  SettingsOutlined,
  PeopleAltOutlined,
  Inventory2Outlined,
  AssignmentOutlined,
  ShieldOutlined,
  NotificationsOutlined,
  TuneOutlined,
  StorageOutlined,
  LockOutlined,
  CheckCircleOutlined,
  SaveOutlined,
  InfoOutlined,
  PersonOutlined,
  BadgeOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

// ─────────────────────────────────────────────
// Nav tabs
// ─────────────────────────────────────────────

const TABS = [
  {
    id: "general",
    label: "Général",
    icon: <TuneOutlined fontSize="small" />,
  },
  {
    id: "users",
    label: "Utilisateurs",
    icon: <PeopleAltOutlined fontSize="small" />,
  },
  {
    id: "security",
    label: "Sécurité",
    icon: <ShieldOutlined fontSize="small" />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <NotificationsOutlined fontSize="small" />,
  },
];

// ─────────────────────────────────────────────
// Toggle
// ─────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? "on" : "off"}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="settings-toggle-knob" />
    </button>
  );
}

// ─────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`settings-stat-card settings-stat-card--${color}`}>
      <div className={`settings-stat-icon settings-stat-icon--${color}`}>
        {icon}
      </div>

      <div className="settings-stat-body">
        <span className="settings-stat-value">{value}</span>
        <span className="settings-stat-label">{label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  // ───────────────────────────────────────────
  // Stats
  // ───────────────────────────────────────────

  const [stats, setStats] = useState({
    users: 0,
    clients: 0,
    products: 0,
    orders: 0,
  });

  // ───────────────────────────────────────────
  // General settings
  // ───────────────────────────────────────────

  const [appName, setAppName] = useState("LogiTrack");

  const [language, setLanguage] = useState("fr");

  const [timezone, setTimezone] =
    useState("Africa/Casablanca");

  const [dateFormat, setDateFormat] =
    useState("DD/MM/YYYY");

  const [maintenanceMode, setMaintenance] =
    useState(false);

  // ───────────────────────────────────────────
  // User settings
  // ───────────────────────────────────────────

  const [defaultRole, setDefaultRole] =
    useState("AGENT");

  const [sessionTimeout, setSessionTimeout] =
    useState(60);

  const [maxUsers, setMaxUsers] =
    useState(100);

  // ───────────────────────────────────────────
  // Security settings
  // ───────────────────────────────────────────

  const [minPwdLength, setMinPwdLength] =
    useState(8);

  const [requireUppercase, setUppercase] =
    useState(true);

  const [requireNumbers, setNumbers] =
    useState(true);

  const [requireSpecial, setSpecial] =
    useState(false);

  const [twoFactor, setTwoFactor] =
    useState(false);

  // ───────────────────────────────────────────
  // Notification settings
  // ───────────────────────────────────────────

  const [emailNotif, setEmailNotif] =
    useState(true);

  const [lowStockAlert, setLowStockAlert] =
    useState(true);

  const [newOrderAlert, setNewOrderAlert] =
    useState(true);

  const [userRegAlert, setUserRegAlert] =
    useState(false);

  const [lowStockThreshold, setThreshold] =
    useState(10);

  // ───────────────────────────────────────────
  // Charger les statistiques
  // ───────────────────────────────────────────

  useEffect(() => {
    const fetchStat = (url, key) => {
      api
        .get(url)
        .then((res) => {
          const val =
            typeof res.data === "number"
              ? res.data
              : Array.isArray(res.data)
              ? res.data.length
              : res.data?.totalElements ??
                res.data?.content?.length ??
                0;

          setStats((prev) => ({
            ...prev,
            [key]: val,
          }));
        })
        .catch((error) => {
          console.log(
            `Erreur chargement ${key}:`,
            error
          );
        });
    };

    fetchStat("/api/users/count", "users");
    fetchStat("/api/clients/count", "clients");
    fetchStat("/api/produits/count", "products");
    fetchStat("/api/commandes/count", "orders");
  }, []);

  // ───────────────────────────────────────────
  // Charger les paramètres depuis le backend
  // ───────────────────────────────────────────

  useEffect(() => {
    api
      .get("/api/settings")
      .then((res) => {
        const settings = res.data;

        setAppName(
          settings.appName ?? "LogiTrack"
        );

        setLanguage(
          settings.language ?? "fr"
        );

        setTimezone(
          settings.timezone ??
            "Africa/Casablanca"
        );

        setDateFormat(
          settings.dateFormat ??
            "DD/MM/YYYY"
        );

        setMaintenance(
          settings.maintenanceMode ?? false
        );

        setDefaultRole(
          settings.defaultRole ?? "AGENT"
        );

        setSessionTimeout(
          settings.sessionTimeout ?? 60
        );

        setMaxUsers(
          settings.maxUsers ?? 100
        );

        setMinPwdLength(
          settings.minPwdLength ?? 8
        );

        setUppercase(
          settings.requireUppercase ?? true
        );

        setNumbers(
          settings.requireNumbers ?? true
        );

        setSpecial(
          settings.requireSpecial ?? false
        );

        setTwoFactor(
          settings.twoFactor ?? false
        );

        setEmailNotif(
          settings.emailNotif ?? true
        );

        setLowStockAlert(
          settings.lowStockAlert ?? true
        );

        setNewOrderAlert(
          settings.newOrderAlert ?? true
        );

        setUserRegAlert(
          settings.userRegAlert ?? false
        );

        setThreshold(
          settings.lowStockThreshold ?? 10
        );
      })
      .catch((error) => {
        console.log(
          "Erreur chargement paramètres :",
          error
        );

        toast.error(
          "Impossible de charger les paramètres"
        );
      });
  }, []);

  // ───────────────────────────────────────────
  // Enregistrer les paramètres
  // ───────────────────────────────────────────

  const handleSave = async (section) => {
    try {
      const settings = {
        appName,
        language,
        timezone,
        dateFormat,
        maintenanceMode,

        defaultRole,
        sessionTimeout,
        maxUsers,

        minPwdLength,
        requireUppercase,
        requireNumbers,
        requireSpecial,
        twoFactor,

        emailNotif,
        lowStockAlert,
        newOrderAlert,
        userRegAlert,
        lowStockThreshold,
      };

      await api.put(
        "/api/settings",
        settings
      );

      toast.success(
        `Paramètres « ${section} » enregistrés avec succès !`
      );
    } catch (error) {
      console.log(
        "Erreur sauvegarde paramètres :",
        error
      );

      toast.error(
        "Erreur lors de l'enregistrement des paramètres"
      );
    }
  };

  // ───────────────────────────────────────────
  // JSX
  // ───────────────────────────────────────────

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Paramètres" />

        <main className="page-content">
          <div className="settings-page">

            {/* Header */}
            <div className="settings-page-header">

              <div className="settings-header-title-group">

                <div className="settings-header-icon-box">
                  <SettingsOutlined fontSize="medium" />
                </div>

                <div>
                  <h2 className="settings-page-heading">
                    Paramètres
                  </h2>

                  <p className="settings-page-subheading">
                    Configuration et administration de la plateforme
                  </p>
                </div>

              </div>

              <div className="settings-admin-badge">
                <ShieldOutlined fontSize="small" />
                <span>
                  Accès Administrateur
                </span>
              </div>

            </div>

            {/* Stats */}
            <div className="settings-stats-row">

              <StatCard
                icon={
                  <PeopleAltOutlined fontSize="small" />
                }
                label="Utilisateurs"
                value={stats.users}
                color="blue"
              />

              <StatCard
                icon={
                  <PersonOutlined fontSize="small" />
                }
                label="Clients"
                value={stats.clients}
                color="green"
              />

              <StatCard
                icon={
                  <Inventory2Outlined fontSize="small" />
                }
                label="Produits"
                value={stats.products}
                color="orange"
              />

              <StatCard
                icon={
                  <AssignmentOutlined fontSize="small" />
                }
                label="Commandes"
                value={stats.orders}
                color="purple"
              />

            </div>

            {/* Body */}
            <div className="settings-body">

              {/* Tabs */}
              <aside className="settings-tab-nav">

                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`settings-tab-btn ${
                      activeTab === tab.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveTab(tab.id)
                    }
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}

              </aside>

              {/* Panels */}
              <div className="settings-panel">

                {/* ═══════════════════════════════
                    GENERAL
                ═══════════════════════════════ */}

                {activeTab === "general" && (
                  <div className="settings-section">

                    <div className="settings-section-header">

                      <TuneOutlined />

                      <div>
                        <h3>
                          Paramètres généraux
                        </h3>

                        <p>
                          Configuration de base de l'application
                        </p>
                      </div>

                    </div>

                    <div className="settings-form-grid">

                      <div className="settings-field">

                        <label>
                          Nom de l'application
                        </label>

                        <input
                          type="text"
                          value={appName}
                          onChange={(e) =>
                            setAppName(e.target.value)
                          }
                          className="settings-input"
                        />

                      </div>

                      <div className="settings-field">

                        <label>
                          Langue de l'interface
                        </label>

                        <select
                          value={language}
                          onChange={(e) =>
                            setLanguage(e.target.value)
                          }
                          className="settings-select"
                        >
                          <option value="fr">
                            Français
                          </option>

                          <option value="en">
                            English
                          </option>

                          <option value="ar">
                            العربية
                          </option>
                        </select>

                      </div>

                      <div className="settings-field">

                        <label>
                          Fuseau horaire
                        </label>

                        <select
                          value={timezone}
                          onChange={(e) =>
                            setTimezone(e.target.value)
                          }
                          className="settings-select"
                        >
                          <option value="Africa/Casablanca">
                            Africa/Casablanca (GMT+1)
                          </option>

                          <option value="Europe/Paris">
                            Europe/Paris (GMT+2)
                          </option>

                          <option value="UTC">
                            UTC (GMT+0)
                          </option>
                        </select>

                      </div>

                      <div className="settings-field">

                        <label>
                          Format de date
                        </label>

                        <select
                          value={dateFormat}
                          onChange={(e) =>
                            setDateFormat(e.target.value)
                          }
                          className="settings-select"
                        >
                          <option value="DD/MM/YYYY">
                            DD/MM/YYYY
                          </option>

                          <option value="MM/DD/YYYY">
                            MM/DD/YYYY
                          </option>

                          <option value="YYYY-MM-DD">
                            YYYY-MM-DD
                          </option>
                        </select>

                      </div>

                    </div>

                    {/* Maintenance */}

                    <div className="settings-toggle-row">

                      <div className="settings-toggle-info">

                        <WarningAmberOutlined
                          className="toggle-warning-icon"
                          fontSize="small"
                        />

                        <div>

                          <h4>
                            Mode maintenance
                          </h4>

                          <p>
                            Désactive l'accès à la plateforme pour les non-admins
                          </p>

                        </div>

                      </div>

                      <Toggle
                        checked={maintenanceMode}
                        onChange={setMaintenance}
                      />

                    </div>

                    {/* Informations système */}

                    <div className="settings-info-box">

                      <InfoOutlined
                        fontSize="small"
                        className="info-icon"
                      />

                      <div>

                        <strong>
                          Informations système
                        </strong>

                        <ul className="settings-info-list">

                          <li>
                            <span>
                              Version API
                            </span>
                            <span>
                              v1.0.0
                            </span>
                          </li>

                          <li>
                            <span>
                              Base de données
                            </span>
                            <span>
                              MySQL 8.0
                            </span>
                          </li>

                          <li>
                            <span>
                              Backend
                            </span>
                            <span>
                              Spring Boot 3.x
                            </span>
                          </li>

                          <li>
                            <span>
                              Frontend
                            </span>
                            <span>
                              React 18 + Vite
                            </span>
                          </li>

                        </ul>

                      </div>

                    </div>

                    <div className="settings-form-actions">

                      <button
                        className="btn-settings-save"
                        onClick={() =>
                          handleSave("Général")
                        }
                      >
                        <SaveOutlined fontSize="small" />

                        <span>
                          Enregistrer les modifications
                        </span>
                      </button>

                    </div>

                  </div>
                )}

                {/* ═══════════════════════════════
                    USERS
                ═══════════════════════════════ */}

                {activeTab === "users" && (
                  <div className="settings-section">

                    <div className="settings-section-header">

                      <PeopleAltOutlined />

                      <div>

                        <h3>
                          Gestion des utilisateurs
                        </h3>

                        <p>
                          Paramètres de création et de gestion des comptes
                        </p>

                      </div>

                    </div>

                    <div className="settings-form-grid">

                      <div className="settings-field">

                        <label>
                          Rôle par défaut (nouveaux comptes)
                        </label>

                        <select
                          value={defaultRole}
                          onChange={(e) =>
                            setDefaultRole(e.target.value)
                          }
                          className="settings-select"
                        >
                          <option value="AGENT">
                            AGENT
                          </option>

                          <option value="MANAGER">
                            MANAGER
                          </option>

                          <option value="ADMIN">
                            ADMIN
                          </option>

                        </select>

                      </div>

                      <div className="settings-field">

                        <label>
                          Durée de session (minutes)
                        </label>

                        <input
                          type="number"
                          min={5}
                          max={480}
                          value={sessionTimeout}
                          onChange={(e) =>
                            setSessionTimeout(
                              Number(e.target.value)
                            )
                          }
                          className="settings-input"
                        />

                      </div>

                      <div className="settings-field">

                        <label>
                          Nombre maximum d'utilisateurs
                        </label>

                        <input
                          type="number"
                          min={1}
                          value={maxUsers}
                          onChange={(e) =>
                            setMaxUsers(
                              Number(e.target.value)
                            )
                          }
                          className="settings-input"
                        />

                      </div>

                    </div>

                    {/* Roles */}

                    <div className="settings-roles-overview">

                      <h4 className="settings-sub-title">
                        Répartition actuelle des rôles
                      </h4>

                      <div className="settings-role-bars">

                        {[
                          {
                            role: "ADMIN",
                            color: "#6366f1",
                            icon: (
                              <ShieldOutlined fontSize="small" />
                            ),
                          },
                          {
                            role: "MANAGER",
                            color: "#f59e0b",
                            icon: (
                              <BadgeOutlined fontSize="small" />
                            ),
                          },
                          {
                            role: "AGENT",
                            color: "#22c55e",
                            icon: (
                              <PersonOutlined fontSize="small" />
                            ),
                          },
                        ].map(
                          ({ role, color, icon }) => (
                            <div
                              key={role}
                              className="settings-role-bar-row"
                            >

                              <div className="role-bar-label">

                                <span style={{ color }}>
                                  {icon}
                                </span>

                                <span>
                                  {role}
                                </span>

                              </div>

                              <div className="role-bar-track">

                                <div
                                  className="role-bar-fill"
                                  style={{
                                    backgroundColor:
                                      color,
                                    width: `${
                                      stats.users > 0
                                        ? 30
                                        : 0
                                    }%`,
                                  }}
                                />

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    <div className="settings-form-actions">

                      <button
                        className="btn-settings-save"
                        onClick={() =>
                          handleSave("Utilisateurs")
                        }
                      >

                        <SaveOutlined fontSize="small" />

                        <span>
                          Enregistrer les modifications
                        </span>

                      </button>

                    </div>

                  </div>
                )}

                {/* ═══════════════════════════════
                    SECURITY
                ═══════════════════════════════ */}

                {activeTab === "security" && (
                  <div className="settings-section">

                    <div className="settings-section-header">

                      <ShieldOutlined />

                      <div>

                        <h3>
                          Politique de sécurité
                        </h3>

                        <p>
                          Règles de mot de passe et accès sécurisé
                        </p>

                      </div>

                    </div>

                    {/* Password */}

                    <div className="settings-card-inner">

                      <h4 className="settings-sub-title">

                        <LockOutlined fontSize="small" />

                        Politique de mot de passe

                      </h4>

                      <div className="settings-field mb-4">

                        <label>
                          Longueur minimale du mot de passe
                        </label>

                        <div className="settings-range-row">

                          <input
                            type="range"
                            min={6}
                            max={20}
                            value={minPwdLength}
                            onChange={(e) =>
                              setMinPwdLength(
                                Number(e.target.value)
                              )
                            }
                            className="settings-range"
                          />

                          <span className="settings-range-value">
                            {minPwdLength} caractères
                          </span>

                        </div>

                      </div>

                      <div className="settings-toggle-list">

                        {[
                          {
                            label:
                              "Majuscule obligatoire",
                            desc:
                              "Le mot de passe doit contenir au moins une majuscule",
                            val: requireUppercase,
                            set: setUppercase,
                          },
                          {
                            label:
                              "Chiffre obligatoire",
                            desc:
                              "Le mot de passe doit contenir au moins un chiffre",
                            val: requireNumbers,
                            set: setNumbers,
                          },
                          {
                            label:
                              "Caractère spécial",
                            desc:
                              "Le mot de passe doit contenir un caractère spécial",
                            val: requireSpecial,
                            set: setSpecial,
                          },
                        ].map(
                          ({
                            label,
                            desc,
                            val,
                            set,
                          }) => (
                            <div
                              key={label}
                              className="settings-toggle-row"
                            >

                              <div className="settings-toggle-info">

                                <CheckCircleOutlined
                                  fontSize="small"
                                  className="check-icon"
                                />

                                <div>

                                  <h4>
                                    {label}
                                  </h4>

                                  <p>
                                    {desc}
                                  </p>

                                </div>

                              </div>

                              <Toggle
                                checked={val}
                                onChange={set}
                              />

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    {/* 2FA */}

                    <div className="settings-card-inner mt-4">

                      <h4 className="settings-sub-title">

                        <StorageOutlined />

                        Authentification avancée

                      </h4>

                      <div className="settings-toggle-row">

                        <div className="settings-toggle-info">

                          <ShieldOutlined
                            fontSize="small"
                            className="check-icon"
                          />

                          <div>

                            <h4>
                              Authentification à deux facteurs (2FA)
                            </h4>

                            <p>
                              Ajouter une couche supplémentaire de sécurité pour tous les comptes
                            </p>

                          </div>

                        </div>

                        <Toggle
                          checked={twoFactor}
                          onChange={setTwoFactor}
                        />

                      </div>

                    </div>

                    <div className="settings-form-actions">

                      <button
                        className="btn-settings-save"
                        onClick={() =>
                          handleSave("Sécurité")
                        }
                      >

                        <SaveOutlined fontSize="small" />

                        <span>
                          Enregistrer la politique
                        </span>

                      </button>

                    </div>

                  </div>
                )}

                {/* ═══════════════════════════════
                    NOTIFICATIONS
                ═══════════════════════════════ */}

                {activeTab === "notifications" && (
                  <div className="settings-section">

                    <div className="settings-section-header">

                      <NotificationsOutlined />

                      <div>

                        <h3>
                          Paramètres de notifications
                        </h3>

                        <p>
                          Configurez les alertes et rappels automatiques
                        </p>

                      </div>

                    </div>

                    <div className="settings-toggle-list">

                      {[
                        {
                          label:
                            "Notifications par email",
                          desc:
                            "Recevoir des alertes par email",
                          val: emailNotif,
                          set: setEmailNotif,
                        },
                        {
                          label:
                            "Alerte stock faible",
                          desc:
                            "Être notifié quand un produit atteint le seuil critique",
                          val: lowStockAlert,
                          set: setLowStockAlert,
                        },
                        {
                          label:
                            "Nouvelles commandes",
                          desc:
                            "Être averti à chaque nouvelle commande créée",
                          val: newOrderAlert,
                          set: setNewOrderAlert,
                        },
                        {
                          label:
                            "Inscription utilisateur",
                          desc:
                            "Recevoir un email lors d'une nouvelle inscription",
                          val: userRegAlert,
                          set: setUserRegAlert,
                        },
                      ].map(
                        ({
                          label,
                          desc,
                          val,
                          set,
                        }) => (
                          <div
                            key={label}
                            className="settings-toggle-row"
                          >

                            <div className="settings-toggle-info">

                              <NotificationsOutlined
                                fontSize="small"
                                className="notif-icon"
                              />

                              <div>

                                <h4>
                                  {label}
                                </h4>

                                <p>
                                  {desc}
                                </p>

                              </div>

                            </div>

                            <Toggle
                              checked={val}
                              onChange={set}
                            />

                          </div>
                        )
                      )}

                    </div>

                    {/* Threshold */}

                    <div className="settings-card-inner mt-4">

                      <h4 className="settings-sub-title">
                        Seuil d'alerte de stock
                      </h4>

                      <div className="settings-field">

                        <label>

                          Quantité minimale avant alerte

                          <span className="field-hint">
                            (actuellement :{" "}
                            {lowStockThreshold} unités)
                          </span>

                        </label>

                        <div className="settings-range-row">

                          <input
                            type="range"
                            min={1}
                            max={100}
                            value={lowStockThreshold}
                            onChange={(e) =>
                              setThreshold(
                                Number(e.target.value)
                              )
                            }
                            className="settings-range"
                          />

                          <span className="settings-range-value">
                            {lowStockThreshold}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="settings-form-actions">

                      <button
                        className="btn-settings-save"
                        onClick={() =>
                          handleSave("Notifications")
                        }
                      >

                        <SaveOutlined fontSize="small" />

                        <span>
                          Enregistrer les notifications
                        </span>

                      </button>

                    </div>

                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;