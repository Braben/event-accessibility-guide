const dotenv = require("dotenv");
dotenv.config();

const admin = require("firebase-admin");
const serviceAccount = require("../config/event-accessibility-guide-firebase-adminsdk-fbsvc-9d3ea00e6f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
