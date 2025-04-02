import {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../config/firebaseConfig";
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

    // Now create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user) {
      throw new Error("Failed to create Firebase user");
    }

    return user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Signin with Email & Password
export const signInWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (!user) {
    throw new Error("Failed to sign in");
  }

  await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return user;
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
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
