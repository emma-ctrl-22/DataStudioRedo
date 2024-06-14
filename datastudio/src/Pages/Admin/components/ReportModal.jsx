import React from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import jsPDF from "jspdf";
import 'jspdf-autotable';

const ReportModal = ({ report, onClose }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set document header
    doc.setFontSize(22);
    doc.text("Report", 105, 15, { align: "center" });

    // Set table header styles
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.setFontStyle("bold");

    const tableData = [
      ["Engineer", report?.Engineer],
      ["Facility Name", report?.FacilityName],
      ["Serial Number", report?.SerialNumber],
      ["Type", report?.type],
      ["Equipment Name", report?.EquipmentName],
    ];

    // Create the table
    doc.autoTable({
      startY: 25,
      head: [["Field", "Value"]],
      body: tableData,
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineWidth: 0.1,
        lineColor: 200,
      },
      columnStyles: {
        0: { fontStyle: "bold" },
      },
      margin: { top: 25 },
    });

    // Save the PDF
    doc.save("report.pdf");
  };

  return (
    <Modal open={!!report} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Report Details
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Engineer: {report?.Engineer}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Facility Name: {report?.FacilityName}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Serial Number: {report?.SerialNumber}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Type: {report?.type}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Equipment Name: {report?.EquipmentName}
        </Typography>
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>
      
    </Modal>
  );
};

export default ReportModal;
