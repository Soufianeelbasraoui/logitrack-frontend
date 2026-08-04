import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardCart from "./pages/dashboard/DashboardCart";
import Sidebar from "./components/Sidebar/Sidebar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardCart/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;