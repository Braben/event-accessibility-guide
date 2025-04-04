import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@material-tailwind/react";

const API_BASE_URL =
  "https://event-accessibility-guide-production.up.railway.app";

const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      if (!user) {
        throw new Error("No user is currently logged in.");
      }
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Failed to log out from backend");
      }
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
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
