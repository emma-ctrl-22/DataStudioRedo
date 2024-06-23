const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Report = require("../models/Report");
const Request = require("../models/Request");
const mongoose = require('mongoose');

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
    const requests = await Request.find();
    const engineers = await User.find({ role: "engineer" }, "username");
    res.json({ requests, engineers });
  } catch (err) {
    console.error("Error fetching requests and engineers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/assign-request", async (req, res) => {
  const { engineerUsername,requestId } = req.body;
 console.log("requestId", requestId);
 console.log("engineerUsername", engineerUsername);
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { AssignTo: engineerUsername },
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

//////////////////////////////////////////// Dahboard Routes//////////////////////////////////////////////////////

// Route to get totals and daily report count
router.get("/totals", async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const totalRequests = await Request.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyReports = await Report.countDocuments({
      createdAt: { $gte: today }
    });

    const completedRequests = await Request.countDocuments({
      status: "done"
    });

    const uncompletedRequests = await Request.countDocuments({
      status: "Pending"
    });

    res.json({
      totalReports,
      totalRequests,
      dailyReports,
      completedRequests,
      uncompletedRequests,
    });
  } catch (err) {
    console.error("Error fetching totals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get report counts for each day of the current week
router.get("/weekly-reports", async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Set to Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    const reports = await Report.aggregate([
      { 
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$createdAt" },
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.dayOfWeek",
          counts: {
            $push: {
              type: "$_id.type",
              count: "$count"
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const result = {};

    weekDays.forEach((day, index) => {
      result[day] = {
        PMReport: 0,
        PPMReport: 0,
        CMReport: 0
      };

      const dayReport = reports.find(report => report._id === index + 1);
      if (dayReport) {
        dayReport.counts.forEach(count => {
          result[day][count.type] = count.count;
        });
      }
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching weekly reports:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get annual report counts by type
router.get("/annual-reports", async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

    const reports = await Report.aggregate([
      { 
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      PMReport: 0,
      PPMReport: 0,
      CMReport: 0
    };

    reports.forEach(report => {
      result[report._id] = report.count;
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching annual reports:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/annual-requests", async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

    const requests = await Request.aggregate([
      { 
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      PMReport: 0,
      PPMReport: 0,
      CMReport: 0
    };

    requests.forEach(request => {
      result[request._id] = request.count;
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching annual reports:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
