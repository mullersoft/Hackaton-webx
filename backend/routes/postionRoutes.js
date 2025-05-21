const express = require("express");
const postionController = require("../controllers/PositionController");
const router = express.Router();

// Routes
router.get("/position", postionController.getAllPositions);
// router.get("/:id", userController.getUserById);
router.post("/position", postionController.createPosition);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

module.exports = router;
