const Employer = require("../models/employeerModel");
// Get all users
exports.getAllEmployer = async (req, res) => {
  try {
    const employer = await Employer.find();
    res.json({
      status: "success",
      result: employer.length,
      data: { employer },
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
exports.createEmployer= async (req, res) => {
  //   const user = new User.create(req.body);
  const employer = new Employer(req.body);
  try {
    const newEmployer = await employer.save();
    res.status(201).json({ status: "succes", data: { newEmployer } });
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
