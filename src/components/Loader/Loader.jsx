import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>

      <p className="loader-text">Chargement...</p>
    </div>
  );
}

export default Loader;