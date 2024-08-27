const Assessment = require("../models/Assessment");

// Create new assessment
exports.createAssessment = async (req, res) => {
  const { title, type, instructions, questions, timeLimit, attempts, course } =
    req.body;

  try {
    const assessment = new Assessment({
      title,
      type,
      instructions,
      questions,
      createdBy: req.user._id,
      timeLimit,
      attempts,
      course,
    });

    const savedAssessment = await assessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all assessments
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({
      createdBy: req.user._id,
    }).populate("questions");
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an assessment
exports.updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    Object.assign(assessment, req.body);
    const updatedAssessment = await assessment.save();
    res.status(200).json(updatedAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an assessment
exports.deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    await assessment.remove();
    res.status(200).json({ message: "Assessment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
