const Feedback = require("../models/Feedback");

// Create feedback for a submission
exports.createFeedback = async (req, res) => {
  const { submission, comments } = req.body;

  try {
    const feedback = new Feedback({
      submission,
      comments,
      createdBy: req.user._id,
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get feedback for a submission
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      submission: req.params.submissionId,
    }).populate("submission");

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
