const Symptom = require("../models/Symptom");

// Add Symptoms
exports.addSymptoms = async (req, res) => {
  try {
    const { cramps, acne, mood, headache, fatigue } = req.body;

    const symptom = new Symptom({
      userId: req.user.id,
      cramps,
      acne,
      mood,
      headache,
      fatigue
    });

    await symptom.save();

    res.status(201).json(symptom);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Symptoms
exports.getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user.id });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};