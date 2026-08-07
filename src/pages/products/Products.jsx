import "./Products.css";
import "../style.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import PaginationComponent from "../../components/Pagination/Pagination";

function Products() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products,setProducts]=useState([]);
  const[page,setPage]=useState(1);
  const[totalPages,setTotalPages]=useState(0);
  const[loader,setLoader]=useState(true);

  const[categorie,setCategorie]=useState([]);

  useEffect(()=>{
      try{
       api.get(`/api/products?page=${page-1}&size=10`).then((res)=>{
          setProducts(res.data.content);
          setTotalPages(res.data.totalPages)
          console.log(res.data);
      })}catch(err){
          console.log(err);
        }finally{
         setLoader(false)
        }
      },[page]);
        const handlePageChange=(newPage)=>{
            setPage(newPage);
         }
      const handelDelet=async(id)=>{
            await  api.delete(`/api/products/${id}`).then((res)=>{
              setProducts(products.filter((item)=>item.id!==id));
            })
      }

  if(loader){
        return<Loader/>
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
          <div className="nav-produits">
              <h5 className="mb-0">Produits</h5>
            <Link  to="/dashboard/Products/ajouterProduits" className="btn-ajouter">
              Ajouter Produit
            </Link>
          </div>
          <div className="card mt-2 p-3">
            <div className="card-search">
            <div>
              <label>Categorie</label>
             <select>
              <option value="">Tous les Categorie </option>
              </select>
            </div>
            <div>
              <label>Prix</label>
              <select>
                <option value="">Tous les Statut</option>
              </select>
             </div>
              <input type="text" />
            </div>
          
          </div>

          <div className="card mt-3 p-4">
            <h5>Liste des produits</h5>
            <table className="table">
                <thead>
                  <tr>
                      <th>#</th>
                      <th>nom</th>
                      <th>categorie</th>
                      <th>prix</th>
                      <th>quantite</th>
                      <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item)=>(
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nom}</td>
                      <td>{item.categorie}</td>
                      <td>{item.prix}</td>
                      <td>{item.quantiteStock}</td>
                      <td>
                        <Link to={`/dashboard/Products/ProduitDetails/${item.id}`} className="btn-action btn-view mx-2"><VisibilityIcon fontSize="small" /> </Link>
                        <Link to={`/dashboard/Products/modifierProduit/${item.id}`} className="btn-action btn-edit mx-2"><EditIcon fontSize="small" /> </Link>
                        <button className="btn-action btn-delete" onClick={() => handelDelet(item.id)}>
                          <DeleteIcon fontSize="small" />
                        </button>

                      </td>
                    </tr>
                  ))}

                </tbody>
            </table>
            <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
          </div>
        </main>

      </div>

    </div>
  );
}

export default Products;