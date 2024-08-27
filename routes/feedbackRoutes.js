const express = require("express");
const {
  createFeedback,
  getFeedback,
} = require("../controllers/feedbackController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createFeedback);

router.route("/:submissionId").get(protect, getFeedback);

module.exports = router;
