import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "../services/authService";
// import { getDbIdFromFirebase } from "../services/firebaseService";

export const UserContext = createContext({
  user: null,
  accessToken: null,
  userDetails: null,
  loading: true,
  setUserDetails: () => {},
});
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

  return (
    <UserContext.Provider
      value={{ user, accessToken, userDetails, loading, setUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};
