require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/assessments", require("./routes/assessmentRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Error handling middleware
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
