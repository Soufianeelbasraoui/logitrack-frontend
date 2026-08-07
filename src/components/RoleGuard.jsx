import { Navigate } from "react-router-dom";

function RoleGuard({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized"  />;
  }
  return children;
}

export default RoleGuard;