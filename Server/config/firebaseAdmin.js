const dotenv = require("dotenv");
dotenv.config();

const admin = require("firebase-admin");
// console.log("Firebase_Admin_SDK_Credentials:", process.env.Firebase_Admin_SDK_Credentials);
const serviceAccount = JSON.parse(process.env.Firebase_Admin_SDK_Credentials);
// Initialize Firebase Admin SDK

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
