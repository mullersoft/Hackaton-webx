const position = require("../models/positionModel");
// Get all users
exports.getAllPositions = async (req, res) => {
  try {
    const positions = await position.find();
    res.json({
      status: "success",
      result: positions.length,
      data: { positions },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ status: "success", data: { user } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Create new user
exports.createPosition = async (req, res) => {
  const position1 = new position(req.body);
  try {
    const positions = await position1.save();
    res.status(201).json({ status: "succes", data: { positions } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ status: "success", data: { updatedUser } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
