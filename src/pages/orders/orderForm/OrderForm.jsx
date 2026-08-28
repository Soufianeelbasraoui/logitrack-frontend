import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import "../../products/Ajouter/AjouterProduits.css";
import "../../../pages/Style.css";

const defaultDemoClients = [
  { id: 1, nom: "Anass Berrada" },
  { id: 2, nom: "Salma Alami" },
  { id: 3, nom: "Ayoub Tazi" },
  { id: 4, nom: "Nour Benjelloun" },
  { id: 5, nom: "Youssef Hariri" },
];

const schema = yup.object({
  clientId: yup.number().typeError("Veuillez sélectionner un client").required("Le client est obligatoire"),
  statut: yup.string().required("Le statut est obligatoire"),
});

function OrderForm() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(defaultDemoClients);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { statut: "EN_ATTENTE" },
  });

  useEffect(() => {
    api
      .get("/api/clients?page=0&size=50")
      .then((res) => {
        if (res.data?.content && Array.isArray(res.data.content) && res.data.content.length > 0) {
          setClients(res.data.content);
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setClients(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post("/api/commandes", data);
      toast.success("Commande créée avec succès !");
      navigate("/dashboard/Orders");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la création de la commande.");
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Commandes" />

        <main className="page-content">
          <div className="card-form-container">
            <div className="card-form">
              <div className="form-header-row">
                <div className="form-header-icon-box">
                  <AddShoppingCartOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Créer une nouvelle commande</h3>
                  <p className="form-subtitle">Associez un client et définissez le statut initial</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="clientId">Client associé :</label>
                  <select id="clientId" {...register("clientId")}>
                    <option value="">Sélectionner un client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.nom} {client.telephone ? `(${client.telephone})` : ""}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <small className="text-danger">{errors.clientId.message}</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="statut">Statut initial :</label>
                  <select id="statut" {...register("statut")}>
                    <option value="EN_ATTENTE">En attente</option>
                    <option value="EXPEDIEE">Expédiée</option>
                    <option value="LIVREE">Livrée</option>
                  </select>
                  {errors.statut && (
                    <small className="text-danger">{errors.statut.message}</small>
                  )}
                </div>

                <div className="form-actions-row">
                  <button
                    type="button"
                    className="btn-annuler"
                    onClick={() => navigate("/dashboard/Orders")}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-enregistrer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création en cours..." : "Créer la commande"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderForm;