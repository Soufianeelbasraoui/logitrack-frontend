import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RoleGuard({ children, roles }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    try {
        const user = jwtDecode(token);
        if (!roles.includes(user.role)) {
            return <Navigate to="/unauthorized"/>;
        }
        return children;
    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" />;
    }
}

export default RoleGuard;