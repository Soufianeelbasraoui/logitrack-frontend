import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";

function UserDetails(){
    const user=JSON.parse(localStorage.getItem("user"));
    const {id}=useParams();
    const[alluser,setAllUsers]=useState();
    const[loader,setLoader]=useState(true);
    useEffect(()=>{
        api.get(`/api/users/${id}`).then((res)=>{
            setAllUsers(res.data);
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
           setLoader(false)
        })
    },[id])
    if(loader){
        return<Loader/>
    }
    return(
        <div className="main-layout">
            <Sidebar/>
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">LogiTrack</h2>
                    <div className="ms-4">
                        <strong>{user?.nom}</strong>
                        <p>{user?.role}</p>
                    </div>
                </header>
                <main className="page-content">
                  <div className="card p-4">
                     <h3>Détails du user</h3>
                     <hr />
                     <p><strong>Nom: </strong>{alluser.nom}</p>
                     <p><strong>Email: </strong>{alluser.email}</p>
                     <p><strong>Role: </strong>{alluser.role}</p>

                  </div>
                </main>

            </div>

        </div>
    )
}
export default UserDetails;