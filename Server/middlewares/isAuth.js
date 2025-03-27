const { PrismaClient, UserRole } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const isAuth = (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
  // console.log(req.cookies, req.headers);

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: please log in" });
  }
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.myJWT_SECRET
    );
    req.user = {
      userId: decodedAccessToken.userId, // ✅ Fix incorrect object structure
      role: decodedAccessToken.role, // ✅ Ensure role is properly extracted
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
const authorizeUser = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "You are not permitted to perform this action" });
    }
    next();
  };
};

module.exports = { isAuth, authorizeUser };
