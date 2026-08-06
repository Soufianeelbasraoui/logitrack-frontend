import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../LeftPanel/LeftPanel";
import * as yup from "yup";
import "./Login.css";
import api from "../../../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

function Login() {
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
      const response = await api.post("/auth/login", data);

      if (!response.data?.token) {
        throw new Error("Token absent dans la réponse");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: response.data.role,
          nom: response.data.nom,
        })
      );

      toast.success("Connexion réussie");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      <LeftPanel />
      <div className="right-panel">
        <div className="login-card">
          <h2 className="text-center fw-bold">Connexion</h2>
          <p className="text-center text-muted mb-4">Connectez-vous à votre compte</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Entrez votre email"
                {...register("email")}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Entrez votre mot de passe"
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          <div className="divider">
            <span>ou</span>
          </div>
          <p className="register-text">
            Vous n'avez pas de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;