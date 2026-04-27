const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  cramps: Boolean,
  acne: Boolean,
  mood: String,
  headache: Boolean,
  fatigue: Boolean
}, { timestamps: true });

module.exports = mongoose.model("Symptom", symptomSchema);