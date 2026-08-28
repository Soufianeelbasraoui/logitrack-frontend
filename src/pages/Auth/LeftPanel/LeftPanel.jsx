import { PeopleAlt, Inventory2, Assignment } from "@mui/icons-material";
import "./LeftPanel.css";

function LeftPanel() {
  const features = [
    {
      icon: <PeopleAlt fontSize="small" />,
      title: "Gestion des clients",
      desc: "Organisez et gérez vos clients facilement.",
    },
    {
      icon: <Inventory2 fontSize="small" />,
      title: "Gestion des produits",
      desc: "Suivez votre inventaire en temps réel.",
    },
    {
      icon: <Assignment fontSize="small" />,
      title: "Gestion des commandes",
      desc: "Traitez et suivez vos commandes efficacement.",
    },
  ];

  return (
    <div className="auth-left-panel">
      {/* Background Logistics Blueprint / Watermark */}
      <div className="auth-bg-illustration">
        <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="warehouse-svg">
          {/* Warehouse Outline */}
          <path d="M120 180 L200 130 L280 180 V280 H120 Z" stroke="rgba(255,255,255,0.07)" strokeWidth="2" fill="none" />
          <path d="M140 180 V280" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <path d="M170 180 V280" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <path d="M230 180 V280" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <path d="M260 180 V280" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
          <rect x="180" y="220" width="40" height="60" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <line x1="180" y1="250" x2="220" y2="250" stroke="rgba(255,255,255,0.06)" />
          {/* Warehouse Roof lines */}
          <line x1="150" y1="161" x2="150" y2="180" stroke="rgba(255,255,255,0.05)" />
          <line x1="250" y1="161" x2="250" y2="180" stroke="rgba(255,255,255,0.05)" />
          {/* Boxes */}
          <rect x="235" y="245" width="22" height="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <rect x="257" y="245" width="22" height="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <rect x="246" y="227" width="22" height="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          {/* Delivery Truck Outline */}
          <path d="M50 240 H90 V225 H115 L130 245 V270 H50 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
          <circle cx="68" cy="272" r="7" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="115" cy="272" r="7" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="90" y1="240" x2="90" y2="270" stroke="rgba(255,255,255,0.06)" />
          <rect x="94" y="230" width="16" height="12" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </svg>
      </div>

      {/* Decorative Wave at the Bottom */}
      <div className="auth-waves-container">
        <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="wave-svg">
          <path
            d="M 0,70 C 150,140 320,10 500,80 L 500,200 L 0,200 Z"
            fill="rgba(8, 48, 140, 0.45)"
          />
          <path
            d="M 0,110 C 180,60 300,160 500,100 L 500,200 L 0,200 Z"
            fill="rgba(4, 30, 95, 0.65)"
          />
          <path
            d="M 0,145 C 140,110 340,175 500,135 L 500,200 L 0,200 Z"
            fill="rgba(2, 18, 65, 0.85)"
          />
        </svg>
      </div>

      <div className="auth-left-content">
        {/* Brand Header */}
        <div className="auth-brand">
          <div className="brand-logo-icon">
            <svg width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L40 12V32L22 42L4 32V12L22 2Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
              <path d="M22 2V22M22 22L40 12M22 22L4 12" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M22 22V42" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
              <polygon points="22,7 34,14 22,21 10,14" fill="rgba(99, 179, 237, 0.25)" />
              <polygon points="10,16 22,23 22,37 10,30" fill="rgba(59, 130, 246, 0.4)" />
              <polygon points="22,23 34,16 34,30 22,37" fill="rgba(37, 99, 235, 0.6)" />
            </svg>
          </div>
          <h1 className="brand-name">Logi<span>Track</span></h1>
        </div>

        {/* Tagline */}
        <p className="auth-tagline">
          Solution complète pour la gestion des clients, produits et commandes.
        </p>

        {/* Features List */}
        <div className="auth-features-list">
          {features.map((item) => (
            <div className="auth-feature-item" key={item.title}>
              <div className="auth-feature-icon-wrapper">
                {item.icon}
              </div>
              <div className="auth-feature-text">
                <h4 className="auth-feature-title">{item.title}</h4>
                <p className="auth-feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
