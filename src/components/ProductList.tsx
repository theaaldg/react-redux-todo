import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useState } from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, isLoading, currentPage } = useSelector((state: RootState) => state.products);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    React.useEffect(() => {
        if (items.length === 0) dispatch(fetchProducts());
    }, [dispatch, items.length]);

    if (isLoading) return <p className="text-center text-gray-500 mt-8">Chargement...</p>;

    const categories = ["all", ...new Set(items.map((product) => product.category))];
    let filteredItems = items.filter(
        (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "all" || product.category === selectedCategory)
    );

    const itemsPerPage = 12;
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-violet-600 text-center mb-12">Notre Collection</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        dispatch(setPage(1));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        dispatch(setPage(1));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat === "all" ? "Toutes les catégories" : cat}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {paginatedItems.length > 0 ? (
                    paginatedItems.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-56 object-cover rounded-xl transform transition duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="mt-4 h-24">
                                <div className="scroll-title-wrapper">
                                    <h2 className="text-2xl font-semibold text-gray-800 scroll-title">
                                        {product.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 mt-2">{product.price} EUR</p>
                            </div>

                            <div className="flex items-center justify-between mt-4 space-x-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents the Link click
                                        dispatch(toggleWishlist(product));
                                    }}
                                    className={`text-4xl transition-all duration-300 ${wishlistItems.some((item) => item.id === product.id) ? "text-violet-600 scale-110" : "text-gray-400 hover:text-violet-500"}`}
                                >
                                    {wishlistItems.some((item) => item.id === product.id) ? "♥" : "♡"}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents the Link click
                                        dispatch(addToCart(product));
                                    }}
                                    className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-all duration-300"
                                >
                                    Ajouter au panier
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <Link
                                    to={`/products/${product.id}`}
                                    className="text-violet-500 font-medium hover:underline"
                                >
                                    Voir le détail
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">Aucun produit trouvé.</p>
                )}
            </div>


            <div className="flex justify-between mt-10">
                <button
                    onClick={() => dispatch(setPage(currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-gray-400"
                >
                    Précédent
                </button>
                <button
                    onClick={() => dispatch(setPage(currentPage + 1))}
                    disabled={currentPage >= totalPages}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default ProductList;
