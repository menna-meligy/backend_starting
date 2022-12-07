const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers.authorization);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: config.UNAUTHENTICATED });
  }
};
