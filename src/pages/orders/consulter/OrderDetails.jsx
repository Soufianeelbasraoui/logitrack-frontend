import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Loader from "../../../components/Loader/Loader";
import UserInfo from "../../../components/UserInfo/UserInfo";


function OrderDetails(){
    const {id}=useParams();
    const[order,setOrder]=useState();
    const[loader,setLoader]=useState(true);
    useEffect(()=>{
        api.get(`/api/commandes/${id}`).then((res)=>{
           setOrder(res.data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
           setLoader(false)
        })
    },[id])
    if(loader){
        return <Loader/>
    }
    return(
        <div className="main-layout">
            <Sidebar></Sidebar>
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">LogiTrak</h2>
                    <UserInfo/>
                </header>
                <main className="page-content">
                <div className="card p-4">
                    <h5>Détails du commande</h5>
                    <hr />
                    <p><strong>CMD-</strong>{order.id}</p>
                    <p><strong>nom Client</strong>{order.nomClient}</p>
                    <p><strong>status</strong>{order.statut}</p>
                    <p><strong>date Commande</strong>{order.dateCommande}</p>

                </div>
            </main>
            </div>
   

        </div>
    )
}
export default OrderDetails;