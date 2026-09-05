const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const insightsRateLimiter = require("../middleware/insightsRateLimiter");
const insightsGlobalRateLimiter = require("../middleware/insightsGlobalRateLimiter");
const getHealthInsights = require("../controllers/insightsController");

router.get(
  "/",
  authMiddleware,
  insightsRateLimiter,
  insightsGlobalRateLimiter,
  getHealthInsights
);

module.exports = router;
