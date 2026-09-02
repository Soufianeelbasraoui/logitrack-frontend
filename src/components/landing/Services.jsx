import useScrollAnimation from "../../hooks/useScrollAnimation";

const SERVICES_DATA = [
  {
    icon: "👥",
    title: "Gestion Clients",
    description: "Ajoutez, modifiez et gérez tous vos clients depuis un tableau de bord centralisé.",
  },
  {
    icon: "📦",
    title: "Gestion Produits",
    description: "Suivez votre inventaire, catégories et prix en temps réel.",
  },
  {
    icon: "🚚",
    title: "Suivi Commandes",
    description: "Créez et suivez chaque commande avec statuts EN_ATTENTE, EXPEDIEE, LIVREE.",
  },
  {
    icon: "📊",
    title: "Stock Temps Réel",
    description: "Alertes automatiques sur les produits à faible stock.",
  },
  {
    icon: "📈",
    title: "Rapports & Stats",
    description: "Tableaux de bord avec métriques clés et statistiques détaillées.",
  },
  {
    icon: "🔐",
    title: "Sécurité & Rôles",
    description: "Authentification JWT avec rôles ADMIN, MANAGER, AGENT.",
  },
];

export default function Services() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="services" className="landing-section services-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <span className="section-tag">NOS SERVICES</span>
          <h2 className="section-title">End-to-End Logistics Solutions</h2>
          <p className="section-desc">
            Des outils modernes et connectés pour piloter l'ensemble de votre chaîne
            logistique avec fluidité, efficacité et précision.
          </p>

          <div className="services-grid">
            {SERVICES_DATA.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-box">
                  <span>{service.icon}</span>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
