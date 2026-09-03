import { useNavigate } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";

export default function CTA() {
  const navigate = useNavigate();
  const sectionRef = useScrollAnimation();

  const scrollToTracking = () => {
    const element = document.getElementById("tracking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="cta-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal cta-box">
          <h2 className="cta-title">Ready to Simplify Your Logistics?</h2>
          <p className="cta-subtitle">
            Rejoignez des centaines d'entreprises qui gèrent déjà leurs clients,
            produits et expéditions en toute sécurité avec LogiTrack.
          </p>

          <div className="cta-actions">
            <button
              className="landing-btn landing-btn-white"
              onClick={() => navigate("/login")}
            >
              <span>Commencer Maintenant</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>

            <button
              className="landing-btn landing-btn-outline"
              onClick={scrollToTracking}
            >
              Voir Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
