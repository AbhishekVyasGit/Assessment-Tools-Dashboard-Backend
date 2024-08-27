const Submission = require("../models/Submission");

// Create a new submission
exports.createSubmission = async (req, res) => {
  const { assessment, answers, score } = req.body;

  try {
    const submission = new Submission({
      assessment,
      student: req.user._id,
      answers,
      score,
    });

    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all submissions for a user
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      student: req.user._id,
    }).populate("assessment");
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
