import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const LogoutButton = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { accessToken, setUserDetails } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        throw new Error("Access token not available");
      }
      const response = await logoutUser(accessToken);
      console.log(response.message);

      setUserDetails(null);
      toast.success("Logout out successfully");
      navigate("/login"); // Navigate to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      console.log("logout not successful");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="font-bold w-full bg-blue-600 hover:bg-black text-white"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
