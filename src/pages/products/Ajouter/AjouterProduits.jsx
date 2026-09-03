import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import "./AjouterProduits.css";
import "../../../pages/Style.css";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  categorie: yup.string().required("La catégorie est obligatoire"),
  prix: yup.number().typeError("Le prix doit être un nombre").required("Le prix est obligatoire").positive("Le prix doit être supérieur à 0"),
  quantiteStock: yup.number().typeError("La quantité doit être un nombre").required("La quantité est obligatoire").min(0, "La quantité doit être supérieure ou égale à 0").integer("La quantité doit être un nombre entier"),
});

function AjouterProduits() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/api/products", data);
      toast.success("Produit ajouté avec succès !");
      navigate("/dashboard/Products");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'ajout du produit.");
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
                  <AddBoxOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Ajouter un nouveau produit</h3>
                  <p className="form-subtitle">Renseignez les détails du produit pour l'ajouter au stock</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="nom">Nom du produit :</label>
                  <input
                    id="nom"
                    type="text"
                    placeholder="Ex: Clavier mécanique RGB"
                    {...register("nom")}
                  />
                  {errors.nom && <small className="text-danger">{errors.nom.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="categorie">Catégorie :</label>
                  <input
                    id="categorie"
                    type="text"
                    placeholder="Ex: Périphériques, Écrans, Audio..."
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
                    placeholder="Ex: 450.00"
                    {...register("prix")}
                  />
                  {errors.prix && <small className="text-danger">{errors.prix.message}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="quantiteStock">Quantité initiale en stock :</label>
                  <input
                    id="quantiteStock"
                    type="number"
                    placeholder="Ex: 25"
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
                    className="btn btn-enregistrer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer le produit"}
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

export default AjouterProduits;
