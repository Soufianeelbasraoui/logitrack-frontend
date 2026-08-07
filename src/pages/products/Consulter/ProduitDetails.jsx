import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

function ProduitDetails() {
  const { id } = useParams();
  const [produit, setProduit] = useState();
  const [loader, setLoader] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    api.get(`/api/products/${id}`).then((res) => {
        setProduit(res.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoader(false);
      });

  }, [id]);

  if (loader) {
    return <Loader />;
  }

  if (!produit) {
    return <p>Produit introuvable</p>;
  }
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <header className="nav-container">
          <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4">
            <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
          </div>
        </header>
        <main className="page-content">
          <div className="card p-4">
            <h3>Détails du produit</h3>
            <hr />
            <p><strong>Nom :</strong> {produit.nom}</p>
            <p><strong>Catégorie :</strong> {produit.categorie} </p>
            <p><strong>Prix :</strong> {produit.prix} </p>
            <p><strong>Quantité en stock :</strong> {produit.quantiteStock}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProduitDetails;