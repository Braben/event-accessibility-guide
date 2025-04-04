const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("dotenv");
env.config();

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(422)
        .json({ message: "Email and password are required" });
    }
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Generate a JWT token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.myJWT_SECRET,
      {
        subject: "accessAPI",
        expiresIn: "1h",
      }
    );
    //check if token is stored in cookies or sent as json response
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Set the cookie as HTTP-only
      secure: process.env.NODE_ENV === "production", // Set the cookie only in production
      sameSite: "strict", // Set the cookie to be sent only to the same site to prevent CSRF attacks
    });
    // Return the token in the response
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout user function
const logoutUser = async (req, res) => {
  try {
    // Clear the access token cookie
    res.clearCookie("accessToken", {
      httpOnly: true, // Set the cookie as HTTP-only
      secure: process.env.NODE_ENV === "production", /// Set the cookie only in production
      sameSite: "None", 
    });
    console.log("Logged out successfully");
    return res
      .status(200)
      .json({ message: "Logged out successfully", accessToken: null });
  } catch (error) {
    console.error("Error logging out:", error);
    // Check if the response has already been sent
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Error logging out", error: error.message });
    }
  }
};

module.exports = { loginUser, logoutUser, };
