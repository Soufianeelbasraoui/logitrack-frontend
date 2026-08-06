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
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephone: yup.string().required("Le téléphone est obligatoire").min(10, "Minimum 10 chiffres").max(10, "Maximum 10 chiffres"),
  ville: yup.string().required("La ville est obligatoire"),
});

function Modifier() {
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
    const fetchClient = async () => {
      try {
        const res = await api.get(`/api/clients/${id}`);
        setValue("nom", res.data.nom);
        setValue("email", res.data.email);
        setValue("telephone", res.data.telephone);
        setValue("ville", res.data.ville);
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
      toast.success("Client modifié avec succès.");
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
          <header className="nav-container ">
            <h2 className="ms-4">LogiTrack</h2>
           <div className="me-4 ">
             <strong>{user.nom}</strong>
            <p>{user.role}</p>
           </div>
          </header>
        <main className="page-content">
             <div className="card card-form ">
                    <h5 className="text-center">Modifier nevaux Client</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Nom:</label>
                            <input type="text" placeholder="entre le Nom" {...register("nom")} />
                            <small  className="text-danger">
                               {errors.nom?.message}
                            </small>
                        </div>
                        <div className="form-group">
                            <label>email:</label>
                            <input type="email"  placeholder="entre le email"{...register("email")}/>
                            <small  className="text-danger">
                             {errors.email?.message}
                            </small>
                        </div>
                        <div className="form-group">
                            <label>telephon:</label>
                            <input type="text" placeholder="entre le tel" {...register("telephone")}/>
                            <small  className="text-danger">
                                {errors.telephone?.message}
                            </small>
                        </div>
                        <div className="form-group">
                            <label>ville:</label>
                            <input type="text" placeholder="entre le ville" {...register("ville")} />
                            <small  className="text-danger">
                                {errors.ville?.message}
                            </small>
                        </div>
                          <button type="button" className="btn-annuler me-3" onClick={() => navigate("/dashboard/Clients")} >
                               Annuler
                          </button>
                          <button type="submit" className="btn-enregistrer">
                            Enregistrer
                          </button>
                    </form>
                </div>  
        </main>

      </div>

    </div>
    )
}
export default Modifier;