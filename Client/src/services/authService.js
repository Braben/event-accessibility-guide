import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../config/firebaseConfig";
import { setDbIdInFirebase, getDbIdFromFirebase } from "./firebaseService";
import axios from "axios";

// import { getAuth } from "firebase/auth";

const API_BASE_URL =
  "https://event-accessibility-guide-production.up.railway.app";

// ✅ Signup with Email & Password
export const signUpWithEmail = async (firstname, lastname, email, password) => {
  try {
    // First, save user details in the database
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to save user details in the database");
    }
    const userData = await response.json();

    // Now create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

     // After Firebase user is created, update the `uid` in your DB
     const updatedUserData = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: user.uid }), 
    });
    // await setDbIdInFirebase(user, userData.id);

    if (!updatedUserData.ok) {
      throw new Error("Failed to update UID in the database");
    }

    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Signin with Email & Password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (!user) {
      throw new Error("Failed to sign in");
    }
  
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to retrieve user details from database");
    }

    const userData = await response.json(); 
    return userData; 
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

// ✅ Google Sign-In
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  await fetch(`${API_BASE_URL}/google/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstname: user.displayName.split(" ")[0],
      lastname: user.displayName.split(" ")[1] || "",
      email: user.email,
    }),
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
};

// ✅ Get Current User
export const getCurrentUser = () => {
  return auth.currentUser;
};

// ✅ Check if User is Authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
// ✅ Get User Profile
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    console.log("User profile data:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
