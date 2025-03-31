import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavBar2 from "../components/NavBar2";

const RootLayout = () => {
  return (
    <div className="">
      {/* Navbar Stays at the Top */}
      {/* <Navbar /> */}
      <NavBar2 />

      {/* Main Content (Takes Remaining Space) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Stays at the Bottom */}
      <Footer />
    </div>
  );
};

export default RootLayout;
