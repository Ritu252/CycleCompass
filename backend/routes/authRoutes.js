const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { register, changePassword } = require("../controllers/authController");

router.post("/register", register);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;