import {useState} from 'react';
import SideNav from './SideNav';
import { NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const MobileDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden absolute ml-80 mt-0">
      <div className="flex items-center justify-between p-4 mr-64">
        <div onClick={toggleMenu} className="cursor-pointer">
          {isOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-900 text-black border-r-2 border-gray-300 border-dotted">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? 'block p-2 rounded-md bg-red-100 text-red-700'
                    : 'block p-2 rounded-md hover:bg-red-100'
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-user"
                className={({ isActive }) =>
                  isActive
                    ? 'block p-2 rounded-md bg-red-100 text-red-700'
                    : 'block p-2 rounded-md hover:bg-red-100'
                }
              >
                Add User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                  isActive
                    ? 'block p-2 rounded-md bg-red-100 text-red-700'
                    : 'block p-2 rounded-md hover:bg-red-100'
                }
              >
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/requests"
                className={({ isActive }) =>
                  isActive
                    ? 'block p-2 rounded-md bg-red-100 text-red-700'
                    : 'block p-2 rounded-md hover:bg-red-100'
                }
              >
                Requests
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};


const DefaultLayout = ({ children }) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  return (
    <div className="flex w-full h-full bg-gray-900">
      {isMobile ? <MobileDropdownMenu /> : <SideNav />}
      <main className=" flex-1 h-full  overflow-y-auto bg-gray-100 custom-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
