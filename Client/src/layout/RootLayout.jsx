import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
<<<<<<< HEAD
const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
=======
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="">
      {/* Navbar Stays at the Top */}
      <Navbar />

      {/* Main Content (Takes Remaining Space) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Stays at the Bottom */}
      <Footer />
>>>>>>> 69d64d9c4a18047f4fc960066304c1cdc42044ce
    </div>
  );
};

export default RootLayout;
