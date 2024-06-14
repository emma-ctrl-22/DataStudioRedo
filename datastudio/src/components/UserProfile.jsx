import React from 'react';
import User from '../assets/User.svg';
import MenuIcon from '@mui/icons-material/Menu';

const UserProfile = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center space-x-2 rounded-md p-3 bg-gray-200 mx-2 my-4">
      <div className="w-12 h-12 bg-red-700 rounded-full">
        <img
          className="w-full h-full"
          src={User} // Replace with the path to your profile image
          alt="User Profile"
        />
      </div>
      <div className="flex-1 mr-2">
        <h3 className="text-md font-semibold text-gray-800">Jessica</h3>
        <p className="text-sm text-gray-500">Administrator</p>
      </div>
      <MenuIcon onClick={toggleSidebar} className="cursor-pointer" style={{ color: '#5B6B79' }} />
    </div>
  );
};

export default UserProfile;
0