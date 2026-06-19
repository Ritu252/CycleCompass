const express = require("express");
const router = express.Router();

const addCycle = require("../controllers/addCycleController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addCycle);

module.exports = router;
