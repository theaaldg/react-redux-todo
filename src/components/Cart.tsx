import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleMoveToWishlist = (item: any) => {
    dispatch(toggleWishlist(item));
    dispatch(removeFromCart(item.id));
  };

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Votre Panier</h1>

        {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Votre panier est vide.</p>
        ) : (
            <div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
                      {/* Image du produit */}
                      <div className="flex items-center space-x-4">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
                          <p className="text-gray-600">Prix: {item.price} EUR</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-all"
                        >
                          <i className="bx bx-minus text-xl"></i>
                        </button>

                        <div className="flex items-center justify-center border border-gray-300 rounded-lg w-20">
                          <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              className="w-full text-center py-1 px-2 bg-transparent border-none focus:outline-none"
                          />
                        </div>

                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-all"
                        >
                          <i className="bx bx-plus text-xl"></i>
                        </button>
                      </div>

                      <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                      >
                        Supprimer
                      </button>

                      <button
                          onClick={() => handleMoveToWishlist(item)}
                          className="text-blue-500 hover:text-blue-700"
                      >
                        Déplacer vers les favoris
                      </button>
                    </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Total : {total.toFixed(2)} EUR</h2>
                <Link
                    to="/checkout"
                    className="bg-violet-500 text-white px-6 py-2 rounded-lg hover:bg-violet-600 transition-all"
                >
                  Passer à la caisse
                </Link>
              </div>
            </div>
        )}
      </div>
  );
};

export default Cart;
