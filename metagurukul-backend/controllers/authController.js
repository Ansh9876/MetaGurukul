const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, whatsNumber } = req.body; 

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
      whatsNumber
    });

    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role },    
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(201).json({
      token,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Include role in token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      token,
      role: user.role, // send role separately too
      email: user.email,
      name : user.name  
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
