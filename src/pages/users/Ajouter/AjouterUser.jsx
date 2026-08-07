import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import api from "../../../api/axios";
import "./AjouterUser.css"

const schema=yup.object({
    nom:yup.string().required("le nom est obligatoire"),
    prenom:yup.string().required("le prénom est obligatire"),
    email:yup.string().email("email invalide").required("le email est bigatoire"),
    password:yup.string().min(4).required("le passwrd est obligatoire"),
    role:yup.string().required("le role est obligatire")

})

function AjouterUser(){
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem("user"))

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const onSubmit=(data)=>{
        api.post("/api/users",data).then((res)=>{
            toast.success("user ajouter avec success");
            navigate("/dashboard/users")
        }).catch((err)=>{
            console.log(err)
            toast.error("Erreur lors de l'ajout du user")
        })
    }

    return(
        <div className="main-layout">
            <Sidebar/>
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
                    <h5 className="text-center">Ajouter une user</h5>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Nom:</label>
                            <input type="text"  {...register("nom")} placeholder="entre le nom" />
                            <small className="text-danger">{errors.nom?.message}</small>
                        </div>
                        <div className="form-group">
                            <label>Prénom:</label>
                            <input type="text" {...register("prenom")}  placeholder="enter le prénom"/>
                             <small className="text-danger">{errors.prenom?.message}</small>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                             <input type="text" {...register("email")} placeholder="entre  le email" />
                            <small className="text-danger">{errors.email?.message}</small>
                        </div>
                        <div className="form-group">
                            <input type="password" {...register("password")} placeholder="*********" />
                            <small className="text-danger">{errors.password?.message}</small>
                        </div>
                        <div className="form-gruop mb-2" >
                            <select {...register("role")}>
                                <option value="">Role</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="AGENT">AGENT</option>
                            </select>
                             <small className="text-danger">{errors.role?.message}</small>

                        </div>
                        <button type="button" className="btn-annuler me-3" onClick={() => navigate("/dashboard/users")} > Annuler</button>
                        <button type="submit"className="btn-enregistrer" >Enregistrer </button>
                    </form>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default AjouterUser;