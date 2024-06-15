import React, { useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ReportCreationModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues = {},
  selectedRequestId,
}) => {
  const [facilityName, setFacilityName] = useState(defaultValues.facilityName || "");
  const [equipmentName, setEquipmentName] = useState(defaultValues.equipmentName || "");
  const [serialNumber, setSerialNumber] = useState(defaultValues.serialNumber || "");
  const [modelNumber, setModelNumber] = useState(defaultValues.modelNumber || "");
  const [problemDesc, setProblemDesc] = useState(defaultValues.problemDesc || "");
  const [workDone, setWorkDone] = useState(defaultValues.workDone || "");
  const [furtherWorks, setFurtherWorks] = useState(defaultValues.furtherWorks || "false");
  const [furtherWorkDesc, setFurtherWorkDesc] = useState(defaultValues.furtherWorkDesc || "");
  const [reportType, setReportType] = useState(defaultValues.type || "");

  if (!isOpen) return null;

  const validateForm = () => {
    if (!facilityName) {
      toast.error("Facility Name is required");
      return false;
    }
    if (!equipmentName) {
      toast.error("Equipment Name is required");
      return false;
    }
    if (!serialNumber) {
      toast.error("Serial Number is required");
      return false;
    }
    if (!modelNumber) {
      toast.error("Model Number is required");
      return false;
    }
    if (!problemDesc) {
      toast.error("Problem Description is required");
      return false;
    }
    if (!workDone) {
      toast.error("Work Done is required");
      return false;
    }
    if (reportType ==="") {
      toast.error("Report Type is required");
      return false;
    }
    return true;
  };

  const makeReport = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const reportDetails = {
      FacilityName: facilityName,
      EquipmentName: equipmentName,
      SerialNumber: serialNumber,
      modelNumber: modelNumber,
      ProblemDesc: problemDesc,
      WorkDone: workDone,
      FurtherWorks: furtherWorks,
      FurtherWorkDesc: furtherWorks === "true" ? furtherWorkDesc : "",
      type: reportType,
      requestId: selectedRequestId,
    };

    axios
      .post("http://localhost:8080/createreport", reportDetails)
      .then((res) => {
        toast.success("Report Created Successfully");
        setFacilityName("");
        setEquipmentName("");
        setSerialNumber("");
        setModelNumber("");
        setProblemDesc("");
        setWorkDone("");
        setFurtherWorks("false");
        setFurtherWorkDesc("");
        setReportType("");
        onClose();
        onSubmit(reportDetails);
      })
      .catch((error) => {
        toast.error("Failed to create report");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create Report</h2>
        <form onSubmit={makeReport} className="space-y-4">
          <div>
            <input
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              placeholder="Facility Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Equipment Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Serial Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="Model Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <textarea
              value={problemDesc}
              onChange={(e) => setProblemDesc(e.target.value)}
              placeholder="Problem Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <textarea
              value={workDone}
              onChange={(e) => setWorkDone(e.target.value)}
              placeholder="Work Done"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <select
              value={furtherWorks}
              onChange={(e) => setFurtherWorks(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="false">No Further Works</option>
              <option value="true">Further Works Required</option>
            </select>
          </div>
          {furtherWorks === "true" && (
            <div>
              <textarea
                value={furtherWorkDesc}
                onChange={(e) => setFurtherWorkDesc(e.target.value)}
                placeholder="Further Work Description"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}
          <div>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Report Type</option>
              <option value="CMReport">CMReport</option>
              <option value="PMReport">PMReport</option>
              <option value="PPMReport">PPMReport</option>
              <option value="regular">Regular</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Report
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default ReportCreationModal;
