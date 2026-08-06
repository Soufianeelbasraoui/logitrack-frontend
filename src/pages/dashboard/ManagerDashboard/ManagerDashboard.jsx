

import { useState } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import "./ManagerDashboard.css";
import { useEffect } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';
function ManagerDashboard(){
    const[countCommandes,setCountCommandes]=useState(0);
    const[enAttente,setEnAttente]=useState(0);
    const[expediee,setExpediee]=useState(0);
    const[countProuits,setCountProduits]=useState(0);
    const[lowStock,setlowStock]=useState([]);
    const [recentCommandes, setRecentCommandes] = useState([]);

    useEffect(()=>{
         try{
          api.get("/api/products/count").then((res)=>{
            setCountProduits(res.data);
          })
        }catch(error){
            console.log(error);
        };
     try{
     api.get("/api/commandes/count").then((res)=>{
        setCountCommandes(res.data);
     })
    }catch(error){
        console.log(error)
    }

    api.get("/api/commandes/en-attente").then((res)=>{
        setEnAttente(res.data)
    })
    api.get("/api/commandes/expediee").then((res)=>{
     setExpediee(res.data);
    })
    },[]);
        useEffect(()=>{
        api.get("/api/products/low-stock?page=0&size=3").then((res)=>{
         setlowStock(res.data.content);
        })
    },[])

   useEffect(() => {
    api.get("/api/commandes/recent")
    .then((res) => {
      console.log(res.data);
      setRecentCommandes(res.data);
    })
    .catch(console.error);
    }, []);
    return(
        <div className="container-agent">
         <div className="title-agent">
             <h5>ManagerDashboard</h5>
         </div>
         <div className="crad-agent">
                <div className="card card-agent2 p-4">
                 <div className='d-flex'>
                   <Inventory2Icon className='me-2 text-success bg-success-subtle icon-box p-1'/>
                    <strong>Produits</strong>
                 </div>
                 <strong className='mt-1'>{countProuits}</strong>
               </div>
               <div className="card card-agent1 p-4">
                <div className='d-flex'>
                     <LocalGroceryStoreIcon className='icons me-2 text-warning bg-warning-subtle icon-box p-1'/>
                     <strong>Commandes</strong>
                </div>
                <strong>{countCommandes}</strong>
            </div>
                <div className="card card-agent2 p-4">
                <div className='d-flex '>
                    <LocalShippingIcon className='me-2 text-primary bg-primary-subtle icon-box p-1'/>
                    <strong>Expédiées</strong>
                </div>
                <strong>{expediee}</strong>
            </div>
            <div className="card card-agent1 p-4">
                <div className='d-flex'>
                    <AccessTimeIcon className='icons me-2 text-warning bg-warning-subtle icon-box p-1'/>
                    <strong>En attente</strong>
                </div>
                <strong>{enAttente}</strong>
            </div>
         </div>
                    <div className='d-flex gap-2  mt-3'>
            <div className='col-md-6 card p-2'>
               
                <h5 className='card-title mb-3'>Produits avec stock faible</h5>
                 <div>
                    {lowStock.map((item) => (
                        <div className='p-1 product-item' key={item.id ?? item.nom}>
                            <div>
                              <strong>{item.nom}</strong>
                               <p>Stock:{item.quantiteStock}</p>
                            </div> 
                            <div>
                              <span className="badge-stock">Faible</span>
                            </div>
                        </div>
                    ))}
                 </div> 
                 <Link className='text-center mt-3'>Voir tous les produits</Link>
              
            </div>
            <div className='col-md-6 card p-2'>
              <h5 className='card-title mb-3'>Commandes recentes</h5>
              <div>
                <table  className="table ">
                  <thead>
                   <tr>
                    <th>N°</th>
                    <th>Client</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                 </thead>
                   <tbody>
                      {recentCommandes.map((item) => (
                        <tr key={item.id}>
                          <td>CMD-{item.id}</td>
                          <td>{item.client.nom}</td>
                          <td>
                            <span className={`status ${item.statut.toLowerCase()}`}>
                              {item.statut}
                            </span>
                          </td>
                          <td>{item.dateCommande}</td>
                        </tr>
                      ))}
                    </tbody>
                    
                </table>
                
              </div>
               <Link className='text-center'>Voir toutes les commandes</Link>
            </div>

          </div>
        </div>
    )
}
 export default ManagerDashboard;