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
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/products/Products";
import AjouterProduits from "./pages/products/Ajouter/AjouterProduits";
import ProduitDetails from "./pages/products/Consulter/ProduitDetails";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import ModifierProduit from "./pages/products/Modifier/ModifierProduit";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><DashboardCart /></ProtectedRoute>} />
        <Route path="/dashboard/Clients" 
         element={
          <ProtectedRoute>
            <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
              <Clients />
            </RoleGuard>
         </ProtectedRoute>
      }/>
        <Route path="/dashboard/Clients/ajouter"
         element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                 <Ajouter/>
              </RoleGuard>
            </ProtectedRoute>
         }/>
        <Route path="/dashboard/Clients/ClientDetails/:id" 
        element={
        <ProtectedRoute>
          <RoleGuard roles={["ADMIN", "MANAGER"]}>
            <ClientDetails/>
          </RoleGuard>
        </ProtectedRoute>
        }/>
        <Route path="/dashboard/Clients/modifier/:id" 
          element={
          <ProtectedRoute>
            <RoleGuard roles={["ADMIN", "MANAGER"]}>
              <Modifier/>
            </RoleGuard>
          </ProtectedRoute>
        }/>
        <Route  path="/dashboard/Products"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <Products/>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/Products/ajouterProduits" 
        element={
          <ProtectedRoute>
            <RoleGuard roles={["ADMIN", "MANAGER"]}>
              <AjouterProduits/>
            </RoleGuard>
          </ProtectedRoute>
        }
        />
        <Route path="/dashboard/Products/ProduitDetails/:id" element={<ProtectedRoute><RoleGuard roles={["ADMIN", "MANAGER"]}><ProduitDetails/></RoleGuard></ProtectedRoute>}/>
        <Route path="/dashboard/Products/modifierProduit/:id" element={<ProtectedRoute><RoleGuard roles={["ADMIN", "MANAGER"]}><ModifierProduit/></RoleGuard></ProtectedRoute>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;