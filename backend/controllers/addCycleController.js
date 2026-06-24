const db = require("../config/db");

const addCycle = (req, res) => {
  const {
    is_period_day,
    period_day,
    flow,
  } = req.body;

  const userId = req.user.userId;

  const cycleDate = new Date()
    .toISOString()
    .split("T")[0];

  if ((Number(is_period_day) === 1)  && (!period_day || !flow)) {
    return res.status(400).json({
      message:
        "period_day and flow are required when is_period_day is true",
    });
  }

  const query = `
    INSERT INTO cycles
    (
      user_id,
      cycle_date,
      is_period_day,
      period_day,
      flow
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      userId,
      cycleDate,
      is_period_day,
      period_day,
      flow,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(201).json({
        message: "Cycle entry added successfully!",
      });
    }
  );
};

module.exports = addCycle;