const db = require("../config/db");

const formatSymptomList = (row) => {
  const symptoms = [];
  if (row.acne) symptoms.push("Acne");
  if (row.bloating) symptoms.push("Bloating");
  if (row.hair_fall) symptoms.push("Hair Fall");
  if (row.facial_hair_growth) symptoms.push("Facial Hair Growth");
  if (row.cravings) symptoms.push("Cravings");
  return symptoms;
};

const getHistory = (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const cycleQuery = `
    SELECT
      DATE_FORMAT(cycle_date, '%Y-%m-%d') AS entry_date,
      is_period_day,
      period_day,
      flow
    FROM cycles
    WHERE user_id = ?
    ORDER BY entry_date DESC
  `;

  const symptomQuery = `
    SELECT
      DATE_FORMAT(symptom_date, '%Y-%m-%d') AS entry_date,
      bloating,
      facial_hair_growth,
      acne,
      hair_fall,
      mood,
      energy_level,
      weight,
      cravings,
      notes
    FROM symptoms
    WHERE user_id = ?
    ORDER BY entry_date DESC
  `;

  db.query(cycleQuery, [userId], (cycleErr, cycleResults) => {
    if (cycleErr) {
      return res.status(500).json({ message: cycleErr.message });
    }

    db.query(symptomQuery, [userId], (symptomErr, symptomResults) => {
      if (symptomErr) {
        return res.status(500).json({ message: symptomErr.message });
      }

      const historyMap = new Map();

      cycleResults.forEach((cycle) => {
        const entry = {
          date: cycle.entry_date,
          cycle: cycle.is_period_day ? `Period Day ${cycle.period_day}` : "No period",
          duration: cycle.is_period_day
            ? `${cycle.period_day} Day${cycle.period_day === 1 ? "" : "s"}`
            : "-",
          flow: cycle.flow || "No flow",
          mood: "Not set",
          energy: "Not set",
          symptoms: [],
          notes: "",
        };
        historyMap.set(cycle.entry_date, entry);
      });

      symptomResults.forEach((symptom) => {
        const existing = historyMap.get(symptom.entry_date);
        const symptomEntry = {
          date: symptom.entry_date,
          mood: symptom.mood || "Not set",
          energy: symptom.energy_level || "Not set",
          symptoms: formatSymptomList(symptom),
          notes: symptom.notes || "",
        };

        if (existing) {
          historyMap.set(symptom.entry_date, {
            ...existing,
            ...symptomEntry,
          });
        } else {
          historyMap.set(symptom.entry_date, {
            date: symptom.entry_date,
            cycle: "No period",
            duration: "-",
            flow: "No flow",
            ...symptomEntry,
          });
        }
      });

      const history = Array.from(historyMap.values()).sort((a, b) =>
        b.date.localeCompare(a.date)
      );

      return res.status(200).json({ history });
    });
  });
};

module.exports = getHistory;
