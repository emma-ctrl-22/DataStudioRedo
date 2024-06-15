import React, { useState, useEffect } from "react";
import axios from "axios";
import {Skeleton,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Modal,Box,Button,} from "@mui/material";
import { ReportCreationModal } from "./components";

// Fake JSON data for simulation
const fakeRequests = [
  { _id: "1", type: "Type 1", author: "Author 1" },
  { _id: "2", type: "Type 2", author: "Author 2" },
  { _id: "3", type: "Type 3", author: "Author 3" },
];

const CreateReport = () => {
  const [loading, setLoading] = useState(true);
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setAssignedRequests(fakeRequests);
      setLoading(false);
    }, 2000);
  }, []);

  const handleReportSubmit = (reportDetails) => {
    console.log("Report submitted: ", reportDetails);
    setIsModalOpen(false);
  };

  return (
    <div className="py-4 px-8">
      <div className="mt-3 mb-3 rounded-md">
        <h1 className="text-md text-left text-red-500 ">
          <span className="bg-red-100 p-1 rounded-md">Create Report</span>
        </h1>
      </div>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request._id}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.author}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsModalOpen(true);
                      }}
                    >
                      Create Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className="modal-box">
          <ReportCreationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleReportSubmit}
            defaultValues={selectedRequest || {}}
            selectedRequestId={selectedRequest?._id}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default CreateReport;
