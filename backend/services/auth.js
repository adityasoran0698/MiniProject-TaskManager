const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const createToken = (user) => {
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, secret);
};
module.exports = { createToken, validateToken };
