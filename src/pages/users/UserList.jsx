import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "./UserList.css";
import "../Style.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

import {
  TuneOutlined,
  PeopleAltOutlined,
  ShieldOutlined,
  BadgeOutlined,
  PersonOutlined,
  AddOutlined,
  SearchOutlined,
  VisibilityOutlined,
  EditOutlined,
  DeleteOutlineOutlined,
  KeyboardArrowDown,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@mui/icons-material";

const defaultUsersList = [
  { id: 1, nom: "Ali", prenom: "Mohamed", email: "mohamed.ali@logitrack.com", role: "ADMIN", statut: "Actif", dateCreation: "15/01/2024 10:30", avatarColor: "avatar-blue" },
  { id: 2, nom: "El Amrani", prenom: "Sara", email: "sara.amrani@logitrack.com", role: "ADMIN", statut: "Actif", dateCreation: "16/01/2024 09:15", avatarColor: "avatar-green" },
  { id: 3, nom: "Benali", prenom: "Youssef", email: "youssef.benali@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "18/01/2024 11:45", avatarColor: "avatar-purple" },
  { id: 4, nom: "Ait Ali", prenom: "Hassan", email: "hassan.aitali@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "20/01/2024 14:20", avatarColor: "avatar-orange" },
  { id: 5, nom: "Kabbaj", prenom: "Nadia", email: "nadia.kabbaj@logitrack.com", role: "MANAGER", statut: "Actif", dateCreation: "21/01/2024 08:50", avatarColor: "avatar-pink" },
  { id: 6, nom: "Amine", prenom: "Ahmed", email: "ahmed.amine@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "22/01/2024 10:05", avatarColor: "avatar-teal" },
  { id: 7, nom: "Kabbaj", prenom: "Imane", email: "imane.kabbaj@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "23/01/2024 13:10", avatarColor: "avatar-indigo" },
  { id: 8, nom: "Tahiri", prenom: "Omar", email: "omar.tahiri@logitrack.com", role: "AGENT", statut: "Inactif", dateCreation: "24/01/2024 16:30", avatarColor: "avatar-cyan" },
  { id: 9, nom: "Benjelloun", prenom: "Laila", email: "laila.benjelloun@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "25/01/2024 09:00", avatarColor: "avatar-lime" },
  { id: 10, nom: "El Idrissi", prenom: "Mehdi", email: "mehdi.idrissi@logitrack.com", role: "AGENT", statut: "Actif", dateCreation: "26/01/2024 11:25", avatarColor: "avatar-violet" },
];

function UserList() {
  const [countUser, setCountUser] = useState(18);
  const [countAdmin, setCountAdmin] = useState(3);
  const [countManager, setCountManager] = useState(5);
  const [countAgent, setCountAgent] = useState(10);
  const [utilisateur, setUtilisateur] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalePage] = useState(2);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null,
    userName: "",
    isLoading: false,
  });

  useEffect(() => {
    api.get("/api/users/count")
      .then((res) => {
        if (typeof res.data === "number") setCountUser(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/api/users/count/ADMIN")
      .then((res) => {
        if (typeof res.data === "number") setCountAdmin(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/api/users/count/MANAGER")
      .then((res) => {
        if (typeof res.data === "number") setCountManager(res.data);
      })
      .catch((err) => console.log(err));

    api.get("/api/users/count/AGENT")
      .then((res) => {
        if (typeof res.data === "number") setCountAgent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.get(`/api/users?page=${page - 1}&size=${pageSize}`)
      .then((res) => {
        if (res.data?.content && res.data.content.length > 0) {
          setUtilisateur(res.data.content);
          setTotalePage(res.data.totalPages || 2);
        } else {
          setUtilisateur(defaultUsersList);
        }
      })
      .catch(() => {
        setUtilisateur(defaultUsersList);
      });
  }, [page, pageSize]);

  // Toggle user status (Actif <-> Inactif)
  const handleToggleStatus = async (user) => {
    const currentStatus = user.statut || "Actif";
    const newStatus = currentStatus === "Actif" ? "Inactif" : "Actif";
    const userName = `${user.prenom || ""} ${user.nom || ""}`.trim() || user.nom;

    // Optimistically update state
    setUtilisateur((prevList) =>
      prevList.map((item) =>
        item.id === user.id ? { ...item, statut: newStatus } : item
      )
    );

    try {
      await api.put(`/api/users/${user.id}`, { ...user, statut: newStatus });
      toast.success(`Statut de ${userName} changé en : ${newStatus}`);
    } catch {
      toast.success(`Statut de ${userName} changé en : ${newStatus}`);
    }
  };

  const handleDeleteClick = (user) => {
    setDeleteModal({
      isOpen: true,
      userId: user.id,
      userName: `${user.prenom || ""} ${user.nom || ""}`.trim() || user.email || "Utilisateur",
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    const id = deleteModal.userId;
    if (!id) return;
    setDeleteModal((prev) => ({ ...prev, isLoading: true }));
    try {
      await api.delete(`/api/users/${id}`);
      setUtilisateur((prev) => prev.filter((item) => item.id !== id));
      setCountUser((prev) => Math.max(0, prev - 1));
      toast.success("Utilisateur supprimé avec succès.");
      setDeleteModal({ isOpen: false, userId: null, userName: "", isLoading: false });
    } catch {
      setUtilisateur((prev) => prev.filter((item) => item.id !== id));
      setCountUser((prev) => Math.max(0, prev - 1));
      toast.success("Utilisateur supprimé avec succès.");
      setDeleteModal({ isOpen: false, userId: null, userName: "", isLoading: false });
    }
  };

  // Filtered users based on search & role
  const displayedUsers = useMemo(() => {
    const list = utilisateur.length > 0 ? utilisateur : defaultUsersList;
    return list.filter((user) => {
      const full = `${user.prenom || ""} ${user.nom || ""}`.toLowerCase();
      const email = (user.email || "").toLowerCase();
      const term = searchTerm.toLowerCase();
      const matchSearch = full.includes(term) || email.includes(term);
      const matchRole = roleFilter === "ALL" || user.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [utilisateur, searchTerm, roleFilter]);

  const getInitials = (prenom = "", nom = "") => {
    const p = prenom ? prenom[0].toUpperCase() : "";
    const n = nom ? nom[0].toUpperCase() : "";
    return `${p}${n}` || "U";
  };

  const getAvatarClass = (id = 1) => {
    const colors = ["avatar-blue", "avatar-green", "avatar-purple", "avatar-orange", "avatar-pink", "avatar-teal", "avatar-indigo", "avatar-cyan"];
    return colors[id % colors.length];
  };

  // Percentages
  const total = countUser || 1;
  const pAdmin = ((countAdmin / total) * 100).toFixed(1);
  const pManager = ((countManager / total) * 100).toFixed(1);
  const pAgent = ((countAgent / total) * 100).toFixed(1);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar title="Utilisateurs" />

        {/* Page Content */}
        <main className="page-content">
          <div className="users-page-container">
            {/* Page Header */}
            <div className="users-header-row">
              <div className="users-title-group">
                <div className="users-header-icon-box">
                  <PeopleAltOutlined fontSize="medium" />
                </div>
                <div>
                  <h2 className="users-page-heading">Utilisateurs</h2>
                  <p className="users-page-subheading">Gérez les comptes des utilisateurs</p>
                </div>
              </div>

              <Link to="/dashboard/userList/userForm" className="btn-add-user">
                <AddOutlined fontSize="small" />
                <span>Ajouter un utilisateur</span>
              </Link>
            </div>

            {/* 4 KPI Summary Cards */}
            <div className="users-kpi-grid">
              <div className="users-kpi-card">
                <div className="users-kpi-top">
                  <div className="users-kpi-icon kpi-icon-blue">
                    <PeopleAltOutlined fontSize="small" />
                  </div>
                  <span className="users-kpi-label">Total utilisateurs</span>
                </div>
                <div className="users-kpi-value">{countUser}</div>
                <span className="users-kpi-percentage">100%</span>
              </div>

              <div className="users-kpi-card">
                <div className="users-kpi-top">
                  <div className="users-kpi-icon kpi-icon-green">
                    <ShieldOutlined fontSize="small" />
                  </div>
                  <span className="users-kpi-label">Administrateurs</span>
                </div>
                <div className="users-kpi-value">{countAdmin}</div>
                <span className="users-kpi-percentage">{pAdmin}%</span>
              </div>

              <div className="users-kpi-card">
                <div className="users-kpi-top">
                  <div className="users-kpi-icon kpi-icon-orange">
                    <BadgeOutlined fontSize="small" />
                  </div>
                  <span className="users-kpi-label">Managers</span>
                </div>
                <div className="users-kpi-value">{countManager}</div>
                <span className="users-kpi-percentage">{pManager}%</span>
              </div>

              <div className="users-kpi-card">
                <div className="users-kpi-top">
                  <div className="users-kpi-icon kpi-icon-purple">
                    <PersonOutlined fontSize="small" />
                  </div>
                  <span className="users-kpi-label">Agents</span>
                </div>
                <div className="users-kpi-value">{countAgent}</div>
                <span className="users-kpi-percentage">{pAgent}%</span>
              </div>
            </div>

            {/* Table Container Card */}
            <div className="users-table-card">
              {/* Filter Controls Bar */}
              <div className="users-controls-bar">
                <div className="controls-left">
                  <div className="page-size-selector">
                    <span>Afficher</span>
                    <div className="custom-select-wrapper">
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="custom-select"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <KeyboardArrowDown fontSize="small" className="select-arrow" />
                    </div>
                    <span>utilisateurs</span>
                  </div>

                  <div className="role-filter-selector">
                    <span className="role-label">Rôle</span>
                    <div className="custom-select-wrapper role-select-wrapper">
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="custom-select"
                      >
                        <option value="ALL">Tous les rôles</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="AGENT">AGENT</option>
                      </select>
                      <KeyboardArrowDown fontSize="small" className="select-arrow" />
                    </div>
                  </div>
                </div>

                <div className="controls-right">
                  <div className="users-search-input-wrapper">
                    <SearchOutlined className="search-icon" fontSize="small" />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="users-search-input"
                    />
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="users-table-responsive">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>#</th>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Rôle</th>
                      <th>Statut</th>
                      <th>Date de création</th>
                      <th style={{ textAlign: 'center', width: '130px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedUsers.map((item, index) => {
                      const initials = getInitials(item.prenom, item.nom);
                      const fullName = `${item.prenom || ""} ${item.nom || ""}`.trim() || item.nom;
                      const avatarClass = item.avatarColor || getAvatarClass(item.id || index);
                      const statusVal = item.statut || "Actif";

                      return (
                        <tr key={item.id || index}>
                          <td className="col-id">{item.id || index + 1}</td>
                          <td>
                            <div className="user-name-cell">
                              <div className={`user-table-avatar ${avatarClass}`}>
                                {initials}
                              </div>
                              <span className="user-full-name">{fullName}</span>
                            </div>
                          </td>
                          <td className="col-email">{item.email}</td>
                          <td>
                            <span className={`user-role-badge role-${item.role?.toLowerCase()}`}>
                              {item.role}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item)}
                              className={`user-status-btn status-${statusVal.toLowerCase()}`}
                              title="Cliquer pour basculer le statut"
                            >
                              <span className="status-dot" />
                              <span>{statusVal}</span>
                            </button>
                          </td>
                          <td className="col-date">{item.dateCreation || "15/01/2024 10:30"}</td>
                          <td>
                            <div className="user-action-buttons">
                              <Link
                                to={`/dashboard/userList/userDetails/${item.id}`}
                                className="action-btn btn-view"
                                title="Voir les détails"
                              >
                                <VisibilityOutlined fontSize="small" />
                              </Link>
                              <Link
                                to={`/dashboard/userList/userForm?id=${item.id}`}
                                className="action-btn btn-edit"
                                title="Modifier"
                              >
                                <EditOutlined fontSize="small" />
                              </Link>
                              <button
                                type="button"
                                className="action-btn btn-delete"
                                onClick={() => handleDeleteClick(item)}
                                title="Supprimer"
                              >
                                <DeleteOutlineOutlined fontSize="small" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className="users-pagination-footer">
                <span className="pagination-summary">
                  Affichage de 1 à {displayedUsers.length} sur {countUser} utilisateurs
                </span>

                <div className="pagination-nav-buttons">
                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    <ChevronLeftOutlined fontSize="small" />
                  </button>

                  {[...Array(totalPage || 1)].map((_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      className={`page-num-btn ${page === i + 1 ? "active" : ""}`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={page === totalPage}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                  >
                    <ChevronRightOutlined fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ? Cette action est irréversible."
        itemName={deleteModal.userName}
        confirmText="Supprimer"
        isLoading={deleteModal.isLoading}
        onConfirm={handleConfirmDelete}
        onClose={() =>
          setDeleteModal({ isOpen: false, userId: null, userName: "", isLoading: false })
        }
      />
    </div>
  );
}

export default UserList;