const Submission = require("../models/Submission");

// Get analytics for a specific assessment
exports.getAssessmentAnalytics = async (req, res) => {
  try {
    const submissions = await Submission.find({
      assessment: req.params.assessmentId,
    });

    const totalSubmissions = submissions.length;
    const averageScore =
      submissions.reduce((acc, submission) => acc + submission.score, 0) /
      totalSubmissions;

    res.status(200).json({
      totalSubmissions,
      averageScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
