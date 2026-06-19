const express = require("express");
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const symptomsRoutes = require("./routes/symptomsRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(express.json());

//Attach all routes from authRoutes under the prefix /api/auth
app.use("/api/auth", authRoutes);

//Attach all routes from loginRoutes under the prefix /api/auth
app.use("/api/auth", loginRoutes);

//Attach all routes from symptomRoutes under the prefix /api/symptoms
app.use("/api/symptoms", symptomsRoutes);

//Attach all routes from symptomRoutes under the prefix /api/cycle
app.use("/api/cycle", cycleRoutes);

//For getting reports 
app.use("/api/report", reportRoutes);


//for middleware jwt authentication
app.get("/api/profile", authMiddleware, (req,res)=>{
      res.json({
      message: "Protected route accessed",
      user: req.user,
      });

});



// app.get("/api/symptom", )

app.get("/", (req, res) => {
  res.send("CycleCompass API Running 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});