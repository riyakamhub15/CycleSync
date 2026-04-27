const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addLifestyle, getLifestyle } = require("../controllers/lifestyleController");

router.post("/add", authMiddleware, addLifestyle);
router.get("/", authMiddleware, getLifestyle);

module.exports = router;