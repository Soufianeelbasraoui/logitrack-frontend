import logoImg from "../../assets/logo1.png";

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="landing-footer">
      <div className="landing-container">
        <div className="footer-grid">
          {/* Col 1: About & Socials */}
          <div className="footer-col-about">
            <div className="footer-logo">
              <img src={logoImg} alt="LogiTrack Logo" className="footer-logo-img" />
              <span className="navbar-logo-text">Logi<span>Track</span></span>
            </div>
            <p className="footer-desc">
              Solution cloud tout-en-un de gestion logistique, suivi de transport
              et pilotage d'inventaire sécurisé en temps réel pour entreprises modernes.
            </p>

            <div className="footer-social-links">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Twitter / X"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("hero")}>
                  Accueil
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("services")}>
                  Services
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("why-us")}>
                  À propos
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("contact")}>
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-nav-list">
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("services")}>
                  Gestion Clients
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("services")}>
                  Gestion Produits
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("tracking")}>
                  Suivi Commandes
                </span>
              </li>
              <li>
                <span className="footer-nav-link" style={{ cursor: "pointer" }} onClick={() => scrollToSection("services")}>
                  Rapports & Stats
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Boulevard d'Anfa, Casablanca, Maroc</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <span>contact@logitrack.ma</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <span>+212 5 22 00 11 22</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 LogiTrack. Tous droits réservés.</div>
          <div>Plateforme certifiée ISO 27001 & RGPD compliant</div>
        </div>
      </div>
    </footer>
  );
}
