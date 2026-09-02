import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`landing-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="landing-container">
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={() => scrollToSection("hero")}>
            <span className="navbar-logo-icon">🚚</span>
            <span className="navbar-logo-text">LogiTrack</span>
          </div>

          <nav>
            <ul className="navbar-links">
              <li>
                <span className="navbar-link" onClick={() => scrollToSection("hero")}>
                  Accueil
                </span>
              </li>
              <li>
                <span className="navbar-link" onClick={() => scrollToSection("services")}>
                  Services
                </span>
              </li>
              <li>
                <span className="navbar-link" onClick={() => scrollToSection("tracking")}>
                  Commandes
                </span>
              </li>
              <li>
                <span className="navbar-link" onClick={() => scrollToSection("why-us")}>
                  À propos
                </span>
              </li>
              <li>
                <span className="navbar-link" onClick={() => scrollToSection("contact")}>
                  Contact
                </span>
              </li>
            </ul>
          </nav>

          <button
            className="landing-btn landing-btn-primary navbar-btn-login"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </button>

          <button
            className="navbar-hamburger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <span className="mobile-menu-link" onClick={() => scrollToSection("hero")}>
            Accueil
          </span>
          <span className="mobile-menu-link" onClick={() => scrollToSection("services")}>
            Services
          </span>
          <span className="mobile-menu-link" onClick={() => scrollToSection("tracking")}>
            Commandes
          </span>
          <span className="mobile-menu-link" onClick={() => scrollToSection("why-us")}>
            À propos
          </span>
          <span className="mobile-menu-link" onClick={() => scrollToSection("contact")}>
            Contact
          </span>
          <button
            className="landing-btn landing-btn-primary mobile-menu-btn"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </button>
        </div>
      )}
    </header>
  );
}
