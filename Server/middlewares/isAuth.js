//authentication middleware
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      "process.env.myJWT_SECRET"
    );
    req.user = {
      userId: { id: decodedAccessToken.userId },
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuth;
