const Cycle = require("../models/Cycle");
const Symptom = require("../models/Symptom");
const Lifestyle = require("../models/Lifestyle");

exports.getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch data
    const cycles = await Cycle.find({ userId });
    const symptoms = await Symptom.find({ userId });
    const lifestyle = await Lifestyle.find({ userId });

    let insights = [];

    // 🔹 1. Cycle Irregularity Detection
    if (cycles.length >= 2) {
      const sortedCycles = cycles.sort(
        (a, b) => new Date(b.periodStart) - new Date(a.periodStart)
      );

      let cycleLengths = [];

      for (let i = 0; i < sortedCycles.length - 1; i++) {
        const current = new Date(sortedCycles[i].periodStart);
        const next = new Date(sortedCycles[i + 1].periodStart);

        const diff =
          (current - next) / (1000 * 60 * 60 * 24);

        cycleLengths.push(diff);
      }

      const avgCycle =
        cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;

      if (avgCycle > 35) {
        insights.push("Your cycle seems irregular (possible PCOD pattern)");
      }
    }

    // 🔹 2. Frequent Cramps Detection
    const crampsCount = symptoms.filter(s => s.cramps).length;
    if (crampsCount >= 3) {
      insights.push("Frequent cramps detected in recent logs");
    }

    // 🔹 3. Exercise Impact
    const exerciseDays = lifestyle.filter(l => l.exercise).length;
    if (exerciseDays >= 3) {
      insights.push("Regular exercise may be helping your cycle");
    }

    // 🔹 4. Sleep Insight
    const avgSleep =
      lifestyle.reduce((sum, l) => sum + (l.sleepHours || 0), 0) /
      (lifestyle.length || 1);

    if (avgSleep < 6) {
      insights.push("Low sleep may affect your hormonal balance");
    }

    // 🔮 5. CORRECT PERIOD PREDICTION
 // 🔮 FINAL CLEAN PREDICTION (NO BUG VERSION)

let prediction = null;

if (cycles.length >= 2) {

  // Step 1: Extract ONLY periodStart dates
  const dates = cycles.map(c => new Date(c.periodStart));

  // Step 2: Sort ascending (old → new)
  dates.sort((a, b) => a - b);

  // Step 3: Calculate gaps between consecutive dates
  let diffs = [];

  for (let i = 1; i < dates.length; i++) {
    const diffDays = Math.round(
      (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24)
    );
    diffs.push(diffDays);
  }

  console.log("DATES:", dates);
  console.log("DIFFS:", diffs);

  // Step 4: Calculate average
  const avg =
    diffs.reduce((a, b) => a + b, 0) / diffs.length;

  // Step 5: Predict next period
  const lastDate = dates[dates.length - 1];

  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + Math.round(avg));

  prediction = {
    averageCycleLength: Math.round(avg),
    nextPeriodDate: nextDate
  };
}

    // Final response
    res.json({
      insights,
      prediction
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};