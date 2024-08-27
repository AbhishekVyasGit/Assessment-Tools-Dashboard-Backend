const express = require("express");
const {
  getAssessmentAnalytics,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/:assessmentId").get(protect, getAssessmentAnalytics);

module.exports = router;
