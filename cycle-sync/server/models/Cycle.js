const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  periodStart: Date,
  periodEnd: Date,
  cycleLength: Number
}, { timestamps: true });

module.exports = mongoose.model("Cycle", cycleSchema);