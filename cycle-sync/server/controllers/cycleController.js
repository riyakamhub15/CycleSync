const Cycle = require("../models/Cycle");

// Add Cycle
exports.addCycle = async (req, res) => {
  try {
    const { periodStart, periodEnd } = req.body;

    const cycleLength =
      (new Date(periodEnd) - new Date(periodStart)) / (1000 * 60 * 60 * 24);

    const cycle = new Cycle({
      userId: req.user.id,
      periodStart,
      periodEnd,
      cycleLength
    });

    await cycle.save();

    res.status(201).json(cycle);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cycles
exports.getCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user.id });
    res.json(cycles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};