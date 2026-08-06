import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../api/axios";
import PeopleIcon from "@mui/icons-material/People";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./clients.css"
import "../Style.css"
import { Link} from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Clients(){
    const[clients,setClients]=useState([]);
    const [loader, setLoader] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    
   useEffect(() => {
     api.get("/api/clients?page=0&size=10")
    .then((res) => {
      setClients(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
   }, []);
  const handelDelet = async (id) => {
  try {
    await api.delete(`/api/clients/${id}`);
    setClients(clients.filter((item) => item.id !== id));
  } catch (err) {
    console.log(err);
  }
};
if(loader){
  return <Loader/>
}
  
    return(
    <div className="main-layout">
        <Sidebar/>
      <div className="main-content">
        <header className="nav-container ">
            <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4 ">
            <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
          </div>
        </header>
        <main className="page-content">
            <div className="nav-cleint">
                <div className="d-flex">
                  <PeopleIcon className="me-2"/>
                  <h5>Clients</h5>
                </div>
                <Link className="btn-ajouter" to="/dashboard/Clients/ajouter">Ajouter une Client</Link>
                
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
                  {clients.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.email}</td>
                      <td>{item.telephone}</td>
                      <td>{item.ville}</td>
                      <td>
                        <Link to={`/dashboard/Clients/ClientDetails/${item.id}`} className="btn-action btn-edit mx-2"><VisibilityIcon fontSize="small" /> </Link>
                        <Link to={`/dashboard/Clients/modifier/${item.id}`} className="btn-action btn-edit mx-2"><EditIcon fontSize="small" /> </Link>
                    
                        <button className="btn-action btn-delete" onClick={() => handelDelet(item.id)}>
                          <DeleteIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </main>

      </div>

    </div>
    )
}
export default Clients;