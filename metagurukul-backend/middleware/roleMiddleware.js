// middleware/roleMiddleware.js
const User = require("../models/User");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied: Insufficient role" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

module.exports = roleMiddleware;
