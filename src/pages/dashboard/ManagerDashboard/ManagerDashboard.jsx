import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import '../AdminDashboard/AdminDashboard.css';
import {
  Inventory2Outlined,
  ShoppingCartOutlined,
  AccessTimeOutlined,
  LocalShippingOutlined,
  CalendarTodayOutlined,
  KeyboardArrowDown,
  NorthOutlined,
  SouthOutlined,
  HeadphonesOutlined,
  KeyboardAltOutlined,
  MouseOutlined,
  TvOutlined,
  PrintOutlined,
} from '@mui/icons-material';

const defaultLowStock = [
  { id: 1, nom: "Clavier sans fil", quantiteStock: 5, icon: "keyboard" },
  { id: 2, nom: "Souris optique", quantiteStock: 8, icon: "mouse" },
  { id: 3, nom: "Écran 24 pouces", quantiteStock: 3, icon: "tv" },
  { id: 4, nom: "Imprimante laser", quantiteStock: 6, icon: "print" },
];

const defaultRecentCommandes = [
  { id: 532, client: { nom: "Société ABC" }, statut: "En attente", dateCommande: "30/05/2024" },
  { id: 531, client: { nom: "Global Services" }, statut: "Expédiée", dateCommande: "30/05/2024" },
  { id: 530, client: { nom: "Techno SARL" }, statut: "Livrée", dateCommande: "29/05/2024" },
  { id: 529, client: { nom: "Entreprise X" }, statut: "En attente", dateCommande: "29/05/2024" },
  { id: 528, client: { nom: "Solutions PLUS" }, statut: "Expédiée", dateCommande: "29/05/2024" },
];

function ManagerDashboard({ displayName = "Manager" }) {
  const [countCommandes, setCountCommandes] = useState(532);
  const [enAttente, setEnAttente] = useState(78);
  const [expediee, setExpediee] = useState(312);
  const [countProduits, setCountProduits] = useState(128);
  const [lowStock, setLowStock] = useState([]);
  const [recentCommandes, setRecentCommandes] = useState([]);

  useEffect(() => {
    api.get("/api/products/count")
      .then((res) => {
        if (typeof res.data === 'number') setCountProduits(res.data);
      })
      .catch((err) => console.log("products count error:", err));

    api.get("/api/commandes/count")
      .then((res) => {
        if (typeof res.data === 'number') setCountCommandes(res.data);
      })
      .catch((err) => console.log("commandes count error:", err));

    api.get("/api/commandes/en-attente")
      .then((res) => {
        if (typeof res.data === 'number') setEnAttente(res.data);
      })
      .catch((err) => console.log("en-attente error:", err));

    api.get("/api/commandes/expediee")
      .then((res) => {
        if (typeof res.data === 'number') setExpediee(res.data);
      })
      .catch((err) => console.log("expediee error:", err));

    api.get("/api/products/low-stock?page=0&size=4")
      .then((res) => {
        if (res.data?.content && res.data.content.length > 0) {
          setLowStock(res.data.content);
        } else {
          setLowStock(defaultLowStock);
        }
      })
      .catch(() => setLowStock(defaultLowStock));

    api.get("/api/commandes/recent")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setRecentCommandes(res.data);
        } else {
          setRecentCommandes(defaultRecentCommandes);
        }
      })
      .catch(() => setRecentCommandes(defaultRecentCommandes));
  }, []);

  const getProductIcon = (nom = "", iconType = "") => {
    const lower = nom.toLowerCase();
    if (iconType === "keyboard" || lower.includes("clavier")) return <KeyboardAltOutlined fontSize="small" />;
    if (iconType === "mouse" || lower.includes("souris")) return <MouseOutlined fontSize="small" />;
    if (iconType === "tv" || lower.includes("écran") || lower.includes("ecran")) return <TvOutlined fontSize="small" />;
    if (iconType === "print" || lower.includes("imprimante")) return <PrintOutlined fontSize="small" />;
    return <Inventory2Outlined fontSize="small" />;
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-row">
        <div className="welcome-text-group">
          <h2 className="welcome-title">Bonjour, {displayName} ! 👋</h2>
          <p className="welcome-subtitle">Voici l'état des stocks et des commandes aujourd'hui.</p>
        </div>

        <div className="date-picker-btn">
          <CalendarTodayOutlined fontSize="small" className="calendar-icon" />
          <span>30 Mai 2024</span>
          <KeyboardArrowDown fontSize="small" className="chevron-icon" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-metrics-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-green">
              <Inventory2Outlined fontSize="small" />
            </div>
            <span className="kpi-label">Produits</span>
          </div>
          <div className="kpi-value">{countProduits}</div>
          <div className="kpi-trend positive">
            <NorthOutlined className="trend-arrow" />
            <span>8.3% ce mois</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-orange">
              <ShoppingCartOutlined fontSize="small" />
            </div>
            <span className="kpi-label">Commandes</span>
          </div>
          <div className="kpi-value">{countCommandes}</div>
          <div className="kpi-trend positive">
            <NorthOutlined className="trend-arrow" />
            <span>15.7% ce mois</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-blue">
              <LocalShippingOutlined fontSize="small" />
            </div>
            <span className="kpi-label">Expédiées</span>
          </div>
          <div className="kpi-value">{expediee}</div>
          <div className="kpi-trend positive">
            <NorthOutlined className="trend-arrow" />
            <span>10.1% ce mois</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-amber">
              <AccessTimeOutlined fontSize="small" />
            </div>
            <span className="kpi-label">En attente</span>
          </div>
          <div className="kpi-value">{enAttente}</div>
          <div className="kpi-trend negative">
            <SouthOutlined className="trend-arrow" />
            <span>5.2% ce mois</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">
        <div className="dashboard-card bottom-card">
          <h3 className="card-heading mb-3">Produits avec stock faible</h3>
          <div className="low-stock-list">
            {(lowStock.length > 0 ? lowStock : defaultLowStock).map((item) => (
              <div className="low-stock-item" key={item.id || item.nom}>
                <div className="low-stock-icon-box">
                  {getProductIcon(item.nom, item.icon)}
                </div>
                <div className="low-stock-info">
                  <span className="low-stock-name">{item.nom}</span>
                  <span className="low-stock-count">Stock: {item.quantiteStock} unités</span>
                </div>
                <span className="low-stock-badge">Faible</span>
              </div>
            ))}
          </div>
          <div className="bottom-card-footer">
            <Link to="/dashboard/Products" className="card-footer-link">
              Voir tous les produits
            </Link>
          </div>
        </div>

        <div className="dashboard-card bottom-card top-product-card">
          <h3 className="card-heading mb-3">Produit le plus commandé</h3>
          <div className="top-product-content">
            <div className="top-product-image-box">
              <HeadphonesOutlined style={{ fontSize: 56, color: '#1e293b' }} />
            </div>
            <div className="top-product-details">
              <h4 className="top-product-name">Casque Bluetooth</h4>
              <span className="top-product-badge">236 commandes</span>
              <p className="top-product-meta">Catégorie: Accessoires</p>
              <p className="top-product-meta">Prix: 450,00 DH</p>
            </div>
          </div>
          <div className="bottom-card-footer">
            <Link to="/dashboard/Products" className="card-footer-link">
              Voir le produit
            </Link>
          </div>
        </div>

        <div className="dashboard-card bottom-card recent-orders-card">
          <h3 className="card-heading mb-3">Commandes récentes</h3>
          <div className="recent-orders-table-wrapper">
            <table className="recent-orders-table">
              <thead>
                <tr>
                  <th>N° Commande</th>
                  <th>Client</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {(recentCommandes.length > 0 ? recentCommandes : defaultRecentCommandes).map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono">CMD-{item.id}</td>
                    <td>{item.client?.nom || "Client"}</td>
                    <td>
                      <span className={`status-pill ${item.statut?.toLowerCase().replace(" ", "-")}`}>
                        {item.statut}
                      </span>
                    </td>
                    <td className="text-muted-date">{item.dateCommande || "30/05/2024"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bottom-card-footer">
            <Link to="/dashboard/Orders" className="card-footer-link">
              Voir toutes les commandes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;