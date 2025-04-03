import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firestore = getFirestore(); // Firestore instance

/**
 * ✅ Stores the Database User ID inside Firestore under `users/{uid}`
 */
export const setDbIdInFirebase = async (user, dbId) => {
  if (!user) return;

  try {
    await setDoc(doc(firestore, "users", user.uid), { dbId }, { merge: true });
    console.log("✅ Database ID stored in Firebase successfully");
  } catch (error) {
    console.error("❌ Error storing database ID in Firebase:", error);
  }
};

/**
 * ✅ Retrieves the Database User ID from Firestore using Firebase UID
 */
export const getDbIdFromFirebase = async (firebaseUid) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", firebaseUid));
    if (!userDoc.exists()) {
      throw new Error("Database ID not found in Firebase");
    }
    return userDoc.data().dbId; // ✅ Returns DB user ID
  } catch (error) {
    console.error("❌ Error fetching Database ID from Firebase:", error);
    return null;
  }
};
