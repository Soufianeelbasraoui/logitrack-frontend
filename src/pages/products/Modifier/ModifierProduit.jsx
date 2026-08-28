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

import "../Ajouter/AjouterProduits.css";
import "../../../pages/Style.css";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  categorie: yup.string().required("La catégorie est obligatoire"),
  prix: yup.number().typeError("Le prix doit être un nombre").required("Le prix est obligatoire").positive("Le prix doit être supérieur à 0"),
  quantiteStock: yup.number().typeError("La quantité doit être un nombre").required("La quantité est obligatoire").min(0, "La quantité doit être supérieure ou égale à 0").integer("La quantité doit être un nombre entier"),
});

function ModifierProduit() {
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
      .get(`/api/products/${id}`)
      .then((res) => {
        if (res.data) {
          setValue("nom", res.data.nom || "");
          setValue("categorie", res.data.categorie || "");
          setValue("prix", res.data.prix || 0);
          setValue("quantiteStock", res.data.quantiteStock || 0);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Impossible de charger le produit.");
      });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/api/products/${id}`, data);
      toast.success("Produit modifié avec succès !");
      navigate("/dashboard/Products");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la modification du produit.");
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Produits" />

        <main className="page-content">
          <div className="card-form-container">
            <div className="card-form">
              <div className="form-header-row">
                <div className="form-header-icon-box">
                  <EditNoteOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Modifier le produit</h3>
                  <p className="form-subtitle">Mettez à jour les informations du produit #{id}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="nom">Nom du produit :</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Entrer le nom"
                    {...register("nom")}
                  />
                  {errors.nom && <small className="text-danger">{errors.nom.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="categorie">Catégorie :</label>
                  <input
                    id="categorie"
                    type="text"
                    placeholder="Entrer la catégorie"
                    {...register("categorie")}
                  />
                  {errors.categorie && <small className="text-danger">{errors.categorie.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="prix">Prix unitaire (MAD) :</label>
                  <input
                    id="prix"
                    type="number"
                    step="0.01"
                    placeholder="Entrer le prix"
                    {...register("prix")}
                  />
                  {errors.prix && <small className="text-danger">{errors.prix.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="quantiteStock">Quantité en stock :</label>
                  <input
                    id="quantiteStock"
                    type="number"
                    placeholder="Entrer la quantité"
                    {...register("quantiteStock")}
                  />
                  {errors.quantiteStock && <small className="text-danger">{errors.quantiteStock.message}</small>}
                </div>

                <div className="form-actions-row">
                  <button
                    type="button"
                    className="btn-annuler"
                    onClick={() => navigate("/dashboard/Products")}
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

export default ModifierProduit;