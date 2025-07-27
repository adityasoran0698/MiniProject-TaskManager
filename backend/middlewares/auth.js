const { validateToken } = require("../services/auth.js");
const checkForAuth = (cookiename) => {
  return function (req, res, next) {
    const token = req.cookies[cookiename];

    if (!token)
      return res.status(401).json({ error: "Authentication token missing" });

    try {
      const user = validateToken(token);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized: User not found" });
      }
      req.user = user;
      return next();
    } catch (error) {
      console.log("Token validation error:", error);
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};


module.exports = { checkForAuth };
