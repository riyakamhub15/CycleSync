const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addSymptoms, getSymptoms } = require("../controllers/symptomController");

router.post("/add", authMiddleware, addSymptoms);
router.get("/", authMiddleware, getSymptoms);

module.exports = router;