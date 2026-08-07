import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  categorie: yup.string().required("La catégorie est obligatoire"),
  prix: yup.number().typeError("Le prix doit être un nombre").required("Le prix est obligatoire").positive("Le prix doit être supérieur à 0"),
  quantiteStock: yup.number().required("La quantité est obligatoire").min(0, "La quantité doit être supérieure ou égale à 0") .integer("La quantité doit être un nombre entier"),
});

function ModifierProduit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
  api.get(`/api/products/${id}`).then((res) => {
      setValue("nom", res.data.nom);
      setValue("categorie", res.data.categorie);
      setValue("prix", res.data.prix);
      setValue("quantiteStock", res.data.quantiteStock);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Impossible de charger le produit.");
    });
},[id, setValue]);
  const onSubmit = async (data) => {
    try {
      await api.put(`/api/products/${id}`,data);
      toast.success("Produit modifié avec succès.");
      navigate("/dashboard/Products");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de la modification.");
    }
  };

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
          <div className="card card-form">
            <h5 className="text-center">
              Modifier le produit
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Nom :</label>
                <input
                  type="text"
                  placeholder="Entrer le nom"
                  {...register("nom")}
                />
                <small className="text-danger">
                  {errors.nom?.message}
                </small>
              </div>
              <div className="form-group">
                <label>Catégorie :</label>
                <input
                  type="text"
                  placeholder="Entrer la catégorie"
                  {...register("categorie")}
                />
                <small className="text-danger">
                  {errors.categorie?.message}
                </small>
              </div>
              <div className="form-group">
                <label>Prix :</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Entrer le prix"
                  {...register("prix")}
                />
                <small className="text-danger">
                  {errors.prix?.message}
                </small>
              </div>
              <div className="form-group">
                <label>Quantité en stock :</label>
                <input type="number"  placeholder="Entrer la quantité" {...register("quantiteStock")} />
                <small className="text-danger">
                  {errors.quantiteStock?.message}
                </small>
              </div>
              <button type="button"  className="btn-annuler me-3" onClick={() => navigate("/dashboard/Products")}> Annuler</button>
              <button type="submit" className="btn-enregistrer"> Enregistrer</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ModifierProduit;