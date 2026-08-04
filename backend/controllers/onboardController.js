const db = require("../config/db");

const getProfile = (req, res) => {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const query = "SELECT age, height, weight, pcos_status FROM users WHERE id = ?";

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const profile = results[0];

        return res.status(200).json({
            profile: {
                age: profile.age,
                height: profile.height,
                weight: profile.weight,
                condition: profile.pcos_status || "",
            },
        });
    });
};

const updateProfile = (req, res) => {
    const { age, height, weight, pcos_status } = req.body;
    const userId = req.user?.userId || req.params.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const query = "UPDATE users SET age = ?, height = ?, weight = ?, pcos_status = ? WHERE id = ?";

    db.query(query, [age, height, weight, pcos_status, userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
        });
    });
};

module.exports = { getProfile, updateProfile };