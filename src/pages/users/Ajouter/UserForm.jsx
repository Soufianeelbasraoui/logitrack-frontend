import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import api from "../../../api/axios";
import "./UserForm.css";
import "../../Style.css";

import {
  Menu,
  PersonOutlineOutlined,
  MailOutlineOutlined,
  LockOutlined,
  ShieldOutlined,
  SaveOutlined,
  CloseOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material";

const schema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().when("$isEdit", {
    is: true,
    then: (s) => s.nullable(),
    otherwise: (s) => s.min(4, "Minimum 4 caractères").required("Le mot de passe est obligatoire"),
  }),
  role: yup.string().required("Le rôle est obligatoire"),
});

function UserForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const isEdit = Boolean(editId);
  const [loadingUser, setLoadingUser] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    context: { isEdit },
  });

  useEffect(() => {
    if (isEdit) {
      setLoadingUser(true);
      api.get(`/api/users/${editId}`)
        .then((res) => {
          if (res.data) {
            setValue("nom", res.data.nom || "");
            setValue("prenom", res.data.prenom || "");
            setValue("email", res.data.email || "");
            setValue("role", res.data.role || "AGENT");
            setValue("statut", res.data.statut || "Actif");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingUser(false));
    }
  }, [editId, isEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await api.put(`/api/users/${editId}`, data);
        toast.success("Utilisateur modifié avec succès !");
      } else {
        await api.post("/api/users", data);
        toast.success("Utilisateur ajouté avec succès !");
      }
      navigate("/dashboard/userList");
    } catch (err) {
      console.log(err);
      toast.error(isEdit ? "Erreur lors de la modification" : "Erreur lors de l'ajout");
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Utilisateurs" />

        <main className="page-content">
          <div className="user-form-page-container">
            <div className="user-form-card">
              <div className="user-form-header">
                <div className="form-header-icon-box">
                  <PersonOutlineOutlined />
                </div>
                <div>
                  <h3 className="form-card-title">
                    {isEdit ? "Modifier les informations" : "Ajouter un nouvel utilisateur"}
                  </h3>
                  <p className="form-card-subtitle">
                    {isEdit
                      ? "Mettez à jour les informations du compte"
                      : "Remplissez les détails pour créer un compte"}
                  </p>
                </div>
              </div>

              {loadingUser ? (
                <div className="p-4 text-center text-muted">Chargement des données...</div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="user-form-body" noValidate>
                  <div className="form-grid-2">
                    <div className="form-input-group">
                      <label className="form-field-label">Nom</label>
                      <div className={`form-field-wrapper ${errors.nom ? "has-error" : ""}`}>
                        <span className="field-icon"><PersonOutlineOutlined fontSize="small" /></span>
                        <input
                          type="text"
                          className="form-text-input"
                          placeholder="Entrez le nom"
                          {...register("nom")}
                        />
                      </div>
                      {errors.nom && <span className="field-error-text">{errors.nom.message}</span>}
                    </div>

                    <div className="form-input-group">
                      <label className="form-field-label">Prénom</label>
                      <div className={`form-field-wrapper ${errors.prenom ? "has-error" : ""}`}>
                        <span className="field-icon"><PersonOutlineOutlined fontSize="small" /></span>
                        <input
                          type="text"
                          className="form-text-input"
                          placeholder="Entrez le prénom"
                          {...register("prenom")}
                        />
                      </div>
                      {errors.prenom && <span className="field-error-text">{errors.prenom.message}</span>}
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label className="form-field-label">Email</label>
                    <div className={`form-field-wrapper ${errors.email ? "has-error" : ""}`}>
                      <span className="field-icon"><MailOutlineOutlined fontSize="small" /></span>
                      <input
                        type="email"
                        className="form-text-input"
                        placeholder="nom@logitrack.com"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && <span className="field-error-text">{errors.email.message}</span>}
                  </div>

                  {!isEdit && (
                    <div className="form-input-group">
                      <label className="form-field-label">Mot de passe</label>
                      <div className={`form-field-wrapper ${errors.password ? "has-error" : ""}`}>
                        <span className="field-icon"><LockOutlined fontSize="small" /></span>
                        <input
                          type="password"
                          className="form-text-input"
                          placeholder="Mot de passe temporaire"
                          {...register("password")}
                        />
                      </div>
                      {errors.password && <span className="field-error-text">{errors.password.message}</span>}
                    </div>
                  )}

                  <div className="form-grid-2">
                    <div className="form-input-group">
                      <label className="form-field-label">Rôle</label>
                      <div className={`form-field-wrapper ${errors.role ? "has-error" : ""}`}>
                        <span className="field-icon"><ShieldOutlined fontSize="small" /></span>
                        <select className="form-select-input" {...register("role")} defaultValue="">
                          <option value="" disabled hidden>Sélectionnez un rôle</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="AGENT">AGENT</option>
                        </select>
                        <KeyboardArrowDown className="field-arrow-icon" fontSize="small" />
                      </div>
                      {errors.role && <span className="field-error-text">{errors.role.message}</span>}
                    </div>

                    <div className="form-input-group">
                      <label className="form-field-label">Statut</label>
                      <div className="form-field-wrapper">
                        <span className="field-icon"><ShieldOutlined fontSize="small" /></span>
                        <select className="form-select-input" {...register("statut")} defaultValue="Actif">
                          <option value="Actif">Actif</option>
                          <option value="Inactif">Inactif</option>
                        </select>
                        <KeyboardArrowDown className="field-arrow-icon" fontSize="small" />
                      </div>
                    </div>
                  </div>

                  <div className="form-action-buttons">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => navigate("/dashboard/userList")}
                    >
                      <CloseOutlined fontSize="small" />
                      <span>Annuler</span>
                    </button>
                    <button type="submit" className="btn-save" disabled={isSubmitting}>
                      <SaveOutlined fontSize="small" />
                      <span>{isSubmitting ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer l'utilisateur"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserForm;