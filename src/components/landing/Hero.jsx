import { useNavigate } from "react-router-dom";
import useCountUp from "../../hooks/useCountUp";

export default function Hero() {
  const navigate = useNavigate();

  // Animated counters
  const clientsCount = useCountUp(120, 2200);
  const satisfactionCount = useCountUp(98, 2000);
  const ordersCount = useCountUp(25, 2400);
  const productsCount = useCountUp(150, 2200);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="landing-container">
        <div className="hero-grid">
          {/* Left Column: Text & Stats */}
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-orange">Smart Logistics</span>
              <span className="hero-title-white">Strong Connections </span>
              <span className="hero-title-white">Global Solutions</span>
            </h1>

            <p className="hero-subtitle">
              LogiTrack est une plateforme complète de gestion logistique. Gérez vos clients,
              produits et commandes en temps réel avec sécurité JWT et contrôle des rôles.
            </p>

            <div className="hero-actions">
              <button
                className="landing-btn landing-btn-primary"
                onClick={() => navigate("/login")}
              >
                <span>Commencer</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>

              <button
                className="landing-btn landing-btn-outline"
                onClick={() => scrollToSection("services")}
              >
                En savoir plus
              </button>
            </div>

            {/* 4 Stats Cards */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <div className="hero-stat-number">{clientsCount}+</div>
                <div className="hero-stat-label">Clients</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-number">{satisfactionCount}%</div>
                <div className="hero-stat-label">Satisfaction</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-number">{ordersCount}K+</div>
                <div className="hero-stat-label">Commandes</div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-number">{productsCount}+</div>
                <div className="hero-stat-label">Produits</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="hero-image-wrapper">
            <div className="hero-image-card">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
                alt="Logistics warehouse and automated transport"
                className="hero-image"
                loading="eager"
              />
              <div className="hero-image-overlay-badge">
                <div className="hero-badge-icon">⚡</div>
                <div>
                  <div className="hero-badge-text-title">Opérations en temps réel</div>
                  <div className="hero-badge-text-subtitle">Monitoring 24/7 de vos expéditions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
