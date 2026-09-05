const db = require("../config/db");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";
const LOOKBACK_DAYS = 90;

const SYSTEM_PROMPT =
  "You are a supportive menstrual and PCOS health assistant. Given a 90-day summary of a user's period days and symptom check-ins (JSON), write a short, encouraging, plain-language insight highlighting patterns (e.g. cycle regularity, recurring symptoms, mood/energy/weight trends). Do not diagnose conditions or give medical advice beyond suggesting when to discuss something with a doctor. Keep it concise (under 200 words).";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildSymptomLog = (row) => {
  const log = { date: row.entry_date };

  if (row.mood) log.mood = row.mood;
  if (row.energy_level) log.energy = row.energy_level;
  if (row.weight !== null && row.weight !== "") log.weight = Number(row.weight);
  if (row.bloating) log.bloating = true;
  if (row.acne) log.acne = true;
  if (row.hair_fall) log.hairFall = true;
  if (row.facial_hair_growth) log.facialHairGrowth = true;
  if (row.cravings) log.cravings = true;
  // Free-text notes are intentionally excluded from the payload sent to Gemini's
  // free tier, since that content may be used by Google to improve their models.

  return log;
};

const buildSummary = (cycles, symptoms, rangeStart, rangeEnd) => {
  const periodDays = cycles
    .filter((row) => row.is_period_day)
    .map((row) => ({
      date: row.entry_date,
      periodDay: row.period_day,
      flow: row.flow || undefined,
    }));

  const symptomLogs = symptoms.map(buildSymptomLog);

  return {
    rangeStart,
    rangeEnd,
    totalPeriodDays: periodDays.length,
    totalCheckIns: symptomLogs.length,
    periodDays,
    symptomLogs,
  };
};

const requestGeminiInsight = async (summary) => {
  const prompt = `${SYSTEM_PROMPT}\n\nHere is the user's recent health summary:\n${JSON.stringify(summary)}`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        thinkingConfig: {
          thinkingLevel: "minimal",
        },
      },
    }),
  });

  console.log("GEMINI RESPONSE BACKEND", response);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error body:", errorText);
    throw new Error(
      `Gemini API request failed with status ${response.status}: ${errorText}`
    );
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

const getHealthInsights = (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const today = new Date();
  const startDateObj = new Date(today);
  startDateObj.setDate(startDateObj.getDate() - LOOKBACK_DAYS);

  const rangeStart = formatDate(startDateObj);
  const rangeEnd = formatDate(today);

  const cycleQuery = `
    SELECT
      DATE_FORMAT(cycle_date, '%Y-%m-%d') AS entry_date,
      is_period_day,
      period_day,
      flow
    FROM cycles
    WHERE user_id = ? AND cycle_date >= ?
    ORDER BY entry_date ASC
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
    WHERE user_id = ? AND symptom_date >= ?
    ORDER BY entry_date ASC
  `;

  db.query(cycleQuery, [userId, rangeStart], (cycleErr, cycleResults) => {
    if (cycleErr) {
      return res.status(500).json({ message: cycleErr.message });
    }

    db.query(symptomQuery, [userId, rangeStart], async (symptomErr, symptomResults) => {
      if (symptomErr) {
        return res.status(500).json({ message: symptomErr.message });
      }

      const summary = buildSummary(cycleResults, symptomResults, rangeStart, rangeEnd);

      if (summary.totalPeriodDays === 0 && summary.totalCheckIns === 0) {
        return res.status(200).json({
          summary,
          insight: null,
          message: "Not enough data in the last 90 days to generate insights.",
        });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          message: "GEMINI_API_KEY is not configured on the server.",
        });
      }

      try {
        const insight = await requestGeminiInsight(summary);
        return res.status(200).json({ summary, insight });
      } catch (error) {
        return res.status(502).json({
          message: "Failed to generate insight.",
          detail: error.message,
        });
      }
    });
  });
};

module.exports = getHealthInsights;
