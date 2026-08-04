const db = require("../config/db");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDashboardSummary = (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const cycleQuery = `
    SELECT
      id,
      DATE_FORMAT(cycle_date, '%Y-%m-%d') AS cycle_date,
      is_period_day,
      period_day,
      flow
    FROM cycles
    WHERE user_id = ?
    ORDER BY cycle_date DESC
    LIMIT 1
  `;

  const streakQuery = `
    SELECT DATE_FORMAT(cycle_date, '%Y-%m-%d') AS entry_date FROM cycles WHERE user_id = ?
    UNION
    SELECT DATE_FORMAT(symptom_date, '%Y-%m-%d') AS entry_date FROM symptoms WHERE user_id = ?
    ORDER BY entry_date DESC
  `;

  db.query(cycleQuery, [userId], (cycleErr, cycleResults) => {
    if (cycleErr) {
      return res.status(500).json({ message: cycleErr.message });
    }

    const latestCycle = cycleResults[0] || null;

    db.query(streakQuery, [userId, userId], (streakErr, streakResults) => {
      if (streakErr) {
        return res.status(500).json({ message: streakErr.message });
      }

      const entryDates = (streakResults || [])
        .map((row) => row.entry_date)
        .filter(Boolean);

      const uniqueDates = [...new Set(entryDates)].sort();

      let streak = 0;
      const today = new Date();
      let cursor = new Date(today);

      while (uniqueDates.includes(formatDate(cursor))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }

      const streakMessage =
        streak === 0
          ? "Start your streak today"
          : streak === 1
          ? "You logged today"
          : "You’re on a roll";

      return res.status(200).json({
        currentCycle: {
          day: latestCycle?.period_day ? `Day ${latestCycle.period_day}` : "Not tracked",
          flow: latestCycle?.flow || "No data",
          lastLogged: latestCycle?.cycle_date || null,
        },
        streak: {
          days: streak,
          message: streakMessage,
        },
      });
    });
  });
};

module.exports = getDashboardSummary;
