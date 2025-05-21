const express = require("express");
const employeeController = require("../controllers/employeeController");
const router = express.Router();

// Routes
router.get("/employee", employeeController.getAllEmployee);
// router.get("/:id", userController.getUserById);
router.post("/employee", employeeController.createEmployee);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
