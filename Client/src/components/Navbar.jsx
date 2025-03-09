import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-2">
      <Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default Navbar;
