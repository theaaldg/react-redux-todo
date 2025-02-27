import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { toggleWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const dispatch = useDispatch() as AppDispatch;
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-violet-600 text-center mb-12">Mes Favoris</h1>
            {wishlistItems.length === 0 ? (
                <p className="text-center text-gray-500">Aucun produit dans la wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {wishlistItems.map((product) => (
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
                                <h2 className="text-2xl font-semibold text-gray-800 truncate">{product.title}</h2>
                                <p className="text-gray-600 mt-2">{product.price} EUR</p>
                            </div>

                            <div className="flex items-center justify-between mt-4 space-x-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents Link click
                                        dispatch(toggleWishlist(product));
                                    }}
                                    className={`text-4xl transition-all duration-300 ${wishlistItems.some((item) => item.id === product.id) ? "text-violet-600 scale-110" : "text-gray-400 hover:text-violet-500"}`}
                                >
                                    {wishlistItems.some((item) => item.id === product.id) ? "♥" : "♡"}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents Link click
                                        dispatch(addToCart(product));
                                    }}
                                    className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition-all duration-300 mt-4"
                                >
                                    Ajouter au panier
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <Link
                                    to={`/products/${product.id}`}
                                    className="text-violet-500 font-medium hover:underline"
                                >
                                    Voir le produit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
