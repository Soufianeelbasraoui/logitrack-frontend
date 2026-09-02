import useScrollAnimation from "../../hooks/useScrollAnimation";

const ARTICLES = [
  {
    id: 1,
    title: "L'avenir de la logistique connectée",
    excerpt:
      "Comment l'IoT et les données en temps réel redéfinissent la rapidité et la fiabilité des chaînes d'approvisionnement mondiales.",
    date: "20 Août 2026",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
  },
  {
    id: 2,
    title: "5 façons d'optimiser votre Supply Chain",
    excerpt:
      "Des stratégies concrètes pour réduire vos coûts de stockage, améliorer la rotation des stocks et éliminer les goulets d'étranglement.",
    date: "18 Août 2026",
    category: "Gestion",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
  },
  {
    id: 3,
    title: "Logistique durable pour l'avenir",
    excerpt:
      "L'impact de la décarbonation du transport et des entrepôts éco-responsables sur la compétitivité à long terme des entreprises.",
    date: "16 Août 2026",
    category: "Écologie",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600",
  },
];

export default function Insights() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="insights" className="landing-section insights-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <span className="section-tag">BLOG</span>
          <h2 className="section-title">Insights & Updates</h2>
          <p className="section-desc">
            Restez informé des dernières innovations, tendances du transport et
            bonnes pratiques pour moderniser votre logistique.
          </p>

          <div className="insights-grid">
            {ARTICLES.map((article) => (
              <article key={article.id} className="insight-card">
                <div className="insight-image-wrap">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="insight-image"
                    loading="lazy"
                  />
                </div>

                <div className="insight-content" style={{ textAlign: "left" }}>
                  <div className="insight-meta">
                    <span className="insight-category">{article.category}</span>
                    <span className="insight-date">{article.date}</span>
                  </div>

                  <h3 className="insight-title">{article.title}</h3>
                  <p className="insight-excerpt">{article.excerpt}</p>

                  <a href="#hero" className="insight-link" onClick={(e) => e.preventDefault()}>
                    <span>Read More</span>
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
