const express = require("express");
const {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createQuestion).get(protect, getQuestions);

router
  .route("/:id")
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
