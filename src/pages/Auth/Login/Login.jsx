import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../LeftPanel/LeftPanel";
import * as yup from "yup";
import "./Login.css";
import api from "../../../api/axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  MailOutlineOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";

const schema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      if (rememberMe) {
        localStorage.setItem("remember_email", data.email);
      }
      toast.success("Connexion réussie");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="auth-page-container">
      <LeftPanel />

      <div className="auth-right-container">
        <div className="auth-card login-card-custom">
          <div className="auth-card-header">
            <h2 className="auth-title">Connexion</h2>
            <p className="auth-subtitle">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
            {/* Email Field */}
            <div className="auth-form-group">
              <label className="auth-label">Email</label>
              <div className={`auth-input-wrapper ${errors.email ? "has-error" : ""}`}>
                <span className="auth-input-icon left-icon">
                  <MailOutlineOutlined fontSize="small" />
                </span>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Entrez votre email"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="auth-error-text">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <label className="auth-label">Mot de passe</label>
              <div className={`auth-input-wrapper ${errors.password ? "has-error" : ""}`}>
                <span className="auth-input-icon left-icon">
                  <LockOutlined fontSize="small" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Entrez votre mot de passe"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Afficher/Masquer le mot de passe"
                >
                  {showPassword ? (
                    <VisibilityOffOutlined fontSize="small" />
                  ) : (
                    <VisibilityOutlined fontSize="small" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="auth-error-text">{errors.password.message}</span>
              )}
            </div>

            {/* Options: Remember Me & Forgot Password */}
            <div className="auth-options-row">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Se souvenir de moi</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Contactez votre administrateur.");
                }}
                className="auth-forgot-link"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>ou</span>
          </div>

          {/* Footer Text */}
          <div className="auth-footer-prompt">
            Vous n'avez pas de compte ?{" "}
            <Link to="/register" className="auth-link">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;