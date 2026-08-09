import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./Orders.css"
import { Toast } from "bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import PaginationComponent from "../../components/Pagination/Pagination";
import UserInfo from "../../components/UserInfo/UserInfo";

function Orders(){
    
    const[orders,setOrders]=useState([]);
    const[loader,setLoader]=useState(true)
    const[sortBy,setSortBy]=useState("id");
    const[status,setStatus]=useState("");
    const[page,setPage]=useState(1);
    const[totalPages,setTotalPages]=useState(0);
    const [searchClient, setSearchClient] = useState("");

    useEffect(()=>{
        try{
            api.get(`/api/commandes?page=${page-1}&size=10`).then((res)=>{
                setOrders(res.data.content);
                setTotalPages(res.data.totalPages);
            })
        }catch(error){
            console.log(error);
        }finally{
            setLoader(false);
        }

    },[page]);

    if(loader){
        return <Loader/>
    }
    const handelDelet=(id)=>{
         try{
             setOrders(orders.filter((order)=>order.id!==id));
             toast.success("commande delet avec successe");
         }catch(err){
            console.log(err);
         }
    }
    const handelFilter=()=>{
        if(status==""){
            return;
        }
          api.get(`/api/commandes/search?statut=${status}&page=0&size=10`).then((res)=>{
            setOrders(res.data.content);
             setTotalPages(res.data.totalPages)
          }).catch((err)=>{
            console.log(err);
          })
    }

    const handelSort=()=>{
        api.get(`/api/commandes?page=0&size=10&sortBy=${sortBy}`).then((res)=>{
            setOrders(res.data.content);
            setTotalPages(res.data.totalPages)
        }).catch((err)=>{
            console.log(err);
        })
    };

    const handleSearchClient = () => {
    if (searchClient.trim() === "") {  
        api.get("/api/commandes?page=0&size=10").then((res) => {
                setOrders(res.data.content);
          });
        return;
    }

    api.get(`/api/commandes/search/client?nom=${searchClient}&page=0&size=10`).then((res) => {
            setOrders(res.data.content);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    const handlePageChange=(e)=>{
        setPage(e);
    }
    return(
        <div className="main-layout">
            <Sidebar/>
            <div className="main-content">
                <header className="nav-container">
                    <h2 className="ms-4">LogiTrack</h2>
                    <UserInfo/>
                </header>
                <main className="page-content">
                     <div className="nav-client">
                        <h5>Commandes</h5>
                          <Link to="/dashboard/Orders/orderForm" className="btn-ajouter">Ajouter commande</Link>
                      </div>
                      <div className="card p-4 mt-3">
                        <div className="card-search">
                            <div className="d-flex gap-2">
                            <input type="text" value={searchClient} onChange={(e)=>setSearchClient(e.target.value)} placeholder="Rechercher un client..."  />
                            <button onClick={handleSearchClient}>serch</button>
                        </div>

                        <div>
                           <select onClick={handelSort} onChange={(e)=>setSortBy(e.target.value)} className="me-3">
                                <option value="id">Tri par: </option>
                                <option value="dateCommande">Date</option>
                                <option value="statut">Statut</option>
                            </select>

                            <select value={status} onClick={handelFilter} onChange={(e)=>setStatus(e.target.value)}>
                                <option value="">Tous les statuts</option>
                                <option value="EN_ATTENTE"> EN_ATTENTE </option>
                                <option value="EXPEDIEE">  EXPEDIEE </option>
                                <option value="LIVREE"> LIVREE </option>
                            </select>

                        </div>
                        </div>

                      </div>
                    <div className="card p-4 mt-3">
                        <h5>Liste des commandes</h5>
                        {orders.length==0?(
                            <p className="text-center">Aucune commande trouvée.</p>
                        ):(
                            <table className="table">
                                <thead>
                                    <tr>
                                       <th>N°</th>
                                       <th>Client</th>
                                       <th>Statut</th>
                                       <th>Date</th>
                                       <th>Modifer Status</th>
                                       <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item)=>(
                                        <tr key={item.id}>
                                          <td>CMD-{item.id}</td>
                                          <td>{item.nomClient}</td>
                                          <td><span className={`status ${item.statut.toLowerCase()}`}>{item.statut} </span></td>
                                          <td>{item.dateCommande}</td>
                                          <td>
                                            <Link to={`/dashboard/Orders/modifierStatus/${item.id}`} className="nav-link">Modifer</Link>
                                          </td>
                                          <td>
                                            <Link to={`/dashboard/Orders/add-product/${item.id}`} className="btn-action btn-add mx-2" title="Ajouter un produit" ><AddShoppingCartIcon /> </Link>
                                            <Link to={`/dashboard/Orders/show/${item.id}`} className="btn-action btn-view mx-2"><VisibilityIcon/></Link>
                                            <button className="btn-action btn-delete" onClick={()=>handelDelet(item.id)}><DeleteIcon/></button>
                                            
                                          </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        
                        )}
                        <PaginationComponent page={page} totalPages={totalPages} onPageChange={handlePageChange}/>
                    </div>

                </main>

            </div>

        </div>
    )
}
export default Orders;