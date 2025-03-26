const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Restrict access to only authenticated users

const authorizeUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email }, // User email comes from Firebase verification
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next(); // User is an admin, proceed to the next middleware or route
  } catch (error) {
    return res.status(500).json({ message: "Authorization error", error });
  }
};

module.exports = { authorizeUser };
