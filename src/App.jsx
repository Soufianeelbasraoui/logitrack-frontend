import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCart from "./pages/dashboard/DashboardCart";
import Clients from "./pages/clients/Clients";
import Ajouter from "./pages/clients/Ajouter/Ajouter";
import ClientDetails from "./pages/clients/Consulter/ClientDetails";
import Modifier from "./pages/clients/Modifier/Modifier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardCart />} />
        <Route path="/dashboard/Clients" element={<Clients />} />
        <Route path="/dashboard/Clients/ajouter" element={<Ajouter/>}/>
        <Route path="/dashboard/Clients/ClientDetails/:id" element={<ClientDetails/>}/>
        <Route path="/dashboard/Clients/modifier/:id" element={<Modifier/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;