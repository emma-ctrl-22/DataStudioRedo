import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const UserForm = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, phone, password, role };

    const promise = axios.post('http://localhost:8080/api/auth/register', userData)
      .then(response => {
        console.log('Registration Successful:', response.data);
        clearForm();
        return response.data; // Pass data to the success callback
      })
      .catch(error => {
        console.error('Registration Failed:', error.message);
        throw new Error('Registration failed. Please try again.'); // Throw error for error callback
      });

    toast.promise(promise, {
      loading: 'Registering user...',
      success: (data) => {
        return 'User registered successfully!';
      },
      error: (err) => {
        return err.message || 'Failed to register user.';
      }
    });
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setRole('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-4 border-2 mt-4 border-gray-600 rounded-md">
      <Toaster /> {/* Toaster component from react-hot-toast for displaying toasts */}
      <div className="col-span-1">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Phone</label>
        <input
          type="tel"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Role</label>
        <select
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Client">Client</option>
          <option value="Engineer">Engineer</option>
        </select>
      </div>
      <div className="col-span-1">
        <label className="block text-gray-700">Password</label>
        <input
          type='password'
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="col-span-3 flex justify-end">
        <button
          type="submit"
          className="py-2 px-4 mt-6 border rounded-md bg-red-500 text-white"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={clearForm}
          className="py-2 px-4 mt-6 ml-2 border rounded-md bg-red-500 text-white"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default UserForm;
