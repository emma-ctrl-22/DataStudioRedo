import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios'; // Import Axios

const CreateRequest = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const author="nico@gmail.com"

  const sendRequest = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !type || !description) {
      toast.error('All fields are required!');
      return;
    }

    const requestData = {
      author,
      title,
      type,
      desc: description,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/client/create-requests', requestData);

      // Handle success
      console.log('Response:', response.data);

      // Clear form after successful submission
      setTitle('');
      setType('');
      setDescription('');

      // Show success message
      toast.success('Request submitted successfully!');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="the-bottom text-center">
        <h2 style={{ fontFamily: 'Montserrat', color: 'white' }}>New Request</h2>
        <p style={{ fontFamily: 'Montserrat', color: 'white', opacity: '0.5', fontSize: '0.9rem' }}>
          Send a new request now
        </p>
        <form onSubmit={sendRequest} style={{width:"30vw"}}>
          <label className="mt-4">
            <span className="text-sm text-left" style={{ fontFamily: 'Montserrat', color: 'white',alignSelf:"start" }}>
              Request Title
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a Title for your Request"
              className="block w-full mt-1 px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
            />
          </label>
          <label className="mt-4">
            <span className="text-sm text-left" style={{ fontFamily: 'Montserrat', color: 'white' }}>
              Request Type
            </span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="block w-full mt-1 px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="CMReport">CM REPORT</option>
              <option value="PMReport">PM REPORT</option>
              <option value="PPMReport">PPM REPORT</option>
              <option value="regular">Regular</option>
            </select>
          </label>
          <label className="block mt-4">
            <span className="text-sm" style={{ fontFamily: 'Montserrat', color: 'white' }}>
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your report..."
              maxLength="200"
              className="block w-full mt-1 px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
              style={{ fontFamily: 'Montserrat', color: 'white' }}
            ></textarea>
          </label>
          <button
            type="submit"
            className="block mt-6 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:outline-none"
          >
            Create Request
          </button>
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default CreateRequest;
