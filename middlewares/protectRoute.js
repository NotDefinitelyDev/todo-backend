const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers?.authorization || req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
