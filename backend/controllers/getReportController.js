const db = require("../config/db");

const getReport = (req,res) => {
    const userId = req.user.userId; 

    const cycleQuery = "SELECT * FROM cycles WHERE user_id = ? ORDER BY start_date DESC";

    const symptomQuery = "SELECT * FROM symptoms WHERE user_id = ? ORDER BY symptom_date DESC";

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