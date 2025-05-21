const express = require("express");
const payrollController = require("../controllers/payrollController");
const router = express.Router();

// Routes
router.get("/payroll", payrollController.getPayroll);
// router.get("/:id", userController.getUserById);
// router.post("/position", postionController.createPosition);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
