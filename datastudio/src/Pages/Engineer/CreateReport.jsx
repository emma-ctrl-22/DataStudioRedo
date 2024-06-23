import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button } from "@mui/material";
import { ReportCreationModal } from "./components";
import { AuthContext } from "../../Context/AuthContext";

const CreateReport = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const username = userInfo.username;

  useEffect(() => {
    fetchAssignedRequests();
  }, []);

  const fetchAssignedRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/engineer/requests", {
        params: {
          name: username// Replace with dynamic name if needed
        }
      });
      setAssignedRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assigned requests:", error);
    }
  };

  const handleReportSubmit = (reportDetails) => {
    console.log("Report submitted: ", reportDetails);
    setIsModalOpen(false);
  };

  return (
    <div style={{fontFamily:"Montserrat"}} className="py-4 px-8 bg-gray-900 text-white">
      <div className="mt-3 mb-3 rounded-md">
        <h1 className="text-md text-left text-blue-500 ">
          <span className="bg-blue-100 p-1 rounded-md">Create Report</span>
        </h1>
      </div>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <TableContainer component={Paper}>
          <Table className="bg-gray-900 border text-white">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>ID</TableCell>
                <TableCell style={{ color: 'white' }}>Type</TableCell>
                <TableCell style={{ color: 'white' }}>Author</TableCell>
                <TableCell style={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell style={{ color: 'white' }} >{request._id}</TableCell>
                  <TableCell style={{ color: 'white' }}>{request.type}</TableCell>
                  <TableCell style={{ color: 'white' }}>{request.author}</TableCell>
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
