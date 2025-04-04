import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { getUserProfile } from "../services/authService";
import { getDbIdFromFirebase } from "../services/firebaseService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Fetching user details for:", user.uid);
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        });
        try {
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
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userDetails }}>
      {children}
    </UserContext.Provider>
  );
};
