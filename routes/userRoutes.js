const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
