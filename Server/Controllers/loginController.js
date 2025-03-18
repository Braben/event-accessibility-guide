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
      { userId: user.id },
      "process.env.myJWT_SECRET",
      {
        subject: "accessAPI",
        expiresIn: "1h",
      }
    );
    // Return the token in the response
    return res.json({ accessToken, user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout user
const logoutUser = async (req, res) => {
  try {
    // Clear the token from the client-side
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
    console.log("Logged out successfully");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginUser, logoutUser };
