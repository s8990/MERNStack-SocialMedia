const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

// Register
const register = async (req, res) => {
  try {
    // Generate Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const newUser = await new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      description: req.body.description,
    });

    // Save User And Return Response
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

// Login
const login = async (req, res) => {
  try {
    // Find User
    const user = await UserModel.findOne({ email: req.body.email });

    // User Not Exist
    !user && res.status(404).json({ data: { error: "User not found" } });

    // Password Is Correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json({ data: { error: "Wrong Username Or Password" } });

    // User Is Exist And Password Is Correct
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ data: { error: error } });
  }
};

module.exports = {
  register,
  login,
};
