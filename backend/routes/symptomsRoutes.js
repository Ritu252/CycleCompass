const express = require("express");
const router = express.Router();

const addSymptoms = require("../controllers/addSymptomsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addSymptoms);

module.exports = router;