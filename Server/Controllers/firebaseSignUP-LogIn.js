// Import Firebase Admin SDK
const admin = require("../config/firebaseAdmin");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  Standard Email/Password Signup
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //  Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstname} ${lastname}`, // Store full name in Firebase
    });

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Store user in your database
    const newUser = await prisma.user.create({
      data: {
        id: userRecord.uid,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      firebaseUser: userRecord,
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
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // const { uid, email, name } = decodedToken;
    const { userId: uid, email, firstname, lastname } = req.user;

    //  Check if user exists in DB
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      //  Create new user if not found

      user = await prisma.user.create({
        data: {
          uid,
          email,
          firstname,
          lastname,
          googleAuth: true, //  Mark as Google user
          role: "USER",
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
// signin with email and password

// const loginUser = async (req, res) => {
//   const { email, password, role } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }
//   try {
//     //  Find user in DB
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     //  Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     //  Generate JWT token
//     const accessToken = jwt.sign(
//       { userId: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     //  Set JWT token as cookie
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//     //  Return user data
//     return res.status(200).json({
//       message: "Login successful",
//       accessToken,
//       user: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     return res.status(500).json({ message: "Internal Server Error", user });
//     //   return res.status(400).json({ message: "Frontend handles authentication" });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const firebaseToken = await admin.auth().createCustomToken(user.id);

    // const accessToken = jwt.sign(
    //   { userId: user.id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.cookie("accessToken", firebaseToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { password: _, ...userData } = user; // Exclude password
    return res.status(200).json({
      message: "Login successful",
      accessToken: firebaseToken,
      user: userData,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout User
const logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken =
    req.cookies?.accessToken ||
    (authHeader &&
      authHeader.startsWith("Bearer ") &&
      authHeader.split(" ")[1]);

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
