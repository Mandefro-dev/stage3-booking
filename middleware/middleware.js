const User = require("../database/User");
const jwt = require("jsonwebtoken");

const authPage = (permissions) => {
  return (req, res, next) => {
    const userRole = User.role;
    if (permissions.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json("YOU DON'T HAVE PERMISSION.");
    }
  };
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json("no token");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("error", err.message);
    req.user = user;
    next();
  });
};

module.exports = { authPage, authenticateToken };
