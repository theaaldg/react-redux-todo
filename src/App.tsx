// App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { RootState } from "./store/store";
import Wishlist from "./components/Wishlist";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Profile from "./components/Profile"; // Import du composant Profile
import Footer from "./components/Footer"; // Import du composant Footer

const App = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  const handleLogin = (name: string) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
      <Router>
        <div className="app-container">
          <div className="main-content">
            {/* Navigation */}
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Logo Section */}
                <div className="flex items-center space-x-2 text-gray-800 font-semibold text-2xl">
                  <span className="text-gray-500 text-2xl"><i className="bx bx-cart"></i></span>
                  <span>Shop</span>
                </div>

                {/* Links */}
                <div className="hidden sm:flex space-x-6 text-gray-600">
                  <Link className="hover:text-gray-800 transition-all duration-300" to="/">Accueil</Link>
                  <Link className="hover:text-gray-800 transition-all duration-300" to="/wishlist">Favoris</Link>

                  {userName ? (
                      <>
                        <Link
                            to="/profile"
                            className="hover:text-gray-800 transition-all duration-300"
                        >
                          Profil ({userName})
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700"
                        >
                          Se déconnecter
                        </button>
                      </>
                  ) : (
                      <>
                        <Link
                            to="/create-account"
                            className="hover:text-gray-800 transition-all duration-300"
                        >
                          Créer un compte
                        </Link>
                        <Link
                            to="/login"
                            className="hover:text-gray-800 transition-all duration-300 ml-4"
                        >
                          Se connecter
                        </Link>
                      </>
                  )}
                </div>

                {/* Cart Icon */}
                <div className="relative">
                  <Link to="/cart" className="text-gray-600 text-2xl transform hover:scale-110 transition-all">
                    <i className="bx bx-cart"></i>
                  </Link>
                  {cartCount > 0 && (
                      <div className="absolute top-0 right-0 bg-violet-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center -mt-2 -mr-2">
                        {cartCount}
                      </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route
                  path="/create-account"
                  element={<CreateAccount onLogin={handleLogin} />}
              />
              <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
              />
              <Route
                  path="/profile"
                  element={<Profile />}
              />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
  );
};

export default App;
