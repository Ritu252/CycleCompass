const db = require("../config/db");

const getReport = (req,res) => {
    const userId = req.user.userId; 

    const cycleQuery = `
            SELECT 
                id,
                DATE_FORMAT(cycle_date, '%Y-%m-%d') AS cycle_date, 
                is_period_day, 
                period_day,
                flow 
                FROM cycles WHERE user_id = ? ORDER BY cycle_date DESC`;

    const symptomQuery = `
            SELECT
                id,
                DATE_FORMAT(symptom_date, '%Y-%m-%d') AS symptom_date,
                bloating,
                facial_hair_growth,
                acne,
                hair_fall,
                mood,
                energy_level,
                weight,
                cravings,
                notes
                FROM symptoms WHERE user_id = ? ORDER BY symptom_date DESC`;

    db.query(cycleQuery, [userId], (cycleErr, cycleResults)=>{
        if(cycleErr){
            res.status(500).json({
                message : cycleErr.message,
            })
        }

        db.query(symptomQuery, [userId], (symptomErr, symptomResults)=>{
            if(symptomErr){
                res.status(500).json({
                    message : symptomErr.message,
                });
            }

            res.status(200).json({
            cycles: cycleResults,
            symptoms: symptomResults,
            });

    

        });


    });
}

module.exports = getReport;