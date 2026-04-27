const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("CycleSync API is running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user
  });
});

const cycleRoutes = require("./routes/cycleRoutes");

app.use("/api/cycles", cycleRoutes);

const symptomRoutes = require("./routes/symptomRoutes");

app.use("/api/symptoms", symptomRoutes);

const lifestyleRoutes = require("./routes/lifestyleRoutes");

app.use("/api/lifestyle", lifestyleRoutes);

const insightRoutes = require("./routes/insightRoutes");

app.use("/api/insights", insightRoutes);