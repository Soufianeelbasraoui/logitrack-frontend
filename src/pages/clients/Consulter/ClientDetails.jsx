import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

function ClientDetails() {
  const { id } = useParams();

  const [client, setClient] = useState();
  const [loader, setLoader] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  api.get(`/api/clients/${id}`) .then((res) => {
      setClient(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
}, [id]);

  if (loader) {
    return <Loader />;
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
            <h3>Détails du client</h3>
            <hr />

            <p><strong>Nom :</strong> {client.nom}</p>
            <p><strong>Email :</strong> {client.email}</p>
            <p><strong>Téléphone :</strong> {client.telephone}</p>
            <p><strong>Ville :</strong> {client.ville}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClientDetails;