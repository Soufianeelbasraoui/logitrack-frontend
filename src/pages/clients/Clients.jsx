import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../api/axios";
import PeopleIcon from "@mui/icons-material/People";
import "./clients.css"
import "../Style.css"
import { Link } from "react-router-dom";

function Clients(){
    const[clients,setClients]=useState([]);
      const user = JSON.parse(localStorage.getItem("user"));
     const role = user?.role;
       useEffect(() => {
        api.get("/api/clients?page=0&size=10")
          .then((res) => {
            setClients(res.data.content);
            console.log(res.data.content);
          });
      }, []);
  
    return(
    <div className="main-layout">
        <Sidebar/>
      <div className="main-content">
        <header className="nav-container ">
            <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4 ">
            <strong>{user?.nom || "Utilisateur"}</strong>
            <p>{role || "Rôle"}</p>
          </div>

        </header>
        <main className="page-content">
            <div className="nav-cleint">
                <div className="d-flex">
                  <PeopleIcon className="me-2"/>
                  <h5>Clients</h5>
                </div>
                <button className="btn btn-primary p-1">Ajouter une Client</button>
            </div>
            <div className="card mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom complet</th>
                    <th>Email</th>
                    <th>Telephone</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((item)=>(
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.email}</td>
                      <td>{item.telephone}</td>
                      <td>{item.ville}</td>
                      <td>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            <Link to="" className="text-center">Voir tous les Clients</Link>
            </div>
        </main>

      </div>

    </div>
    )
}
export default Clients;