const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Report = require("../models/Report");
const Request = require("../models/Request");

// GET all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/get-all-reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/requests-and-engineers", async (req, res) => {
  try {
    // Fetch all requests
    const requests = await Request.find();

    // Fetch engineers with the role of Engineer
    const engineers = await User.find({ role: "engineer" }, "username");

    res.json({ requests, engineers });
  } catch (err) {
    console.error("Error fetching requests and engineers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to assign a request to an engineer
router.put("/assign-request/:requestId", async (req, res) => {
  const { engineerUsername } = req.body;
  const { requestId } = req.params;

  try {
    // Find the request by ID and update the assignedTo field
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { assignedTo: engineerUsername },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({
      message: `Request ${requestId} assigned to ${engineerUsername} successfully`,
    });
  } catch (error) {
    console.error("Error assigning request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
