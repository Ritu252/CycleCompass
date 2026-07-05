const express = require("express");
const router = express.Router();

const {updateProfile} = require("../controllers/onboardController");

router.put("/profile/:id", updateProfile);


module.exports = router;