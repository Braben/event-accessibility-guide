require("dotenv").config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "NANA AMA",
        email: "nanaama@yahoo.com",
        password: "12345678",
        role: "USER",
      },
    });

    console.log("New User Created:", newUser);

    // Fetch all users to confirm the insertion
    const users = await prisma.user.findMany();
    console.log("Users in DB:", users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
