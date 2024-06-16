const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // Adjust the path as needed
const Report = require('../models/Report');

// Route for creating new requests
router.post('/create-requests', async (req, res) => {
    try {
        const { author, title, desc, AssignTo, status, type } = req.body;

        const newRequest = new Request({author,title,desc,AssignTo,status,type });

        await newRequest.save();

        res.status(201).json(newRequest);
    } catch (err) {
        console.error("Error creating request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for getting requests by author
router.get('/requests-by-author', async (req, res) => {
    const { author } = req.query;

    try {
        const requests = await Request.find({ author });

        res.json({data:requests});
    } catch (err) {
        console.error("Error fetching requests by author:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/getofficialreports", async (req, res) => {
    const { name } = req.query;
    try {
      const reports = await Report.find({ sendTo: name });
      res.json({ status: "ok", data: reports });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

module.exports = router;
