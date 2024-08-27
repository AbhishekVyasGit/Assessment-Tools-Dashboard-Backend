const express = require("express");
const {
  createSubmission,
  getSubmissions,
} = require("../controllers/submissionController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createSubmission).get(protect, getSubmissions);

module.exports = router;
