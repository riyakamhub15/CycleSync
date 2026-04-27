const Lifestyle = require("../models/Lifestyle");

// Add Lifestyle
exports.addLifestyle = async (req, res) => {
  try {
    const { waterIntake, sleepHours, exercise, weight } = req.body;

    const lifestyle = new Lifestyle({
      userId: req.user.id,
      waterIntake,
      sleepHours,
      exercise,
      weight
    });

    await lifestyle.save();

    res.status(201).json(lifestyle);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Lifestyle
exports.getLifestyle = async (req, res) => {
  try {
    const data = await Lifestyle.find({ userId: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};