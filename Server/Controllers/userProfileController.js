const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        disabilities: false,
        reviews: true,
        notifications: true,
      },
      omit: {
        password: true,
        notificationToken: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    role,
    profileInfo,
    disabilities,
    notificationToken,
    reviews,
    notification,
  } = req.body;
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        role,
        profileInfo,
        disabilities,
        notificationToken,
        reviews,
        notification,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log("Error: ", error);
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists
    const existingUser = await prisma.user
      .findUnique({ where: { id } })
      .profileInfo();
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete user profile
    const deletedUser = await prisma.user.delete({
      where: { id },
      include: {
        profileInfo: true,
        disabilities: true,
        reviews: true,
      },
      data: {
        profileInfo: {
          delete: true,
        },
        disabilities: {
          deleteMany: true,
        },
        reviews: {
          deleteMany: true,
        },
        notification: {
          delete: true,
        },
        notificationToken: {
          delete: true,
        },
      },
    });
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user profile  :", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
};
