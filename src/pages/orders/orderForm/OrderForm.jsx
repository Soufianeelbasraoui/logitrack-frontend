import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import UserInfo from "../../../components/UserInfo/UserInfo";
const schema = yup.object({
  clientId: yup.number().typeError("Veuillez sélectionner un client").required("Le client est obligatoire"),
    statut: yup.string().required("Le statut est obligatoire"),
});
function OrderForm() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { statut: "EN_ATTENTE"},
  });
  useEffect(() => {
    api.get("/api/clients?page=0&size=10").then((res) => {
        setClients(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Impossible de charger les clients");
      });
  }, []);
  const onSubmit = async (data) => {
    try {
      await api.post("/api/commandes",data);
      toast.success("Commande ajoutée avec succès");
      navigate("/dashboard/orders");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout de la commande");
    }
  };
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <header className="nav-container">
          <h2 className="ms-4">LogiTrack</h2>
           <UserInfo/>
        </header>
        <main className="page-content">
          <div className="card card-form">
            <h5 className="text-center mb-4"> Ajouter une commande </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-3">
                <label>Client :</label>
                <select {...register("clientId")}>
                  <option value="">Sélectionner un client  </option>
                  {clients.map((client) => (
                    <option key={client.id}  value={client.id}>
                     {client.nom}
                    </option>
                  ))}
                </select>
                <small className="text-danger">
                  {errors.clientId?.message}
                </small>
              </div>
              <div className="form-group mb-3">
                <label>Statut :</label>
                <select {...register("statut")}>
                  <option value="EN_ATTENTE"> EN_ATTENTE </option>
                  <option value="EXPEDIEE">  EXPEDIEE </option>
                  <option value="LIVREE"> LIVREE </option>
                </select>
                <small className="text-danger">
                  {errors.statut?.message}
                </small>
              </div>
              <button  type="button" className="btn-annuler me-3"  onClick={() => navigate("/dashboard/Orders")}> Annuler</button>
              <button type="submit" className="btn-enregistrer" >Enregistrer</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderForm;