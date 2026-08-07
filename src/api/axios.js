import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Session expirée. Veuillez vous reconnecter.");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Accès interdit.");
        window.location.href="/unauthorized"
      } else if (status === 404) {
        toast.error("Ressource introuvable.");
      } else if (status === 500) {
        toast.error("Erreur interne du serveur.");
      }
    } else {
      toast.error("Impossible de contacter le serveur.");
    }
    return Promise.reject(error);
  }
);

export default api;