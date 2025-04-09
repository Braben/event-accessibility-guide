const admin = require("../config/firebaseAdmin"); // Import Firebase Admin SDK

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken =
    req.cookies?.accessToken ||
    (authHeader &&
      authHeader.startsWith("Bearer ") &&
      authHeader.split(" ")[1]);

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: Please log in" });
  }

  try {
    // Verify token (forces a fresh check)
    const decodedToken = await admin.auth().verifyIdToken(accessToken, true);

    // Get user details from Firebase (await is required)
    const user = await admin.auth().getUser(decodedToken.uid);

    // Handle name properly (avoid errors)
    const fullName = user.displayName || "";
    const [firstname = "", lastname = ""] = fullName.split(" ");

    // Attach user data to request
    req.user = {
      userId: user.uid,
      firstname,
      lastname,
      email: user.email,
      role: "USER", // Default role
    };

    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message || "Invalid token",
    });
  }
};

module.exports = { verifyFirebaseToken };
