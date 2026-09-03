import useScrollAnimation from "../../hooks/useScrollAnimation";

const PARTNERS = [
  { name: "DHL", style: { color: "#D40511", fontWeight: 900 } },
  { name: "FedEx", style: { color: "#4D148C", fontWeight: 900 } },
  { name: "Amazon", style: { color: "#FF9900", fontWeight: 800 } },
  { name: "Maersk", style: { color: "#00243D", fontWeight: 800 } },
  { name: "UPS", style: { color: "#351C15", fontWeight: 900 } },
];

export default function Partners() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="partners-section">
      <div className="landing-container">
        <div ref={sectionRef} className="reveal text-center">
          <div className="partners-title">Trusted by Leading Companies Worldwide</div>
          <div className="partners-logos-row">
            {PARTNERS.map((partner, index) => (
              <span
                key={index}
                className="partner-logo-item"
                title={partner.name}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
