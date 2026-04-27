const mongoose = require("mongoose");

const lifestyleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  waterIntake: Number, // glasses
  sleepHours: Number,
  exercise: Boolean,
  weight: Number
}, { timestamps: true });

module.exports = mongoose.model("Lifestyle", lifestyleSchema);