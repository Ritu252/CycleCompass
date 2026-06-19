const db = require("../config/db");

const addCycle = (req, res) => {
    const { start_date, end_date} = req.body;

    const userId = req.user.userId;     //req.user = decoded(an object) and req.user.userId is an user id of user that we got in response with token.

    const query = "INSERT INTO cycles ( user_id, start_date, end_date ) VALUES (?, ?, ?)";
    db.query(query, [userId, start_date, end_date], (err, result)=>{
        if(err){
            return res.status(500).json({
                message : err.message,
            });
        }

        return res.status(201).json({
            message : "cycle added successfully!",
        })
    });
}

module.exports = addCycle;