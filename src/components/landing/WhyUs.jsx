import useScrollAnimation from "../../hooks/useScrollAnimation";

const WHY_US_CHECKS = [
  "Suivi en temps réel",
  "Gestion multi-rôles (ADMIN/MANAGER/AGENT)",
  "Sécurisé avec JWT",
  "API REST documentée Swagger",
  "Dashboard interactif complet",
];

export default function WhyUs() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="why-us" className="landing-section whyus-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal">
          <div className="whyus-grid">
            {/* Left Column: Image */}
            <div className="whyus-image-container">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600"
                alt="Logistics fleet and transportation"
                className="whyus-image"
                loading="lazy"
              />
            </div>

            {/* Right Column: Text Content & Checkmarks */}
            <div className="whyus-content">
              <div>
                <span className="whyus-experience-pill">
                  <span>⭐</span>
                  <span>25+ Années d'expérience</span>
                </span>
              </div>

              <h2 className="section-title">Your Trusted Logistics Partner</h2>

              <p className="whyus-desc">
                Depuis plus de deux décennies, nous accompagnons les entreprises dans la
                digitalisation et l'optimisation de leurs flux de marchandises. Grâce à notre
                plateforme unifiée, gagnez en rapidité, réduisez vos coûts d'exploitation et
                offrez une visibilité totale à vos clients et partenaires.
              </p>

              <ul className="whyus-checklist">
                {WHY_US_CHECKS.map((item, index) => (
                  <li key={index} className="whyus-check-item">
                    <span className="whyus-check-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
