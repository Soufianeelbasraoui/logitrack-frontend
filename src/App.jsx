import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import LandingPage from "./pages/LandingPage";

import DashboardCart from "./pages/dashboard/DashboardCart";

import Clients from "./pages/clients/Clients";
import Ajouter from "./pages/clients/Ajouter/Ajouter";
import ClientDetails from "./pages/clients/Consulter/ClientDetails";
import Modifier from "./pages/clients/Modifier/Modifier";

import Products from "./pages/products/Products";
import AjouterProduits from "./pages/products/Ajouter/AjouterProduits";
import ProduitDetails from "./pages/products/Consulter/ProduitDetails";
import ModifierProduit from "./pages/products/Modifier/ModifierProduit";

import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/Ajouter/UserForm";
import UserDetails from "./pages/users/consulter/UserDetails";

import Orders from "./pages/orders/Orders";
import OrderForm from "./pages/orders/orderForm/OrderForm";
import OrderDetails from "./pages/orders/consulter/OrderDetails";
import AddProductToOrder from "./pages/orders/orderForm/AddProductToOrder";
import ModifierStatus from "./pages/orders/modifier/ModifierStatus";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardCart />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard/Clients"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <Clients />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Clients/ajouter"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <Ajouter />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Clients/ClientDetails/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <ClientDetails />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Clients/modifier/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <Modifier />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Products"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <Products />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Products/ajouterProduits"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <AjouterProduits />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Products/ProduitDetails/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <ProduitDetails />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Products/modifierProduit/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <ModifierProduit />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/userList"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN"]}>
                <UserList />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/userList/userForm"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN"]}>
                <UserForm />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/userList/userDetails/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN"]}>
                <UserDetails />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Orders"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <Orders />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Orders/OrderForm"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <OrderForm />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Orders/show/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <OrderDetails />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Orders/add-product/:orderId"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER"]}>
                <AddProductToOrder />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Orders/modifierStatus/:id"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN", "MANAGER", "AGENT"]}>
                <ModifierStatus />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/Settings"
          element={
            <ProtectedRoute>
              <RoleGuard roles={["ADMIN"]}>
                <Settings />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

    </BrowserRouter>
  );
}

export default App;