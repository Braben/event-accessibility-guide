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
     const updatedUserData = await fetch(`${API_BASE_URL}/users/update-uid/${userData.id}`, {
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
    console.log("userData", userData)
    localStorage.setItem("user", JSON.stringify(userData));
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
export const getUserProfile = async (uid) => {
  console.log('Fetching profile for uid:', uid);
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${uid}`);
    console.log("User profile data:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// ✅ Logout User
export const logoutUser = async () => {
  try {
    // Get the current user from Firebase
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in");
    }

    // Prepare the access token from localStorage or from the current session
    const userData = JSON.parse(localStorage.getItem("user"));
    const accessToken = userData?.accessToken;

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    // Logout from Firebase
    await auth.signOut();
    localStorage.removeItem("user");

    // Send the access token with the logout request
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, // Send access token in Authorization header
      },
      credentials: "include", // Ensure credentials are included
    });

    if (!response.ok) {
      throw new Error("Error logging out from server");
    }

    console.log("Logged out successfully");
    return { message: "Logged out successfully" };
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};


