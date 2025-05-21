const express = require("express");
const employerController = require("../controllers/employerController");
const router = express.Router();

// Routes
router.get("/employer", employerController.getAllEmployer);
// router.get("/:id", userController.getUserById);
router.post("/employer", employerController.createEmployer);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
