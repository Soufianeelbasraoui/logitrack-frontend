import useScrollAnimation from "../../hooks/useScrollAnimation";

const TESTIMONIALS_DATA = [
  {
    initials: "JA",
    avatarBg: "#F97316",
    name: "James Anderson",
    role: "Directeur Logistique",
    company: "Atlas Express",
    text: "LogiTrack a transformé notre gestion quotidienne. La traçabilité de nos commandes et l'inventaire en direct ont réduit nos délais de livraison de plus de 35%.",
    stars: "★★★★★",
  },
  {
    initials: "EC",
    avatarBg: "#2563EB",
    name: "Emily Carter",
    role: "Responsable Supply Chain",
    company: "Maghreb Distribution",
    text: "Interface intuitive et très rapide. Nos agents sur le terrain et nos managers collaborent désormais en toute transparence grâce aux statuts en temps réel.",
    stars: "★★★★★",
  },
  {
    initials: "MB",
    avatarBg: "#10B981",
    name: "Michael Brown",
    role: "Chef de Projet",
    company: "Casablanca Freight",
    text: "Le système de rôles ADMIN, MANAGER, AGENT est parfait pour notre équipe. La sécurité JWT et la solidité de l'API nous offrent une sérénité absolue.",
    stars: "★★★★★",
  },
];

export default function Testimonials() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="testimonials" className="landing-section testimonials-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <span className="section-tag">TÉMOIGNAGES</span>
          
          <div>
            <span className="rating-badge">
              <span>⭐</span>
              <span>Note moyenne : 4.8 / 5 sur plus de 150 avis</span>
            </span>
          </div>

          <h2 className="section-title">What Our Clients Say About Us</h2>
          <p className="section-desc">
            Découvrez pourquoi les leaders de la logistique et de la distribution
            font confiance à LogiTrack pour piloter leur croissance.
          </p>

          <div className="testimonials-grid">
            {TESTIMONIALS_DATA.map((t, index) => (
              <div key={index} className="testimonial-card">
                <div>
                  <div className="testimonial-stars">{t.stars}</div>
                  <p className="testimonial-text">"{t.text}"</p>
                </div>

                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ backgroundColor: t.avatarBg }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="testimonial-author-name">{t.name}</h4>
                    <p className="testimonial-author-role">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
