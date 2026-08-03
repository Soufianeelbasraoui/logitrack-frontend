import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../LeftPanel/LeftPanel";
import "./Register.css";
import api from "../../../api/axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup .string() .required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().min(4, "Minimum 4 caractères").required("Le mot de passe est obligatoire"),
  role: yup.string().required("Veuillez choisir un rôle"),
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/register", data);
      toast.success("Compte créé avec succès.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message ||"Erreur lors de l'inscription.");
    }

  };

  return (
    <div className="login-page">
      <LeftPanel />
      <div className="right-panel">
        <div className="register-card">
          <h2>Créer un compte</h2>
          <p>Remplissez les informations ci-dessous</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label"> Nom</label>
                <input
                  type="text"
                  className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                  placeholder="Entrez votre nom"
                  {...register("nom")}
                />
                <div className="invalid-feedback">
                  {errors.nom?.message}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className={`form-control ${errors.prenom ? "is-invalid" : ""}`}
                  placeholder="Entrez votre prénom"
                  {...register("prenom")}
                />
                <div className="invalid-feedback">
                  {errors.prenom?.message}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label"> Email </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Entrez votre email"
                {...register("email")}
              />
              <div className="invalid-feedback">
                {errors.email?.message}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">  Mot de passe</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Entrez votre mot de passe"
                {...register("password")}
              />
              <div className="invalid-feedback">
                {errors.password?.message}
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label"> Rôle</label>
              <select
                className={`form-select ${errors.role ? "is-invalid" : ""}`}
                {...register("role")}
              >
                <option value="">Choisir un rôle</option>
                <option value="ADMIN">ADMIN </option>
                <option value="MANAGER">  MANAGER</option>
                <option value="AGENT">AGENT</option>
              </select>
              <div className="invalid-feedback">
                {errors.role?.message}
              </div>
            </div>
            <button type="submit"  className="btn-register">
              Créer un compte
            </button>

          </form>
          <div className="divider">
            <span>ou</span>
          </div>
          <p className="register-text">
            Vous avez déjà un compte ?
            <Link to="/login"> Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Register;