const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const createUser = async (req, res) => {
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
    // const { name, email,password,ro } = req.body;

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
        name,
        email,
        password: hashedPassword,
        role,
        profileInfo,
        disabilities,
        notificationToken,
        reviews,
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
    const { id } = req.params; // Extract user ID from request parameters

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id }, // Find user by ID
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

const updateUser = async (req, res) => {
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
    // Update user (only include fields that are provided)
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

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
    console.log({ message: "User deleted successfully", data: deletedUser });
    console.log("Deleted user:", deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = { createUser, getUsers, getUsersById, updateUser, deleteUser };
