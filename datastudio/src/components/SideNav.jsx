import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReportIcon from "@mui/icons-material/Report";
import UserProfile from "./UserProfile";
import datastudio from "../assets/datastudio.png";

const SideNav = () => {
  const [userInfo, setUserInfo] = useState({
    role: "engineer", // Initial role ('admin' or 'engineer')
  });
  const [isCollapsed, setIsCollapsed] = useState(false); // Initial sidebar state [true: collapsed, false: expanded
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col h-screen p-1 bg-gray-100 text-black border-r-2 border-gray-300 border-dotted ${isCollapsed ? "w-20" : "w-60"} transition-width duration-300`}>
      <div className="space-y-0">
        {!isCollapsed && (
          <>
            <UserProfile toggleSidebar={toggleSidebar} />
            <h2 style={{ marginTop: "1.8rem" }} className="text-xs font-semibold text-gray-800 text-left ml-4 mt-4 opacity-50 mx-2">
              NAVIGATION
            </h2>
          </>
        )}
        <div className="flex-1 mx-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {userInfo.role === "admin" && (
              <>
                <li className="rounded-sm">
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <HomeIcon
                      style={{
                        color: location.pathname === "/admin/dashboard" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Dashboard</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/admin/add-user"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <PersonAddIcon
                      style={{
                        color: location.pathname === "/admin/add-user" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Add User</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/admin/reports"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <ArticleIcon
                      style={{
                        color: location.pathname === "/admin/reports" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Reports</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/admin/requests"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <ReportIcon
                      style={{
                        color: location.pathname === "/admin/requests" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Requests</span>}
                  </NavLink>
                </li>
              </>
            )}

            {userInfo.role === "engineer" && (
              <>
                <li className="rounded-sm">
                  <NavLink
                    to="/create-report"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <ArticleIcon
                      style={{
                        color: location.pathname === "/create-report" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Create Report</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/report-history"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-red-100 mx-2 text-red-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 mx-2"
                    }
                  >
                    <ArticleIcon
                      style={{
                        color: location.pathname === "/report-history" ? "#930006" : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Report History</span>}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
