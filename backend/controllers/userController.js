const db = require("../config/db");

const updateProfile = (req, res) => {
    const {age, height, weight, pcos_status} = req.body;

    const userId = req.params.id;

    const query = "UPDATE users SET age = ?, height = ?, weight = ?, pcos_status = ? WHERE id = ?";

    db.query(query, [age, height, weight, pcos_status, userId], (err, result) => {
        if(err){
            return res.status(500).json({
                message : err.message,
            })
        }

        if(result.affectedRows === 0){
            return res.status(400).json({
                message : "User not found",
            })
        }

        return res.status(200).json({
            message : "Profile updated successfully",
        })
    })

}

module.exports = { updateProfile, }