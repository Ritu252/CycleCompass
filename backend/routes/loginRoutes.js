const express = require("express");
const router = express.Router();

const { login } = require("../controllers/loginController");

router.post("/login", login);
//router.post("/symptoms", addSymptoms);
//router.get("/symptoms", getSymptoms);

module.exports = router;