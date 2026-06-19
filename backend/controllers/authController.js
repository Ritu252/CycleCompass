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

module.exports = {
  register,

};