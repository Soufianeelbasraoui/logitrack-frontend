import useScrollAnimation from "../../hooks/useScrollAnimation";

const INDUSTRIES_DATA = [
  {
    icon: "🏭",
    title: "Manufacturing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
  },
  {
    icon: "🛒",
    title: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
  },
  {
    icon: "🏥",
    title: "Healthcare",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600",
  },
  {
    icon: "💻",
    title: "E-commerce",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600",
  },
  {
    icon: "🚛",
    title: "Transport",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600",
  },
  {
    icon: "⛓️",
    title: "Supply Chain",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600",
  },
];

export default function Industries() {
  const sectionRef = useScrollAnimation();

  return (
    <section id="industries" className="landing-section industries-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <span className="section-tag">INDUSTRIES</span>
          <h2 className="section-title">Tailored Logistics For Every Industry</h2>
          <p className="section-desc">
            Des solutions modulaires qui s'adaptent aux défis spécifiques et aux
            exigences réglementaires de chaque secteur d'activité.
          </p>

          <div className="industries-grid">
            {INDUSTRIES_DATA.map((ind, index) => (
              <div key={index} className="industry-card">
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="industry-card-bg"
                  loading="lazy"
                />
                <div className="industry-card-overlay"></div>
                <div className="industry-card-content">
                  <span className="industry-icon">{ind.icon}</span>
                  <h3 className="industry-title">{ind.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
