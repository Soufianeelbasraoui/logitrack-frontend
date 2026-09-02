import { useState, useEffect } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const STEPS = [
  { id: 0, key: "EN_ATTENTE", label: "En Attente", icon: "⏳", time: "10:30 — Centre de Tri Casablanca" },
  { id: 1, key: "EXPEDIEE", label: "Expédiée", icon: "🚚", time: "14:15 — En transit vers Rabat" },
  { id: 2, key: "LIVREE", label: "Livrée", icon: "📦", time: "17:45 — Remis en main propre" },
];

export default function Tracking() {
  const sectionRef = useScrollAnimation();
  const [currentStep, setCurrentStep] = useState(1); // 0: En Attente, 1: Expédiée, 2: Livrée
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto simulation effect when toggled
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < 2 ? prev + 1 : 0));
    }, 2800);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const getProgressPercentage = () => {
    if (currentStep === 0) return 15;
    if (currentStep === 1) return 55;
    return 100;
  };

  return (
    <section id="tracking" className="landing-section tracking-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <span className="section-tag dark-tag">TRACKING EN DIRECT</span>
          <h2 className="section-title light-text">Track Your Shipment in Real-Time</h2>
          <p className="section-desc light-desc">
            Visualisez le parcours de vos colis avec précision et alertes en temps réel,
            de l'entrepôt jusqu'au destinataire final.
          </p>

          <div className="tracking-card">
            {/* Header info */}
            <div className="tracking-header">
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  Numéro de Commande
                </div>
                <div className="tracking-order-num">#LGT-2026-132</div>
              </div>

              <div className="tracking-status-badge">
                ● Statut : {STEPS[currentStep].label.toUpperCase()}
              </div>
            </div>

            {/* Details row */}
            <div className="tracking-details-grid">
              <div className="tracking-detail-item">
                <div className="tracking-detail-label">Client</div>
                <div className="tracking-detail-value">Nadia El Amrani</div>
              </div>
              <div className="tracking-detail-item">
                <div className="tracking-detail-label">Produit</div>
                <div className="tracking-detail-value">Colis Standard (x3)</div>
              </div>
              <div className="tracking-detail-item">
                <div className="tracking-detail-label">Destination</div>
                <div className="tracking-detail-value">Rabat Agdal, Maroc</div>
              </div>
            </div>

            {/* Progress Bar & Steps */}
            <div className="tracking-progress-wrapper">
              <div className="tracking-bar-background">
                <div
                  className="tracking-bar-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>

              <div className="tracking-steps">
                {STEPS.map((step) => {
                  const isCompleted = currentStep >= step.id;
                  const isActive = currentStep === step.id;

                  return (
                    <div
                      key={step.id}
                      className={`tracking-step ${isCompleted ? "completed" : ""} ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <div className="tracking-step-circle">{step.icon}</div>
                      <div className="tracking-step-title">{step.label}</div>
                      <div className="tracking-step-time">{step.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="tracking-actions">
              <button
                className="landing-btn landing-btn-primary"
                onClick={handleNextStep}
              >
                <span>Simuler l'étape suivante</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>

              <button
                className="landing-btn landing-btn-outline"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
              >
                {isAutoPlaying ? "⏸ Pause Auto-Simulation" : "▶ Démo Auto"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
