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

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!facilityName) newErrors.facilityName = "Facility Name is required";
    if (!equipmentName) newErrors.equipmentName = "Equipment Name is required";
    if (!problemDesc) newErrors.problemDesc = "Problem Description is required";
    if (!workDone) newErrors.workDone = "Work Done is required";
    if (!reportType) newErrors.reportType = "Report Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const makeReport = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
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
              className={`w-full p-2 border ${errors.facilityName ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.facilityName && <p className="text-red-500 text-sm">{errors.facilityName}</p>}
          </div>
          <div>
            <input
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Equipment Name"
              required
              className={`w-full p-2 border ${errors.equipmentName ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.equipmentName && <p className="text-red-500 text-sm">{errors.equipmentName}</p>}
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
              className={`w-full p-2 border ${errors.problemDesc ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.problemDesc && <p className="text-red-500 text-sm">{errors.problemDesc}</p>}
          </div>
          <div>
            <textarea
              value={workDone}
              onChange={(e) => setWorkDone(e.target.value)}
              placeholder="Work Done"
              className={`w-full p-2 border ${errors.workDone ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.workDone && <p className="text-red-500 text-sm">{errors.workDone}</p>}
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
              required
              className={`w-full p-2 border ${errors.reportType ? 'border-red-500' : 'border-gray-300'} rounded`}
            >
              <option value="">Select Report Type</option>
              <option value="CMReport">CMReport</option>
              <option value="PMReport">PMReport</option>
              <option value="PPMReport">PPMReport</option>
              <option value="regular">Regular</option>
            </select>
            {errors.reportType && <p className="text-red-500 text-sm">{errors.reportType}</p>}
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
