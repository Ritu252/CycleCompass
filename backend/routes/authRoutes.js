const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");

router.post("/register", register);

//router.post("/symptoms", addSymptoms);
//router.get("/symptoms", getSymptoms);

module.exports = router;