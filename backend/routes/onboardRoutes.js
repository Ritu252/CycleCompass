const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/onboardController");

router.get("/profile/me", authMiddleware, getProfile);
router.put("/profile/me", authMiddleware, updateProfile);
router.put("/profile/:id", updateProfile);

module.exports = router;