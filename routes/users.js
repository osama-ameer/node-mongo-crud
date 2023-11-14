const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Add User / Create
router.post(`/`, async (req, res) => {
  const { name, email } = req.body;

  // Create User
  const user = new User({
    name,
    email,
  });
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res
        .status(400)
        .json({ msg: "User with this email already exists!" });

    await user.save();
    res.status(200).json({ msg: "User added successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// get All Users / Read
router.get(`/`, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// get User by id / Read
router.get(`/:id`, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ msg: "User with this Id does not exist." });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Update User / Update
router.put(`/:id`, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ msg: "User with this Id does not exist." });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ msg: "User updted successfully", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete User / Delete
router.delete(`/:id`, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ msg: "User with this Id does not exist." });

    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
