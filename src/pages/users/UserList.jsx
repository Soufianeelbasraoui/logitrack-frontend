import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from "../../api/axios";
import "./UserList.css";
import PaginationComponent from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

function UserList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [countUser, setCountUser] = useState(0);
  const [countAdmin, setCountAdmin] = useState(0);
  const [countManager, setCountManager] = useState(0);
  const [countAgent, setCountAgent] = useState(0);
  const[utilisateur,setUtilisateur]=useState([]);

  const[page,setPage]=useState(1);
  const[totalPage,setTotalePage]=useState(0);
  const[loader,setLoader]=useState(false);


  useEffect(() => {
    api.get("/api/users/count").then((res) => {
        setCountUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api.get("/api/users/count/ADMIN").then((res) => {
        setCountAdmin(res.data);
      }).catch((err) => {
        console.log(err);
      });

    api.get("/api/users/count/MANAGER").then((res) => {
        setCountManager(res.data);
      }).catch((err) => {
        console.log(err);
      });

    api.get("/api/users/count/AGENT").then((res) => {
        setCountAgent(res.data);
      }).catch((err) => {
        console.log(err);
      });  
  }, []);
  useEffect(()=>{
        api.get(`/api/users?page=${page-1}&size=10`).then((res) => {
        setUtilisateur(res.data.content);
        setTotalePage(res.data.totalPages)
       }).catch((err) => {
          console.log(err);
        }).finally(()=>{

        });
  },[page])
  const handlePageChange=(newPage)=>{
    setPage(newPage);
  }

const handelDelet=async(id)=>{
       await  api.delete(`/api/users/${id}`).then((res)=>{
        setUtilisateur(utilisateur.filter((item)=>(item.id!==id)))
      })
}

  if(loader){
    return <Loader/>
  }
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <header className="nav-container">
          <h2 className="ms-4">LogiTrack</h2>
          <div className="me-4">
            <strong>{user?.nom}</strong>
            <p>{user?.role}</p>
          </div>
        </header>
        <main className="page-content">
          <div className="nav-client">
            <h5>Utilisateurs</h5>
            <Link to="/dashboard/userList/userForm" className="btn-ajouter">Ajouter user</Link>

          </div>
          <div className="card-statustique mt-2">
            <div className="card card-box2 p-4">
              <div className="d-flex align-items-center">
                <PeopleIcon className="icons me-2 bg-primary text-white icon-box p-1" />
                <strong>Total utilisateurs</strong>
              </div>
              <strong className="mt-2 fs-4">{countUser}</strong>
            </div>
            <div className="card card-box1 p-4">
              <div className="d-flex align-items-center">
                <AdminPanelSettingsIcon className="icons me-2 bg-success text-white icon-box p-1" />
                <strong>Administrateurs</strong>
              </div>
              <strong className="mt-2 fs-4"> {countAdmin}</strong>
            </div>
            <div className="card card-box3 p-4">
              <div className="d-flex align-items-center">
                <ManageAccountsIcon className="icons me-2 bg-warning text-white icon-box p-1" />
                <strong>Managers</strong>
              </div>
              <strong className="mt-2 fs-4"> {countManager} </strong>
            </div>
            <div className="card card-box4 p-4">
              <div className="d-flex align-items-center">
                <PersonIcon className="icons me-2 bg-info text-white icon-box p-1" />
                <strong>Agents</strong>
              </div>
              <strong className="mt-2 fs-4">{countAgent} </strong>
            </div>
          </div>
           <div className="card mt-2 p-2">
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>nom</td>
                        <td>pénom</td>
                        <td>email</td>
                        <td>Role</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {utilisateur.map((item)=>(
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nom}</td>
                    <td>{item.prenom}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <Link to={`/dashboard/userList/userDetails/${item.id}`} className="btn-action1 btn-view1 mx-2"><VisibilityIcon fontSize="small"/></Link>
                      <button className="btn text-danger" onClick={()=>handelDelet(item.id)}><DeleteIcon fontSize="small"/></button>
                    </td>
                  </tr>
                ))}
                </tbody>
            </table>
            <PaginationComponent
            page={page}
            totalPages={totalPage}
            onPageChange={handlePageChange}
            />

        </div>
        </main>
       
      </div>
    </div>
  );
}

export default UserList;