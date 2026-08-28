import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../LeftPanel/LeftPanel";
import "./Register.css";
import "../Login/Login.css";
import api from "../../../api/axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  PersonOutlineOutlined,
  MailOutlineOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ShieldOutlined,
  PersonAddAlt1Outlined,
  KeyboardArrowDown,
} from "@mui/icons-material";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().min(4, "Minimum 4 caractères").required("Le mot de passe est obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas")
    .required("Veuillez confirmer votre mot de passe"),
  role: yup.string().required("Veuillez choisir un rôle"),
  terms: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions d'utilisation"),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const { nom, prenom, email, password, role } = data;
      await api.post("/auth/register", { nom, prenom, email, password, role });
      toast.success("Compte créé avec succès.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="auth-page-container">
      <LeftPanel />

      <div className="auth-right-container">
        <div className="auth-card register-card-custom">
          <div className="auth-card-header">
            <div className="auth-header-icon">
              <PersonAddAlt1Outlined />
            </div>
            <h2 className="auth-title">Créer un compte</h2>
            <p className="auth-subtitle">Rejoignez LogiTrack et simplifiez votre gestion.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
            {/* Nom & Prénom Row */}
            <div className="auth-form-row">
              <div className="auth-form-group">
                <label className="auth-label">Nom</label>
                <div className={`auth-input-wrapper ${errors.nom ? "has-error" : ""}`}>
                  <span className="auth-input-icon left-icon">
                    <PersonOutlineOutlined fontSize="small" />
                  </span>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Entrez votre nom"
                    {...register("nom")}
                  />
                </div>
                {errors.nom && (
                  <span className="auth-error-text">{errors.nom.message}</span>
                )}
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Prénom</label>
                <div className={`auth-input-wrapper ${errors.prenom ? "has-error" : ""}`}>
                  <span className="auth-input-icon left-icon">
                    <PersonOutlineOutlined fontSize="small" />
                  </span>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Entrez votre prénom"
                    {...register("prenom")}
                  />
                </div>
                {errors.prenom && (
                  <span className="auth-error-text">{errors.prenom.message}</span>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Mot de passe */}
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

            {/* Confirmer le mot de passe */}
            <div className="auth-form-group">
              <label className="auth-label">Confirmer le mot de passe</label>
              <div className={`auth-input-wrapper ${errors.confirmPassword ? "has-error" : ""}`}>
                <span className="auth-input-icon left-icon">
                  <LockOutlined fontSize="small" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Confirmez votre mot de passe"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Afficher/Masquer le mot de passe"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlined fontSize="small" />
                  ) : (
                    <VisibilityOutlined fontSize="small" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="auth-error-text">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Rôle */}
            <div className="auth-form-group">
              <label className="auth-label">Rôle</label>
              <div className={`auth-input-wrapper ${errors.role ? "has-error" : ""}`}>
                <span className="auth-input-icon left-icon">
                  <ShieldOutlined fontSize="small" />
                </span>
                <select
                  className="auth-select"
                  {...register("role")}
                  defaultValue=""
                >
                  <option value="" disabled hidden>Sélectionnez votre rôle</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="AGENT">AGENT</option>
                </select>
                <span className="auth-select-arrow">
                  <KeyboardArrowDown fontSize="small" />
                </span>
              </div>
              {errors.role && (
                <span className="auth-error-text">{errors.role.message}</span>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="auth-terms-row">
              <label className="auth-terms-label">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  {...register("terms")}
                />
                <span>
                  J'accepte les{" "}
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="auth-inline-link">
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="auth-inline-link">
                    politique de confidentialité
                  </a>
                </span>
              </label>
              {errors.terms && (
                <span className="auth-error-text d-block mt-1">{errors.terms.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
              <PersonAddAlt1Outlined fontSize="small" />
              <span>{isSubmitting ? "Création en cours..." : "Créer un compte"}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>ou</span>
          </div>

          {/* Footer Link */}
          <div className="auth-footer-prompt">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="auth-link">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;