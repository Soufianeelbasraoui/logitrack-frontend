import { jwtDecode } from "jwt-decode";
function UserInfo() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    const user = jwtDecode(token);
    return (
        <div className="me-4">
            <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
        </div>
    );
}
export default UserInfo;