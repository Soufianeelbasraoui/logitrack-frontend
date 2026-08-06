import { Assignment, Inventory2 } from "@mui/icons-material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import logo from "../../../assets/logo1.png";
import "./LeftPanel.css";

function LeftPanel() {
  const features = [
    {
      icon: <PeopleAltIcon />,
      title: "Gestion des clients",
      desc: "Organisez et gérez vos clients facilement.",
    },
    {
      icon: <Inventory2 />,
      title: "Gestion des produits",
      desc: "Suivez votre inventaire en temps réel.",
    },
    {
      icon: <Assignment />,
      title: "Gestion des commandes",
      desc: "Traitez et suivez vos commandes efficacement.",
    },
  ];

  return (
    <div className="left-panel">
      <div className="left-panel-content">
        <div className="left-panel-logo">
          <img src={logo} alt="LogiTrack" className="logo" />
          <h2 className="left-panel-logo-text">
            Logi<span>Track</span>
          </h2>
        </div>
        <p className="left-panel-tagline">
          Solution complète pour la gestion des clients,
          produits et commandes.
        </p>
        <div className="left-panel-features">
          {features.map((item) => (
            <div className="feature-item" key={item.title}>
              <div className="feature-icon">{item.icon}</div>
              <div>
                <h6 className="feature-title">{item.title}</h6>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
