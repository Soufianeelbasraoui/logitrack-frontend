import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import UserInfo from "../../../components/UserInfo/UserInfo";

const schema = yup.object({
    produitId: yup
        .number()
        .typeError("Veuillez sélectionner un produit")
        .required("Le produit est obligatoire"),

    quantite: yup
        .number()
        .typeError("La quantité est obligatoire")
        .min(1, "La quantité doit être supérieure à 0")
        .required("La quantité est obligatoire"),
});

function AddProductToOrder() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {

        api.get("/api/products?page=0&size=100")
            .then((res) => {
                setProducts(res.data.content);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Impossible de charger les produits");
            });

    }, []);

    const onSubmit = async (data) => {
        try {
            await api.post(`/api/commandes/${orderId}/products`,data);
            toast.success("Produit ajouté à la commande");
            navigate("/dashboard/Orders");
        } catch (err) {
            console.log(err);
            toast.error("Erreur lors de l'ajout du produit");
        }
    };
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">LogiTrack  </h2>
                    <UserInfo/>
                </header>

                <main className="page-content">
                    <div className="card card-form">
                        <h5 className="text-center mb-4">
                            Ajouter un produit à la commande CMD-{orderId}
                        </h5>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group mb-3">

                                <label>Produit :</label>

                                <select {...register("produitId")}>

                                    <option value="">
                                        Sélectionner un produit
                                    </option>

                                    {products.map((product) => (

                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.nom}
                                        </option>

                                    ))}

                                </select>

                                <small className="text-danger">
                                    {errors.produitId?.message}
                                </small>

                            </div>

                            <div className="form-group mb-3">

                                <label>Quantité :</label>

                                <input
                                    type="number"
                                    min="1"
                                    {...register("quantite")}
                                    placeholder="Ex: 2"
                                />

                                <small className="text-danger">
                                    {errors.quantite?.message}
                                </small>

                            </div>

                            <button
                                type="button"
                                className="btn-annuler me-3"
                                onClick={() =>
                                    navigate("/dashboard/Orders")
                                }
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="btn-enregistrer"
                            >
                                Ajouter
                            </button>

                        </form>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AddProductToOrder;