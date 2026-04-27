const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addCycle, getCycles } = require("../controllers/cycleController");

router.post("/add", authMiddleware, addCycle);
router.get("/", authMiddleware, getCycles);

module.exports = router;