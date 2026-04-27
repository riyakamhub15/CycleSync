const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getInsights } = require("../controllers/insightController");

router.get("/", authMiddleware, getInsights);

module.exports = router;