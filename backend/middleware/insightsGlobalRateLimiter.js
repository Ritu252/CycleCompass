const { rateLimit } = require("express-rate-limit");

const DAILY_CAP = Number(process.env.GEMINI_DAILY_REQUEST_CAP) || 200;

const insightsGlobalRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: DAILY_CAP,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: () => "global",
  message: {
    message: "The app has reached its daily AI insight quota. Please try again tomorrow.",
  },
});

module.exports = insightsGlobalRateLimiter;
