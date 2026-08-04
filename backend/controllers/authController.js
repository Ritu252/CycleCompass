const db = require("../config/db");
const bcrypt = require("bcrypt");

//req = Request object (data coming from the client)
//res = Response object (used to send data back)
const register = async (req,res)=>{
  const { name, email, password } = req.body;
  const query =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  if (!name || !email || !password) {
        return res.status(400).json({
        message: "All fields are required",
    });
  }
  const hashedPassword = await bcrypt.hash(password,10);
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(201).json({
      message: "User registered successfully",
    });
  });
};

const changePassword = (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New passwords do not match" });
  }

  const selectQuery = "SELECT password FROM users WHERE id = ?";
  db.query(selectQuery, [userId], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, results[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = "UPDATE users SET password = ? WHERE id = ?";

    db.query(updateQuery, [hashedPassword, userId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ message: updateErr.message });
      }

      return res.status(200).json({ message: "Password updated successfully" });
    });
  });
};

module.exports = {
  register,
  changePassword,
};