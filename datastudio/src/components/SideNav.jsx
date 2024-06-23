import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import datastudio from "../assets/datastudio2.png";
import {
  CreateNewFolderSharp,
  WorkHistorySharp,
  ArticleSharp,
  HomeSharp,
  PersonAdd,
  ReportOffSharp,
  DescriptionSharp,
  ExitToAppSharp,
  ChatBubble
} from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext"; // Adjust the path as necessary

const SideNav = () => {
  const { userInfo, logout } = useContext(AuthContext); // Fetching userInfo and logout function from AuthContext
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`flex flex-col h-screen p-1 text-white border-r-2 border-white border-dotted ${
        isCollapsed ? "w-20" : "w-60"
      } transition-width duration-300`}
      style={{
        fontFamily: "Montserrat",
        backgroundColor: "#1b232d",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="space-y-0">
      <div
          style={{ marginTop: "0%" }}
          onClick={toggleSidebar}
          className="flex items-center justify-center p-0 cursor-pointer m-2"
        >
          <img src={datastudio} alt="Logo" className="w-14 h-14" />
        </div>
        {!isCollapsed && (
          <>
            <UserProfile toggleSidebar={toggleSidebar} />
            <h2
              style={{ marginTop: "1.8rem" }}
              className="text-xs font-semibold text-white text-left ml-4 mt-4  mx-2"
            >
              NAVIGATION
            </h2>
          </>
        )}
        <div className="flex-1 mx-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {userInfo?.role === "admin" && (
              <>
                <li className="rounded-sm">
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2  text-blue-600"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <HomeSharp
                      style={{
                        color:
                          location.pathname === "/admin/dashboard"
                            ? "#4680ff"
                            : "#5B6B79",
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
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2  text-blue-600"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <PersonAdd
                      style={{
                        color:
                          location.pathname === "/admin/add-user"
                            ? "#4680ff"
                            : "#5B6B79",
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
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <ArticleSharp
                      style={{
                        color:
                          location.pathname === "/admin/reports"
                            ? "#4680ff"
                            : "#5B6B79",
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
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <ReportOffSharp
                      style={{
                        color:
                          location.pathname === "/admin/requests"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Requests</span>}
                  </NavLink>
                </li>
              </>
            )}

            {userInfo?.role === "engineer" && (
              <>
                <li className="rounded-sm">
                  <NavLink
                    to="/engineer/create-report"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <CreateNewFolderSharp
                      style={{
                        color:
                          location.pathname === "/engineer/create-report"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Create Report</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/engineer/report-history"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <WorkHistorySharp
                      style={{
                        color:
                          location.pathname === "/engineer/report-history"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Report History</span>}
                  </NavLink>
                </li>
              </>
            )}

            {userInfo?.role === "client" && (
              <>
                <li className="rounded-sm">
                  <NavLink
                    to="/client/create-request"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <CreateNewFolderSharp
                      style={{
                        color:
                          location.pathname === "/client/create-request"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Create Request</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/client/requests"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <WorkHistorySharp
                      style={{
                        color:
                          location.pathname === "/client/requests"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Requests</span>}
                  </NavLink>
                </li>
                <li className="rounded-sm">
                  <NavLink
                    to="/client/official-reports"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <DescriptionSharp
                      style={{
                        color:
                          location.pathname === "/client/official-reports"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Official Reports</span>}
                  </NavLink>
                </li>
              </>
            )}
            <li className="rounded-sm">
                  <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center p-2 space-x-3 rounded-md bg-[#2a4887] mx-2 text-blue-700"
                        : "flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2"
                    }
                  >
                    <ChatBubble
                      style={{
                        color:
                          location.pathname === "/chat"
                            ? "#4680ff"
                            : "#5B6B79",
                      }}
                      className="w-4 h-4"
                    />
                    {!isCollapsed && <span>Chat</span>}
                  </NavLink>
                </li>
          </ul>
        </div>
      </div>
      <div className="mt-auto mx-1 mb-2">
        <button
          onClick={logout}
          className="flex items-center p-2 space-x-3 rounded-md hover:bg-[#2a4887] mx-2 w-full"
        >
          <ExitToAppSharp
            style={{
              color: "#5B6B79",
            }}
            className="w-4 h-4"
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideNav;
