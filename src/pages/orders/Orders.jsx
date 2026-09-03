import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";
import { toast } from "react-toastify";

// Icons
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import "./Orders.css";
import "../Style.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const defaultDemoOrders = [
  { id: 532, nomClient: "Société ABC", statut: "EN_ATTENTE", dateCommande: "30/05/2024", total: 4500.0 },
  { id: 531, nomClient: "Global Services", statut: "EXPEDIEE", dateCommande: "30/05/2024", total: 1280.0 },
  { id: 530, nomClient: "Techno SARL", statut: "LIVREE", dateCommande: "29/05/2024", total: 6400.0 },
  { id: 529, nomClient: "Entreprise X", statut: "EN_ATTENTE", dateCommande: "29/05/2024", total: 950.0 },
  { id: 528, nomClient: "Solutions PLUS", statut: "EXPEDIEE", dateCommande: "29/05/2024", total: 3200.0 },
  { id: 527, nomClient: "Atlas Distribution", statut: "LIVREE", dateCommande: "28/05/2024", total: 5100.0 },
  { id: 526, nomClient: "Maghreb Tech", statut: "ANNULEE", dateCommande: "27/05/2024", total: 720.0 },
  { id: 525, nomClient: "Nexus Informatique", statut: "LIVREE", dateCommande: "26/05/2024", total: 8900.0 },
];

function Orders() {
  const [orders, setOrders] = useState(defaultDemoOrders);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(2);
  const [totalElements, setTotalElements] = useState(16);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("id");
  const [searchClient, setSearchClient] = useState("");
  const [, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    orderId: null,
    orderLabel: "",
    isLoading: false,
  });

  // Fetch orders from backend
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      let res;
      if (statusFilter && statusFilter !== "ALL") {
        res = await api.get(`/api/commandes/search?statut=${statusFilter}&page=${page - 1}&size=${pageSize}`);
      } else if (searchClient.trim()) {
        res = await api.get(`/api/commandes/search/client?nom=${encodeURIComponent(searchClient.trim())}&page=${page - 1}&size=${pageSize}`);
      } else {
        res = await api.get(`/api/commandes?page=${page - 1}&size=${pageSize}&sortBy=${sortBy}`);
      }

      if (res?.data?.content && Array.isArray(res.data.content) && res.data.content.length > 0) {
        setOrders(res.data.content);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || res.data.content.length);
      } else if (Array.isArray(res?.data) && res.data.length > 0) {
        setOrders(res.data);
        setTotalPages(Math.ceil(res.data.length / pageSize) || 1);
        setTotalElements(res.data.length);
      } else {
        if (searchClient.trim() || statusFilter !== "ALL") {
          setOrders([]);
          setTotalElements(0);
          setTotalPages(1);
        } else {
          setOrders(defaultDemoOrders);
          setTotalPages(2);
          setTotalElements(16);
        }
      }
    } catch {
      if (!searchClient.trim() && statusFilter === "ALL") {
        setOrders(defaultDemoOrders);
        setTotalPages(2);
        setTotalElements(16);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, statusFilter, sortBy, searchClient]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle order delete click
  const handleDeleteClick = (order) => {
    setDeleteModal({
      isOpen: true,
      orderId: order.id,
      orderLabel: `Commande #${order.id} (${order.nomClient || order.client?.nom || "Client"})`,
      isLoading: false,
    });
  };

  const handleConfirmDelete = async () => {
    const id = deleteModal.orderId;
    if (!id) return;
    setDeleteModal((prev) => ({ ...prev, isLoading: true }));
    try {
      await api.delete(`/api/commandes/${id}`);
      toast.success("Commande supprimée avec succès.");
      setOrders((prev) => prev.filter((o) => o.id !== id));
      setTotalElements((prev) => Math.max(0, prev - 1));
      setDeleteModal({ isOpen: false, orderId: null, orderLabel: "", isLoading: false });
    } catch {
      toast.error("Erreur lors de la suppression de la commande.");
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Filtered orders for search
  const displayedOrders = useMemo(() => {
    return orders.filter((o) => {
      const clientName = o.nomClient || o.client?.nom || "";
      const matchSearch =
        !searchClient.trim() ||
        clientName.toLowerCase().includes(searchClient.toLowerCase()) ||
        String(o.id).includes(searchClient);
      const matchStatus =
        statusFilter === "ALL" ||
        o.statut?.toUpperCase() === statusFilter.toUpperCase();
      return matchSearch && matchStatus;
    });
  }, [orders, searchClient, statusFilter]);

  // Status badge styling helper
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

  const getInitials = (name = "") => {
    if (!name) return "CL";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const startCount = totalElements > 0 ? (page - 1) * pageSize + 1 : 0;
  const endCount = totalElements > 0 ? Math.min(page * pageSize, totalElements) : 0;

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Commandes" />

        <main className="page-content">
          {/* Header Row */}
          <div className="orders-page-header">
            <div className="orders-header-left">
              <AssignmentTurnedInOutlinedIcon className="orders-header-icon" />
              <div>
                <h2 className="orders-header-title">Commandes</h2>
                <p className="orders-header-subtitle">Suivez et gérez l'ensemble des commandes et livraisons</p>
              </div>
            </div>

            <Link className="btn-add-order" to="/dashboard/Orders/orderForm">
              <AddRoundedIcon fontSize="small" />
              <span>Ajouter commande</span>
            </Link>
          </div>

          {/* Toolbar Card */}
          <div className="orders-toolbar-card">
            <div className="orders-toolbar-left">
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Afficher</span>
              <select
                className="orders-filter-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              {/* Status Filter */}
              <select
                className="orders-filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="ALL">Tous les statuts</option>
                <option value="EN_ATTENTE">En attente</option>
                <option value="EXPEDIEE">Expédiée</option>
                <option value="LIVREE">Livrée</option>
                <option value="ANNULEE">Annulée</option>
              </select>

              {/* Sort Selector */}
              <select
                className="orders-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">Tri par défaut</option>
                <option value="dateCommande">Trier par Date</option>
                <option value="statut">Trier par Statut</option>
              </select>
            </div>

            <div className="orders-toolbar-right">
              <div className="orders-search-box">
                <SearchRoundedIcon className="orders-search-icon" />
                <input
                  type="text"
                  className="orders-search-input"
                  placeholder="Rechercher par client ou N°..."
                  value={searchClient}
                  onChange={(e) => {
                    setSearchClient(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="products-table-card">
            <div className="products-table-container">
              {displayedOrders.length === 0 ? (
                <div style={{ padding: "48px 20px", textAlign: "center", color: "#64748b" }}>
                  <p style={{ margin: 0, fontWeight: 500 }}>Aucune commande trouvée.</p>
                </div>
              ) : (
                <table className="products-table">
                  <thead>
                    <tr>
                      <th style={{ width: "110px" }}>N° Commande</th>
                      <th>Client</th>
                      <th>Statut</th>
                      <th>Date de commande</th>
                      <th style={{ width: "170px", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedOrders.map((item) => {
                      const clientName = item.nomClient || item.client?.nom || "Client";
                      return (
                        <tr key={item.id}>
                          <td>
                            <span className="order-badge-id">#CMD-{item.id}</span>
                          </td>
                          <td>
                            <div className="client-name-cell">
                              <div
                                className="client-avatar-badge"
                                style={{ backgroundColor: "#ede9fe", color: "#6366f1" }}
                              >
                                {getInitials(clientName)}
                              </div>
                              <span className="client-name-text">{clientName}</span>
                            </div>
                          </td>
                          <td>{getStatusBadge(item.statut)}</td>
                          <td style={{ color: "#475569", fontWeight: 500 }}>
                            {item.dateCommande || "30/05/2024"}
                          </td>
                          <td>
                            <div className="product-actions-group">
                              {/* Details button */}
                              <Link
                                to={`/dashboard/Orders/show/${item.id}`}
                                className="btn-action btn-action-view"
                                title="Voir les détails"
                              >
                                <VisibilityOutlinedIcon fontSize="small" />
                              </Link>

                              {/* Modifier statut */}
                              <Link
                                to={`/dashboard/Orders/modifierStatus/${item.id}`}
                                className="btn-action btn-action-edit"
                                title="Modifier le statut"
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Link>

                              {/* Add product to order */}
                              <Link
                                to={`/dashboard/Orders/add-product/${item.id}`}
                                className="btn-action btn-action-product"
                                title="Ajouter un produit"
                              >
                                <AddShoppingCartOutlinedIcon fontSize="small" />
                              </Link>

                              {/* Delete button */}
                              <button
                                type="button"
                                className="btn-action btn-action-delete"
                                onClick={() => handleDeleteClick(item)}
                                title="Supprimer la commande"
                              >
                                <DeleteOutlineRoundedIcon fontSize="small" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="clients-pagination-bar">
              <div className="clients-pagination-info">
                Affichage de {startCount} à {endCount} sur {totalElements} commandes
              </div>

              <div className="clients-pagination-controls">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  aria-label="Page précédente"
                >
                  <ChevronLeftRoundedIcon fontSize="small" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-btn ${pageNum === page ? "active" : ""}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  aria-label="Page suivante"
                >
                  <ChevronRightRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Supprimer la commande"
        message="Êtes-vous sûr de vouloir supprimer définitivement cette commande ? Cette action est irréversible."
        itemName={deleteModal.orderLabel}
        confirmText="Supprimer"
        isLoading={deleteModal.isLoading}
        onConfirm={handleConfirmDelete}
        onClose={() =>
          setDeleteModal({ isOpen: false, orderId: null, orderLabel: "", isLoading: false })
        }
      />
    </div>
  );
}

export default Orders;