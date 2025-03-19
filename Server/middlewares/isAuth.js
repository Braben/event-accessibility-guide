//authentication middleware
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1]; // Check if the token is present in the request headers or cookies
  console.log(req.cookies, req.headers);

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: please log in" });
  }
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.myJWT_SECRET
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
