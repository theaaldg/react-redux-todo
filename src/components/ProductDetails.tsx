import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { FaStar, FaTruck, FaUndo, FaShieldAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  if (!id) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const product = useSelector((state: RootState) =>
      state.products.items.find((p) => p.id === parseInt(id))
  );

  if (!product) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-auto object-cover rounded-3xl shadow-xl transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-white bg-opacity-70 rounded-full p-2">
              <span className="text-lg font-semibold text-violet-600">{product.rating} <FaStar className="inline-block text-yellow-400" /></span>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-600">Catégorie : <span className="font-semibold text-violet-600">{product.category}</span></p>
            <p className="text-lg text-gray-600">Marque : <span className="font-semibold text-violet-600">{product.brand}</span></p>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-semibold text-red-600">
                {product.price} EUR
                <span className="text-sm text-gray-500 ml-2">(-{product.discountPercentage}%)</span>
              </p>
              <span className="text-lg text-green-500 font-semibold">{product.availabilityStatus}</span>
            </div>

            <button
                onClick={() => dispatch(addToCart(product))}
                className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition duration-300"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        {/* Product Info and Metadata Section */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Description du produit</h2>
            <p className="text-lg text-gray-700">{product.description}</p>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <FaTruck className="text-violet-600" />
                <span className="text-lg text-gray-600">{product.shippingInformation}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-violet-600" />
                <span className="text-lg text-gray-600">{product.returnPolicy}</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-violet-600" />
                <span className="text-lg text-gray-600">Garantie : {product.warrantyInformation}</span>
              </div>
              <div className="text-lg text-gray-600">Poids : {product.weight} kg</div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informations supplémentaires</h2>
            <p className="mb-2 text-lg text-gray-600">SKU : <span className="text-violet-600">{product.sku}</span></p>
            <p className="mb-2 text-lg text-gray-600">Dimensions : <span className="text-violet-600">{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</span></p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-14">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Commentaires</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4 border-t-4 border-violet-600"
                >
                  <div className="flex justify-between">
                    <p className="font-semibold text-lg text-gray-800">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">Évaluation : {review.rating} / 5</p>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-400">
                    Publié le : {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;
