const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const env = require("dotenv");
const admin = require("firebase-admin");
env.config();

const createUser = async (req, res) => {
  const {
    uid,
    firstname,
    lastname,
    email,
    password,
    role,
    profileInfo,
    disabilities,
    notificationToken,
    reviews,
    venues,
    notification,
  } = req.body;
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        uid,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
        profileInfo,
        disabilities,
        notificationToken,
        reviews,
        venues,
        notification,
      },
    });
    console.log("New User Created:", newUser);
    res.json(newUser);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
    console.log({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get signle user
const getUsersById = async (req, res) => {
  try {
    const { uid } = req.params; // Extract user ID from request parameters

    if (uid) {
      const user = await prisma.user.findUnique({
        where: { uid }, // Find user by ID
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
      console.log({ message: "User retrieved successfully", data: user });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCreatedUser = async ( req, res ) => {
  const {id} = req.params;
  const { uid } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update user (only include fields that are provided)
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { uid },
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//update user function
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const {
    id,
    firstname,
    lastname,
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
    const existingUser = await prisma.user.findUnique({ where: { uid } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update user (only include fields that are provided)
    const updatedUser = await prisma.user.update({
      where: { uid },
      data: {
        id,
        firstname,
        lastname,
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

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete user function
const deleteUser = async (req, res) => {
  const { uid } = req.params;
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { uid } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // delete user from firebase
    try {
      await admin.auth().deleteUser(uid);
      console.log(`User with UID ${uid} deleted from Firebase`);
    } catch (error) {
      console.error(`Error deleting user from Firebase: ${error.message}`);
      return res.status(500).json({ message: `Error deleting user from Firebase: ${error.message}` });
    }

    // Delete user from db
    const deletedUser = await prisma.user.delete({
      where: { uid },
    });
    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
    console.log({ message: "User deleted successfully", data: deletedUser });
    console.log("Deleted user:", deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: error.message });
  }
};

// Export the controller functions
module.exports = { createUser, getUsers, getUsersById, updateUser, deleteUser, updateCreatedUser };
