import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import UserInfo from "../../../components/UserInfo/UserInfo";

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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        api.get(`/api/commandes/${id}`)
            .then((res) => {
                setValue("statut", res.data.statut);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Impossible de charger la commande");
            });
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            await api.put(`/api/commandes/${id}/status`,data.statut );
            toast.success("Statut modifié avec succès");
            navigate("/dashboard/Orders");
        } catch (err) {
            console.log(err);
            toast.error("Erreur lors de la modification du statut");
        }
    };

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">
                        LogiTrack
                    </h2>
                    <UserInfo/>
                </header>
                <main className="page-content">
                    <div className="card card-form">
                        <h5 className="text-center mb-4">
                            Modifier le statut
                        </h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-3">
                                <label>Statut :</label>
                                <select {...register("statut")}>
                                    <option value="">
                                        Sélectionner un statut
                                    </option>
                                    <option value="EN_ATTENTE">
                                        EN_ATTENTE
                                    </option>
                                    <option value="EXPEDIEE">
                                        EXPEDIEE
                                    </option>
                                    <option value="LIVREE">
                                        LIVREE
                                    </option>
                                </select>
                                <small className="text-danger">
                                    {errors.statut?.message}
                                </small>
                            </div>
                            <button type="button" className="btn-annuler me-3" onClick={() =>  navigate("/dashboard/Orders") } > Annuler</button>
                            <button type="submit" className="btn-enregistrer" > Enregistrer</button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ModifierStatus;