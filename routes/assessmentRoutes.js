const express = require("express");
const {
  createAssessment,
  getAssessments,
  updateAssessment,
  deleteAssessment,
} = require("../controllers/assessmentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createAssessment).get(protect, getAssessments);

router
  .route("/:id")
  .put(protect, updateAssessment)
  .delete(protect, deleteAssessment);

module.exports = router;
