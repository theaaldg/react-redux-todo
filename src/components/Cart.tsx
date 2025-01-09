import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import './cart_styles.css';
// Cart
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h2>{item.title}</h2>
              <p>Prix: {(item.price * item.quantity).toFixed(2)} EUR</p>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))
                  }
                />
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                  }
                >
                  +
                </button>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Supprimer</button>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: {calculateTotal()} EUR</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
