import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Product Details
const ProductDetails = ({ id }: { id: string | undefined }) => {
  if (!id) return <p>Produit non trouvé </p>;
  const product = useSelector((state: RootState) =>
    state.products.items.find((product) => parseInt(product.id) === parseInt(id))
  );
  if (!product) return <p>Produit non trouvé</p>;
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price} EUR</p>
    </div>
  );
};
export default ProductDetails;