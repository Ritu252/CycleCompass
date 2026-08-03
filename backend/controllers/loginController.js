const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, results[0].password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: results[0].id,
        email: results[0].email,
      },
      "theSecretKi",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email,
        onboardingComplete: Boolean(
          results[0].age || results[0].height || results[0].weight || results[0].pcos_status
        ),
      },
    });
  });
};

module.exports = {
  login,
};