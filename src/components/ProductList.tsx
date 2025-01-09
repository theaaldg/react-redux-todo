import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import './product_list_styles.css';


// Product Listing
const ProductList = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { items, isLoading, currentPage } = useSelector((state: RootState) => state.products);
  React.useEffect(() => {
    dispatch(fetchProducts(currentPage || 1));
  }, [dispatch, currentPage]);

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-grid">
        {items.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.title}</h2>
            <p>{product.price} EUR</p>
            <Link to={`/products/${product.id}`}>Voir le produit</Link>
            <button onClick={() => dispatch(addToCart(product))}>Ajouter au panier</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => dispatch(setPage(currentPage - 1))} disabled={currentPage === 1}>
          Précedent
        </button>
        <button onClick={() => dispatch(setPage(currentPage + 1))}>Suivant</button>
      </div>
    </div>
  );
};

export default ProductList;