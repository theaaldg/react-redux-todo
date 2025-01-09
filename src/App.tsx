import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="" to="/">Accueil</Link>
          <Link className="" to="/cart">Panier</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails id={useParams().id} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
