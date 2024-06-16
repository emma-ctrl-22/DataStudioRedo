const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const Request = require("../models/Request");

// GET all reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/requests", async (req, res) => {
  const { name } = req.query;

  try {
    const requests = await Request.find({ AssignTo: name, status: "Pending" });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

router.post("/create-report-and-update-status", async (req, res) => {
  const {
    Engineer,
    facilityName,
    equipmentName,
    serialNumber,
    modelNumber,
    problemDesc,
    workDone,
    furtherWorks,
    furtherWorkDesc,
    type,
    selectedRequestId,
  } = req.body;

  try {
    // Step 1: Create a new report
    const newReport = new Report({
        Engineer: Engineer,
      FacilityName: facilityName,
      EquipmentName: equipmentName,
      SerialNumber: serialNumber,
      modelNumber: modelNumber,
      ProblemDesc: problemDesc,
      WorkDone: workDone,
      requestId: selectedRequestId,
      FurtherWorks: furtherWorks,
      FurtherWorkDesc: furtherWorks === "true" ? furtherWorkDesc : "",
      type: type,
      sent: false, // Assuming initial report is not sent
    });

    const savedReport = await newReport.save();

    // Step 2: Update request status to "done"
    const updatedRequest = await Request.findByIdAndUpdate(selectedRequestId, {
      status: "done",
    });

    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.status(200).json({
      message: "Report created successfully and request status updated to done",
      report: savedReport,
      updatedRequest: updatedRequest,
    });
  } catch (error) {
    console.error("Error creating report and updating request status:", error);
    res
      .status(500)
      .json({ error: "Failed to create report and update request status" });
  }
});

module.exports = router;
