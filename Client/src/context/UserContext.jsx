import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";
import { getUserProfile } from "../services/authService";
import { getDbIdFromFirebase } from "../services/firebaseService";
const API_BASE_URL =
  "https://event-accessibility-guide-production.up.railway.app";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const handleAuthChange = async () => {
        setLoading(true);
        if (user) {
          try {
            const token = await user.getIdToken();
            setAccessToken(token);
            setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
            });
            const data = await getUserProfile(user.uid);
            console.log("Fetched userDetails:", data);
            if (data) {
              setUserDetails(data);
            } else {
              console.warn("userDetails is null or undefined");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        } else {
          setUser(null);
          setUserDetails(null);
          setAccessToken(null);
        }
        setLoading(false);
      };
      handleAuthChange();
    });

    return () => unsubscribe();
  }, []);
  //the login with google functions -new
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user) {
        throw new Error("Failed to sign in with Google");
      }

      const idToken = await user.getIdToken();

      //save accessToken to localstorage for later
      localStorage.setItem("user", JSON.stringify({ accessToken: idToken }));

      //send user data to the backend
      const response = await fetch(`${API_BASE_URL}/profile/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          firstname: user.displayName.split(" ")[0],
          lastname: user.displayName.split(" ")[1] || "",
          email: user.email,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(errordata.message || "Failed to create user profile");
      }
      return user;
    } catch (error) {
      console.Error("Google sigin in error: ", error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        userDetails,
        loading,
        setUserDetails,
        signInWithGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
