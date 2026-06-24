const db = require("../config/db");

const addSymptoms = (req, res) => {
    const { bloating, facial_hair_growth, acne, hair_fall, mood, energy_level, weight, cravings, notes, } = req.body;

    const userId = req.user.userId;
    const symptomDate = new Date().toISOString().split("T")[0];

    const query = "INSERT INTO symptoms ( user_id, symptom_date, bloating, facial_hair_growth, acne, hair_fall, mood, energy_level, weight, cravings, notes ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
    db.query(query, [userId, symptomDate, bloating, facial_hair_growth, acne, hair_fall, mood, energy_level, weight, cravings, notes], (err, result) => {
        if(err){
            return res.status(500).json({
                message : err.message,
            });
        }

        return res.status(201).json({
            message : "Symptoms added successfully",
        })

    })
}

module.exports = addSymptoms;