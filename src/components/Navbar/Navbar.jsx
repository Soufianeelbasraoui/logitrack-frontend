import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import UserInfo from "../UserInfo/UserInfo";

function Navbar({ title = "Tableau de bord" }) {
  return (
    <header className="nav-container">
      <div className="nav-left-section">
        <button className="nav-menu-btn" aria-label="Menu">
          <MenuRoundedIcon />
        </button>
        <h1 className="nav-page-title">{title}</h1>
      </div>

      <UserInfo />
    </header>
  );
}

export default Navbar;
