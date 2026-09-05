const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const DAILY_LIMIT = 3;

const insightsRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: DAILY_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) =>
    req.user?.userId ? `user:${req.user.userId}` : ipKeyGenerator(req.ip),
  message: {
    message: `You've reached today's limit of ${DAILY_LIMIT} AI health insight requests. Please try again tomorrow.`,
  },
});

module.exports = insightsRateLimiter;
