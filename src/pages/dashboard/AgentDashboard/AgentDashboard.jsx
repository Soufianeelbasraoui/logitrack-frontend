
import { useEffect, useState } from "react";
import "./AgentDashboard.css"
import api from "../../../api/axios";
function AgentDashboard(){
    const [client,setClient]=useState([]);
    const[products,setProducts]=useState([]);
    useEffect(()=>{
        api.get("/api/clients?page=0&size=10").then((res)=>{
             setClient(res.data.content)
             console.log(res.data);
        })
    },[])
    useEffect(()=>{
        try{
        api.get("/api/products?page=0&size=10").then((res)=>{
         setProducts(res.data.content);
         console.log(res.data);
        })
        }catch(err){
            console.log(err);
        }
    })

    return(
        <div className="container-agent">
           <h5 className="title-agent">Dashbord Agent</h5>
           <div className="d-flex gap-2  mt-3 ">
            <div className="col-md-6 card p-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom </th>
                            <th>Email</th>
                            <th>Telephone</th>
                            <th>Adresse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nom}</td>
                                <td>{item.email}</td>
                                <td>{item.telephone}</td>
                                <td>{item.ville}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className="col-md-6 card p-2">
                <h5>Liste des produits</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>nom</th>
                            <th>categorie</th>
                            <th>prix</th>
                            <th>quantite</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {products.map((item)=>(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nom}</td>
                                <td>{item.categorie}</td>
                                <td>{item.prix}</td>
                                <td>{item.quantiteStock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           </div>
        </div>
    )
}
 export default AgentDashboard;