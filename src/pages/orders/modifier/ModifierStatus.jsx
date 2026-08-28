import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import "../../products/Ajouter/AjouterProduits.css";
import "../../../pages/Style.css";

const schema = yup.object({
  statut: yup.string().required("Le statut est obligatoire"),
});

function ModifierStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    api
      .get(`/api/commandes/${id}`)
      .then((res) => {
        if (res.data?.statut) {
          setValue("statut", res.data.statut);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Impossible de charger la commande.");
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/commandes/${id}/status`, data.statut);
      toast.success("Statut modifié avec succès !");
      navigate("/dashboard/Orders");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la modification du statut.");
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
                <div
                  className="form-header-icon-box"
                  style={{ backgroundColor: "#fef3c7", color: "#d97706" }}
                >
                  <EditNoteOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Modifier le statut de la commande</h3>
                  <p className="form-subtitle">Commande #CMD-{id}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="statut">Nouveau statut :</label>
                  <select id="statut" {...register("statut")}>
                    <option value="">Sélectionner un statut...</option>
                    <option value="EN_ATTENTE">En attente (EN_ATTENTE)</option>
                    <option value="EXPEDIEE">Expédiée (EXPEDIEE)</option>
                    <option value="LIVREE">Livrée (LIVREE)</option>
                    <option value="ANNULEE">Annulée (ANNULEE)</option>
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
                    {isSubmitting ? "Enregistrement..." : "Mettre à jour le statut"}
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

export default ModifierStatus;