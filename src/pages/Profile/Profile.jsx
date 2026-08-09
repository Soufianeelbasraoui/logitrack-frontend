import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserInfo from "../../components/UserInfo/UserInfo";
import "./Profile.css"

function Profile(){
    const token=localStorage.getItem("token");
    const user=jwtDecode(token);
   
    return(
        <div className="main-layout">
            <Sidebar/>
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">LogiTrack</h2>
                    <UserInfo/>
                </header>
                <main className="page-content">
                    <div className="card p-5">
                      <h4>Mon profil</h4>
                      <hr/>
                       <div className="profile-info">
                            <div>
                                <strong>Nom :</strong>
                                <span>{user?.nom || "Non disponible"}</span>
                            </div>
                            <div>
                                <strong>Email :</strong>
                                <span>{user?.sub || "Non disponible"}</span>
                            </div>
                            <div>
                                <strong>Rôle :</strong>
                                <span>{user?.role || "Non disponible"}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    )
}
export default Profile;