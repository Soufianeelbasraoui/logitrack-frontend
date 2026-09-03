import useScrollAnimation from "../../hooks/useScrollAnimation";

const FEATURES_DATA = [
  {
    icon: "⚡",
    title: "Performance",
    description: "API REST Spring Boot ultra-rapide avec pagination et tri.",
  },
  {
    icon: "🔒",
    title: "Sécurité",
    description: "JWT + Spring Security pour protéger chaque endpoint.",
  },
  {
    icon: "📱",
    title: "Responsive",
    description: "Interface React moderne adaptée à tous les écrans.",
  },
  {
    icon: "🐳",
    title: "Docker Ready",
    description: "Déploiement simplifié avec Docker Compose complet.",
  },
];

export default function Features() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="features" className="landing-section features-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal">
          <div className="features-grid">
            {/* Left Column: Features Content */}
            <div className="features-content">
              <span className="section-tag dark-tag">POURQUOI LOGITRACK</span>
              <h2 className="section-title light-text">Fast, Reliable & Always on Time</h2>
              <p className="section-desc light-desc" style={{ margin: "0 0 24px 0" }}>
                Une architecture moderne pensée pour la scalabilité, la haute disponibilité
                et la fluidité de vos opérations quotidiennes.
              </p>

              <div className="features-list">
                {FEATURES_DATA.map((item, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-item-icon">{item.icon}</div>
                    <div>
                      <h3 className="feature-item-title">{item.title}</h3>
                      <p className="feature-item-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Container */}
            <div className="features-image-wrapper">
              <div className="features-image-card">
                <img
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600"
                  alt="Modern supply chain infrastructure"
                  className="features-image"
                  loading="lazy"
                />
                <div className="features-floating-badge">
                  <span>🚀</span>
                  <span>Haute Disponibilité 99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
