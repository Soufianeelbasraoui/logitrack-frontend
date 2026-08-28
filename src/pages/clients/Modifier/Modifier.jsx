import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import "./Modifier.css";
import "../Ajouter/Ajouter.css";
import "../../Style.css";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephone: yup.string().required("Le téléphone est obligatoire").min(10, "Minimum 10 chiffres").max(10, "Maximum 10 chiffres"),
  ville: yup.string().required("La ville est obligatoire"),
});

function Modifier() {
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
    const fetchClient = async () => {
      try {
        const res = await api.get(`/api/clients/${id}`);
        if (res.data) {
          setValue("nom", res.data.nom || "");
          setValue("email", res.data.email || "");
          setValue("telephone", res.data.telephone || "");
          setValue("ville", res.data.ville || res.data.adresse || "");
        }
      } catch (err) {
        console.log(err);
        toast.error("Impossible de charger le client.");
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/clients/${id}`, data);
      toast.success("Client modifié avec succès !");
      navigate("/dashboard/Clients");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la modification.");
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Clients" />

        <main className="page-content">
          <div className="card-form-container">
            <div className="card-form">
              <div className="form-header-row">
                <div className="form-header-icon-box">
                  <EditNoteOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Modifier le client</h3>
                  <p className="form-subtitle">Mettez à jour les informations du client #{id}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="nom">Nom complet :</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Ex: Mohamed Alami"
                    {...register("nom")}
                  />
                  {errors.nom && <small className="text-danger">{errors.nom.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse Email :</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Ex: contact@example.com"
                    {...register("email")}
                  />
                  {errors.email && <small className="text-danger">{errors.email.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Numéro de Téléphone :</label>
                  <input
                    id="telephone"
                    type="text"
                    placeholder="Ex: 0612345678"
                    {...register("telephone")}
                  />
                  {errors.telephone && <small className="text-danger">{errors.telephone.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="ville">Ville / Adresse :</label>
                  <input
                    id="ville"
                    type="text"
                    placeholder="Ex: Casablanca"
                    {...register("ville")}
                  />
                  {errors.ville && <small className="text-danger">{errors.ville.message}</small>}
                </div>

                <div className="form-actions-row">
                  <button
                    type="button"
                    className="btn-annuler"
                    onClick={() => navigate("/dashboard/Clients")}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-enregistrer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
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

export default Modifier;