import PeopleIcon from '@mui/icons-material/People';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./AdminDashboard.css"
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';
function AdminDashboard(){
    const [countClients,setCountClients]=useState(0);
    const[countProuits,setCountProduits]=useState(0);
    const[countCommandes,setCountCommandes]=useState(0);
    const[enAttente,setEnAttente]=useState(0);
    const[expediee,setExpediee]=useState(0);
    const[livree,setLivree]=useState(0);
    const[lowStock,setlowStock]=useState([]);
    const [recentCommandes, setRecentCommandes] = useState([]);
    useEffect(()=>{
        api.get("/api/clients/count").then((res)=>{
            setCountClients(res.data)
            console.log(res.data)
        });

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
        api.get("/api/commandes/livree").then((res)=>{
           setLivree(res.data);
        })

    },[])
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
        <div className="contanier-admin">
          <div className="title-admin">
            <h5>AdminDashboard</h5>
            
          </div>
          <div className="card-statustique ">
            <div className="card card-box2  p-4">
                <div className='d-flex  '>
                    <PeopleIcon className='icons me-2 bg-primary-subtle text-primary icon-box p-1'/>
                    <strong>Clients</strong>
                </div>
                <strong className='mt-1'>{countClients}</strong>
            </div>
            <div className="card card-box1 p-4">
                 <div className='d-flex'>
                   <Inventory2Icon className='me-2 text-success bg-success-subtle icon-box p-1'/>
                    <strong>Produits</strong>
                 </div>
                 <strong className='mt-2'>{countProuits}</strong>
            </div>
            <div className="card card-box3 p-4">
                <div className='d-flex'>
                     <LocalGroceryStoreIcon className='icons me-2 text-warning bg-warning-subtle icon-box p-1'/>
                     <strong>Commandes</strong>
                </div>
                <strong>{countCommandes}</strong>
               
            </div>
            <div className="card card-box2 p-4">
                <div className='d-flex '>
                    <LocalShippingIcon className='me-2 text-primary bg-primary-subtle icon-box p-1'/>
                    <strong>Expédiées</strong>
                </div>
                <strong>{expediee}</strong>
            </div>
            <div className="card card-box3 p-4">
                <div className='d-flex'>
                    <AccessTimeIcon className='icons me-2 text-warning bg-warning-subtle icon-box p-1'/>
                    <strong>En attente</strong>
                </div>
                <strong>{enAttente}</strong>
            </div>
            <div className="card card-box1 p-4">
                <div className='d-flex'>
                    <CheckCircleIcon className='me-2 bg-success-subtle text-success icon-box p-1'/>
                    <strong>Livrées</strong>
                </div>
                <strong>{livree}</strong>
            </div>
          </div>
          <div className='d-flex gap-2  mt-3'>
            <div className='col-md-6 card p-2'>
               
                <h5 className='card-title mb-3'>Produits avec stock faible</h5>
                 <div>
                    {lowStock.map((item,index)=>(
                        <div className='p-1 product-item'>
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
export default AdminDashboard;