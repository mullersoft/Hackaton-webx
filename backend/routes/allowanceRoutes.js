const express = require("express");
const allowanceController = require("../controllers/allowanceController");
const router = express.Router();

// Routes
router.get("/allowance", allowanceController.getAllAllowance);
// router.get("/:id", userController.getUserById);
router.post("/allowance", allowanceController.createallowance);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
