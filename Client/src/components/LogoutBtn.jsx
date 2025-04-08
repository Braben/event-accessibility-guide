import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@material-tailwind/react";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";

const LogoutButton = () => {

  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response.message);
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.success("Logout out successfully");
    }
  }   

  return (
    <Button 
      onClick={handleLogout} 
      className="font-bold w-full bg-blue-600 hover:bg-black text-white"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
