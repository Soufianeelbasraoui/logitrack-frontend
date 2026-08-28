import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import './AdminDashboard.css';

import {
  PeopleAltOutlined,
  Inventory2Outlined,
  ShoppingCartOutlined,
  AccessTimeOutlined,
  LocalShippingOutlined,
  CheckCircleOutlined,
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

function AdminDashboard({ displayName = "Mohamed Ali" }) {
  const [countClients, setCountClients] = useState(256);
  const [countProduits, setCountProduits] = useState(128);
  const [countCommandes, setCountCommandes] = useState(532);
  const [enAttente, setEnAttente] = useState(78);
  const [expediee, setExpediee] = useState(312);
  const [livree, setLivree] = useState(142);
  const [annulee] = useState(0);
  const [lowStock, setLowStock] = useState([]);
  const [recentCommandes, setRecentCommandes] = useState([]);
  const [timeRange, setTimeRange] = useState("6 derniers mois");

  useEffect(() => {
    // Fetch stats with fallback to default demo numbers
    api.get("/api/clients/count")
      .then((res) => {
        if (typeof res.data === 'number') setCountClients(res.data);
      })
      .catch((err) => console.log("clients count error:", err));

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

    api.get("/api/commandes/livree")
      .then((res) => {
        if (typeof res.data === 'number') setLivree(res.data);
      })
      .catch((err) => console.log("livree error:", err));

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

  // Render product icon
  const getProductIcon = (nom = "", iconType = "") => {
    const lower = nom.toLowerCase();
    if (iconType === "keyboard" || lower.includes("clavier")) return <KeyboardAltOutlined fontSize="small" />;
    if (iconType === "mouse" || lower.includes("souris")) return <MouseOutlined fontSize="small" />;
    if (iconType === "tv" || lower.includes("écran") || lower.includes("ecran")) return <TvOutlined fontSize="small" />;
    if (iconType === "print" || lower.includes("imprimante")) return <PrintOutlined fontSize="small" />;
    return <Inventory2Outlined fontSize="small" />;
  };

  // Status breakdown calculations
  const totalStatus = enAttente + expediee + livree + annulee || 1;
  const pEnAttente = ((enAttente / totalStatus) * 100).toFixed(1);
  const pExpediee = ((expediee / totalStatus) * 100).toFixed(1);
  const pLivree = ((livree / totalStatus) * 100).toFixed(1);
  const pAnnulee = ((annulee / totalStatus) * 100).toFixed(1);

  // Today's formatted date in French
  const todayFormatted = "30 Mai 2024";

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-row">
        <div className="welcome-text-group">
          <h2 className="welcome-title">Bonjour, {displayName} ! 👋</h2>
          <p className="welcome-subtitle">Voici un aperçu de votre activité aujourd'hui.</p>
        </div>

        <div className="date-picker-btn">
          <CalendarTodayOutlined fontSize="small" className="calendar-icon" />
          <span>{todayFormatted}</span>
          <KeyboardArrowDown fontSize="small" className="chevron-icon" />
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div className="kpi-metrics-grid">
        {/* 1. Clients */}
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-purple">
              <PeopleAltOutlined fontSize="small" />
            </div>
            <span className="kpi-label">Clients</span>
          </div>
          <div className="kpi-value">{countClients}</div>
          <div className="kpi-trend positive">
            <NorthOutlined className="trend-arrow" />
            <span>12.5% ce mois</span>
          </div>
        </div>

        {/* 2. Produits */}
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

        {/* 3. Commandes */}
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

        {/* 4. En attente */}
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

        {/* 5. Expédiées */}
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

        {/* 6. Livrées */}
        <div className="kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon-wrapper kpi-emerald">
              <CheckCircleOutlined fontSize="small" />
            </div>
            <span className="kpi-label">Livrées</span>
          </div>
          <div className="kpi-value">{livree}</div>
          <div className="kpi-trend positive">
            <NorthOutlined className="trend-arrow" />
            <span>9.4% ce mois</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Charts */}
      <div className="dashboard-charts-grid">
        {/* Left Chart: Line Area Chart */}
        <div className="dashboard-card chart-card-left">
          <div className="card-header-flex">
            <h3 className="card-heading">Évolution des commandes</h3>
            <div className="time-select-wrapper">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="time-select"
              >
                <option value="6 derniers mois">6 derniers mois</option>
                <option value="30 derniers jours">30 derniers jours</option>
                <option value="Cette année">Cette année</option>
              </select>
              <KeyboardArrowDown fontSize="small" className="select-arrow" />
            </div>
          </div>

          <div className="line-chart-container">
            <svg viewBox="0 0 600 240" className="analytics-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="30" x2="580" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <text x="25" y="34" className="chart-axis-label">200</text>

              <line x1="40" y1="75" x2="580" y2="75" stroke="#f1f5f9" strokeWidth="1" />
              <text x="25" y="79" className="chart-axis-label">150</text>

              <line x1="40" y1="120" x2="580" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <text x="25" y="124" className="chart-axis-label">100</text>

              <line x1="40" y1="165" x2="580" y2="165" stroke="#f1f5f9" strokeWidth="1" />
              <text x="25" y="169" className="chart-axis-label">50</text>

              <line x1="40" y1="210" x2="580" y2="210" stroke="#f1f5f9" strokeWidth="1" />
              <text x="32" y="214" className="chart-axis-label">0</text>

              {/* Gradient Area */}
              <path
                d="M 60,147 C 120,110 160,110 190,135 C 220,160 260,140 310,145 C 360,150 400,80 440,75 C 480,70 520,105 550,110 L 550,210 L 60,210 Z"
                fill="url(#orderGradient)"
              />

              {/* Smooth Spline Curve */}
              <path
                d="M 60,147 C 120,110 160,110 190,135 C 220,160 260,140 310,145 C 360,150 400,80 440,75 C 480,70 520,105 550,110"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="60" cy="147" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="190" cy="135" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="310" cy="145" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="440" cy="75" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="550" cy="110" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />

              {/* Month Labels */}
              <text x="60" y="232" textAnchor="middle" className="chart-month-label">Déc</text>
              <text x="160" y="232" textAnchor="middle" className="chart-month-label">Jan</text>
              <text x="260" y="232" textAnchor="middle" className="chart-month-label">Fév</text>
              <text x="360" y="232" textAnchor="middle" className="chart-month-label">Mar</text>
              <text x="460" y="232" textAnchor="middle" className="chart-month-label">Avr</text>
              <text x="550" y="232" textAnchor="middle" className="chart-month-label">Mai</text>
            </svg>
          </div>
        </div>

        {/* Right Chart: Donut Chart */}
        <div className="dashboard-card chart-card-right">
          <h3 className="card-heading mb-3">Répartition des commandes par statut</h3>

          <div className="donut-chart-flex">
            {/* SVG Donut */}
            <div className="donut-svg-wrapper">
              <svg viewBox="0 0 200 200" className="donut-svg">
                {/* Background base circle */}
                <circle cx="100" cy="100" r="68" fill="none" stroke="#f1f5f9" strokeWidth="32" />

                {/* En attente (Amber ~ 14.7%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="68"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="32"
                  strokeDasharray="63 427"
                  strokeDashoffset="106"
                />

                {/* Expédiées (Blue ~ 58.6%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="68"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="32"
                  strokeDasharray="250 427"
                  strokeDashoffset="43"
                />

                {/* Livrées (Green ~ 26.7%) */}
                <circle
                  cx="100"
                  cy="100"
                  r="68"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="32"
                  strokeDasharray="114 427"
                  strokeDashoffset="-207"
                />
              </svg>
            </div>

            {/* Donut Legend */}
            <div className="donut-legend-list">
              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: "#fbbf24" }} />
                <span className="legend-name">En attente</span>
                <span className="legend-stat">{enAttente} ({pEnAttente}%)</span>
              </div>

              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: "#3b82f6" }} />
                <span className="legend-name">Expédiées</span>
                <span className="legend-stat">{expediee} ({pExpediee}%)</span>
              </div>

              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: "#10b981" }} />
                <span className="legend-name">Livrées</span>
                <span className="legend-stat">{livree} ({pLivree}%)</span>
              </div>

              <div className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: "#ef4444" }} />
                <span className="legend-name">Annulées</span>
                <span className="legend-stat">{annulee} ({pAnnulee}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: 3 Action Cards */}
      <div className="dashboard-bottom-grid">
        {/* Card 1: Low Stock */}
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

        {/* Card 2: Top Product */}
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

          {/* Mini Sparkline Curve */}
          <div className="top-product-sparkline">
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="sparkline-svg">
              <defs>
                <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,45 Q 30,50 60,38 T 120,40 T 180,18 T 240,15 T 300,40 L 300,60 L 0,60 Z"
                fill="url(#sparkGradient)"
              />
              <path
                d="M 0,45 Q 30,50 60,38 T 120,40 T 180,18 T 240,15 T 300,40"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="bottom-card-footer">
            <Link to="/dashboard/Products" className="card-footer-link">
              Voir le produit
            </Link>
          </div>
        </div>

        {/* Card 3: Recent Orders */}
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

export default AdminDashboard;