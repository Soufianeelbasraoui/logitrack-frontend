import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../api/axios";
import { toast } from "react-toastify";

// Icons
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";

import "./Products.css";
import "../Style.css";

const defaultDemoProducts = [
  { id: 1, nom: "Clavier mécanique RGB", categorie: "Périphériques", prix: 450.0, quantiteStock: 18 },
  { id: 2, nom: "Souris sans fil ergonomique", categorie: "Périphériques", prix: 280.0, quantiteStock: 6 },
  { id: 3, nom: "Écran Gaming 27'' 165Hz", categorie: "Écrans", prix: 2400.0, quantiteStock: 12 },
  { id: 4, nom: "Imprimante Multifonction Laser", categorie: "Bureautique", prix: 1850.0, quantiteStock: 4 },
  { id: 5, nom: "Casque Audio Pro Noise-Cancelling", categorie: "Audio", prix: 890.0, quantiteStock: 25 },
  { id: 6, nom: "Webcam Full HD 1080p", categorie: "Vidéo", prix: 350.0, quantiteStock: 0 },
  { id: 7, nom: "Disque SSD Externe 1To NVMe", categorie: "Stockage", prix: 950.0, quantiteStock: 15 },
  { id: 8, nom: "Hub USB-C 8-en-1 Aluminium", categorie: "Connectique", prix: 320.0, quantiteStock: 30 },
  { id: 9, nom: "Support Ordinateur Portable Ajustable", categorie: "Accessoires", prix: 190.0, quantiteStock: 8 },
  { id: 10, nom: "Onduleur Line-Interactive 850VA", categorie: "Alimentation", prix: 750.0, quantiteStock: 5 },
];

function Products() {
  const [products, setProducts] = useState(defaultDemoProducts);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(2);
  const [totalElements, setTotalElements] = useState(18);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("id");
  const [, setIsLoading] = useState(false);

  // Fetch products from backend
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      let res;
      if (selectedCategory && selectedCategory !== "ALL") {
        res = await api.get(`/api/products/search/categorie?categorie=${encodeURIComponent(selectedCategory)}&page=${page - 1}&size=${pageSize}`);
      } else {
        res = await api.get(`/api/products?page=${page - 1}&size=${pageSize}&sortBy=${sortBy}`);
      }

      if (res?.data?.content && Array.isArray(res.data.content) && res.data.content.length > 0) {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || res.data.content.length);
      } else if (Array.isArray(res?.data) && res.data.length > 0) {
        setProducts(res.data);
        setTotalPages(Math.ceil(res.data.length / pageSize) || 1);
        setTotalElements(res.data.length);
      } else {
        if (search.trim() || selectedCategory !== "ALL") {
          setProducts([]);
          setTotalElements(0);
          setTotalPages(1);
        } else {
          setProducts(defaultDemoProducts);
          setTotalPages(2);
          setTotalElements(18);
        }
      }
    } catch {
      if (!search.trim() && selectedCategory === "ALL") {
        setProducts(defaultDemoProducts);
        setTotalPages(2);
        setTotalElements(18);
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, selectedCategory, sortBy, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle product delete
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      toast.success("Produit supprimé avec succès.");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setTotalElements((prev) => Math.max(0, prev - 1));
    } catch {
      toast.error("Erreur lors de la suppression du produit.");
    }
  };

  // Filtered products for realtime search
  const displayedProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search.trim() ||
        p.nom?.toLowerCase().includes(search.toLowerCase()) ||
        p.categorie?.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "ALL" ||
        p.categorie?.toLowerCase() === selectedCategory.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [products, search, selectedCategory]);

  // Categories list
  const categoriesList = useMemo(() => {
    const set = new Set(defaultDemoProducts.map((p) => p.categorie));
    products.forEach((p) => {
      if (p.categorie) set.add(p.categorie);
    });
    return Array.from(set);
  }, [products]);

  // Stock status helper
  const getStockBadge = (stock) => {
    const qty = Number(stock) || 0;
    if (qty > 10) {
      return (
        <span className="stock-badge stock-in">
          <span className="stock-dot"></span>
          En stock ({qty})
        </span>
      );
    }
    if (qty > 0) {
      return (
        <span className="stock-badge stock-low">
          <span className="stock-dot"></span>
          Faible ({qty})
        </span>
      );
    }
    return (
      <span className="stock-badge stock-out">
        <span className="stock-dot"></span>
        Rupture
      </span>
    );
  };

  const startCount = totalElements > 0 ? (page - 1) * pageSize + 1 : 0;
  const endCount = totalElements > 0 ? Math.min(page * pageSize, totalElements) : 0;

  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar title="Produits" />

        <main className="page-content">
          {/* Header Row */}
          <div className="products-page-header">
            <div className="products-header-left">
              <Inventory2RoundedIcon className="products-header-icon" />
              <div>
                <h2 className="products-header-title">Produits</h2>
                <p className="products-header-subtitle">Gérez votre catalogue de produits et les niveaux de stock</p>
              </div>
            </div>

            <Link className="btn-add-product" to="/dashboard/Products/ajouterProduits">
              <AddRoundedIcon fontSize="small" />
              <span>Ajouter un produit</span>
            </Link>
          </div>

          {/* Toolbar Card */}
          <div className="products-toolbar-card">
            <div className="products-toolbar-left">
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>Afficher</span>
              <select
                className="products-filter-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              {/* Category Filter */}
              <select
                className="products-filter-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="ALL">Toutes les catégories</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Sort selector */}
              <select
                className="products-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">Tri par défaut</option>
                <option value="nom">Trier par Nom</option>
                <option value="prix">Trier par Prix</option>
                <option value="quantiteStock">Trier par Stock</option>
              </select>
            </div>

            <div className="products-toolbar-right">
              <div className="products-search-box">
                <SearchRoundedIcon className="products-search-icon" />
                <input
                  type="text"
                  className="products-search-input"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="products-table-card">
            <div className="products-table-container">
              {displayedProducts.length === 0 ? (
                <div style={{ padding: "48px 20px", textAlign: "center", color: "#64748b" }}>
                  <p style={{ margin: 0, fontWeight: 500 }}>Aucun produit trouvé.</p>
                </div>
              ) : (
                <table className="products-table">
                  <thead>
                    <tr>
                      <th style={{ width: "48px" }}>#</th>
                      <th>Produit</th>
                      <th>Catégorie</th>
                      <th>Prix unitaire</th>
                      <th>État du Stock</th>
                      <th style={{ width: "130px", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedProducts.map((item, index) => (
                      <tr key={item.id || index}>
                        <td style={{ color: "#64748b", fontWeight: 500 }}>
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td>
                          <div className="product-name-cell">
                            <div className="product-icon-box">
                              <DevicesOutlinedIcon fontSize="small" />
                            </div>
                            <span className="product-name-text">{item.nom}</span>
                          </div>
                        </td>
                        <td>
                          <span className="product-category-badge">{item.categorie}</span>
                        </td>
                        <td>
                          <span className="product-price-text">
                            {Number(item.prix).toFixed(2)} MAD
                          </span>
                        </td>
                        <td>{getStockBadge(item.quantiteStock)}</td>
                        <td>
                          <div className="product-actions-group">
                            <Link
                              to={`/dashboard/Products/ProduitDetails/${item.id}`}
                              className="btn-action btn-action-view"
                              title="Détails"
                            >
                              <VisibilityOutlinedIcon fontSize="small" />
                            </Link>

                            <Link
                              to={`/dashboard/Products/modifierProduit/${item.id}`}
                              className="btn-action btn-action-edit"
                              title="Modifier"
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </Link>

                            <button
                              type="button"
                              className="btn-action btn-action-delete"
                              onClick={() => handleDelete(item.id)}
                              title="Supprimer"
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="clients-pagination-bar">
              <div className="clients-pagination-info">
                Affichage de {startCount} à {endCount} sur {totalElements} produits
              </div>

              <div className="clients-pagination-controls">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  aria-label="Page précédente"
                >
                  <ChevronLeftRoundedIcon fontSize="small" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`pagination-btn ${pageNum === page ? "active" : ""}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  aria-label="Page suivante"
                >
                  <ChevronRightRoundedIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;