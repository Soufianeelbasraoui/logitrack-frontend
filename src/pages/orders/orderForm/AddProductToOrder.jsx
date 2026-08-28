import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const defaultDemoProducts = [
  { id: 1, nom: "Clavier mécanique RGB", prix: 450.0 },
  { id: 2, nom: "Souris sans fil ergonomique", prix: 280.0 },
  { id: 3, nom: "Écran Gaming 27'' 165Hz", prix: 2400.0 },
  { id: 4, nom: "Imprimante Multifonction Laser", prix: 1850.0 },
  { id: 5, nom: "Casque Audio Pro Noise-Cancelling", prix: 890.0 },
];

const schema = yup.object({
  produitId: yup.number().typeError("Veuillez sélectionner un produit").required("Le produit est obligatoire"),
  quantite: yup.number().typeError("La quantité est obligatoire").min(1, "La quantité doit être supérieure à 0").required("La quantité est obligatoire"),
});

function AddProductToOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(defaultDemoProducts);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { quantite: 1 },
  });

  useEffect(() => {
    api
      .get("/api/products?page=0&size=100")
      .then((res) => {
        if (res.data?.content && Array.isArray(res.data.content) && res.data.content.length > 0) {
          setProducts(res.data.content);
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post(`/api/commandes/${orderId}/products`, data);
      toast.success("Produit ajouté à la commande avec succès !");
      navigate("/dashboard/Orders");
    } catch (err) {
      console.log(err);
      toast.error("Erreur lors de l'ajout du produit.");
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
                <div className="form-header-icon-box" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                  <AddShoppingCartOutlinedIcon fontSize="medium" />
                </div>
                <div>
                  <h3 className="form-title">Ajouter un produit à la commande</h3>
                  <p className="form-subtitle">Commande #CMD-{orderId}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="produitId">Sélectionner un produit :</label>
                  <select id="produitId" {...register("produitId")}>
                    <option value="">Sélectionner un produit...</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nom} {product.prix ? `(${product.prix} MAD)` : ""}
                      </option>
                    ))}
                  </select>
                  {errors.produitId && (
                    <small className="text-danger">{errors.produitId.message}</small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="quantite">Quantité :</label>
                  <input
                    id="quantite"
                    type="number"
                    min="1"
                    placeholder="Ex: 2"
                    {...register("quantite")}
                  />
                  {errors.quantite && (
                    <small className="text-danger">{errors.quantite.message}</small>
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
                    {isSubmitting ? "Ajout en cours..." : "Ajouter à la commande"}
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

export default AddProductToOrder;