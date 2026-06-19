const express = require("express");
const router = express.Router();

const getReport = require("../controllers/getReportController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getReport);

module.exports = router;