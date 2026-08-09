import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Ajouter.css"
import "../../Style.css"
import UserInfo from "../../../components/UserInfo/UserInfo";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  telephone: yup.string().required("Le téléphone est obligatoire").min(10, "Minimum 10 chiffres").max(10, "Maximum 10 chiffres"),
  ville: yup.string().required("La date de naissance est obligatoire"),
});

function Ajouter(){
const navigate = useNavigate();
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit=async (data)=>{
    try{
        const res= await api.post("/api/clients",data);
        toast.success("Client ajouter avec success");
        navigate("/dashboard/Clients")

    }catch(errors){
         toast.error("Erreur lors de l'ajout")
    }
  }
    
    return(
        <div className="main-layout">
            <Sidebar/>
            <div className="main-content">
                <header className="nav-container ">
                   <h2 className="ms-4">LogiTrack</h2>
                    <UserInfo/>
                </header>
            <main className="page-content">
                <div className="card card-form ">
                    <h5 className="text-center">Ajouter nevaux Client</h5>
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
export default Ajouter;