import { useContext } from 'react';
import User from '../assets/User.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../Context/AuthContext';

const UserProfile = ({ toggleSidebar }) => {
  const { userInfo } = useContext(AuthContext);
  const name = userInfo?.username || 'J';
  const role = userInfo?.role || 'User'; // Default to 'User' if role is not available

  return (
    <div className="flex items-center space-x-2 rounded-md p-3 bg-blue-200  mx-2 my-4 border-2 border-gray-600" >
      <div className="w-12 h-12 bg-blue-700 rounded-full">
        <img
          className="w-full h-full"
          src={User} // Replace with the path to your profile image
          alt="User Profile"
        />
      </div>
      <div className="flex-1 mr-2">
        <h3 className="text-sm px-1 text-gray-800" style={{fontFamily:"Montserrat"}}>{name}</h3>
        <p className="text-sm text-gray-500" style={{fontFamily:"Montserrat"}}>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
      </div>
      <MenuIcon onClick={toggleSidebar} className="cursor-pointer" style={{ color: '#5B6B79' }} />
    </div>
  );
};

export default UserProfile;
