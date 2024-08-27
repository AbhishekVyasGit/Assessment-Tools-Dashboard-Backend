const Question = require("../models/Question");

// Create a new question
exports.createQuestion = async (req, res) => {
  const { questionText, type, options, correctAnswer } = req.body;

  try {
    const question = new Question({
      questionText,
      type,
      options,
      correctAnswer,
      createdBy: req.user._id,
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ createdBy: req.user._id });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    Object.assign(question, req.body);
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.remove();
    res.status(200).json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
