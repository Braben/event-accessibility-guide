// Import Firebase Admin SDK
const admin = require("../config/firebaseAdmin");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//  Standard Email/Password Signup
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //  Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstname} ${lastname}`, // 🔹 Store full name in Firebase
    });

    //  Store user in your database
    const newUser = await prisma.user.create({
      data: {
        uid: userRecord.uid,
        firstname,
        lastname,
        email,
      },
    });

    return res
      .status(201)
      .json(newUser, {
        message: "User created successfully",
        user: userRecord,
      });
  } catch (error) {
    console.error("Error creating User:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//  Google Signup/Login
const signupWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "Google ID token is required" });
  }

  try {
    //  Verify Google ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    //  Check if user exists in DB
    let user = await prisma.user.findUnique({ where: { uid } });

    if (!user) {
      //  Create new user if not found
      user = await prisma.user.create({
        data: {
          uid,
          email,
          firstname: name.split(" ")[0] || "",
          lastname: name.split(" ")[1] || "",
        },
      });
    }

    return res.status(200).json({ message: "Google Sign-In successful", user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res
      .status(500)
      .json({ message: "Google authentication failed", error: error.message });
  }
};

// Login (Handled by frontend)
const loginUser = (req, res) => {
  return res.status(400).json({ message: "Frontend handles authentication" });
};

// Logout User
const logout = async (req, res) => {
  const accessToken =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Decode Token and Revoke Session
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    await admin.auth().revokeRefreshTokens(decodedToken.sub);

    // Clear Cookie
    res.clearCookie("accessToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

module.exports = { signupUser, signupWithGoogle, loginUser, logout };
