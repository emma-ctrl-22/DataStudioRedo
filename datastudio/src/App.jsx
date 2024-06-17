import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import { Dashboard, AddUser, AllReports, AllRequests } from "./Pages/Admin";
import { CreateReport, ReportHistory } from "./Pages/Engineer";
import { DefaultLayout } from "./components";
import { CreateRequest, Requests, OfficialReports } from "./Pages/Client";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { userToken, userInfo, isLogged, isLoading } = useContext(AuthContext);

  useEffect(() => {
    isLogged();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Customize this loading screen as needed
  }

  // Function to clear local storage and reload the app
  const clearLocalStorage = () => {
    console.log("Clearing local storage...");
    localStorage.clear();
    window.location.reload();
  };

  // Check if userInfo is null and handle the error by clearing local storage
  if (userToken && !userInfo) {
    clearLocalStorage();
    return <div>Loading...</div>; // Optionally show a loading state while clearing storage
  }

  return (
    <Router>
      <Routes>
        {userToken ? (
          userInfo?.role === "client" ? (
            <>
              <Route
                path="/client/create-request"
                element={
                  <DefaultLayout>
                    <CreateRequest />
                  </DefaultLayout>
                }
              />
              <Route
                path="/client/requests/*"
                element={
                  <DefaultLayout>
                    <Requests />
                  </DefaultLayout>
                }
              />
              <Route
                path="/client/official-reports"
                element={
                  <DefaultLayout>
                    <OfficialReports />
                  </DefaultLayout>
                }
              />
              <Route path="/" element={<Navigate replace to="/client/create-request" />} />
              <Route path="*" element={<Navigate replace to="/client/create-request" />} />
            </>
          ) : userInfo?.role === "engineer" ? (
            <>
              <Route
                path="/engineer/create-report"
                element={
                  <DefaultLayout>
                    <CreateReport />
                  </DefaultLayout>
                }
              />
              <Route
                path="/engineer/report-history"
                element={
                  <DefaultLayout>
                    <ReportHistory />
                  </DefaultLayout>
                }
              />
              <Route path="/" element={<Navigate replace to="/engineer/report-history" />} />
              <Route path="*" element={<Navigate replace to="/engineer/report-history" />} />
            </>
          ) : userInfo?.role === "admin" ? (
            <>
              <Route
                path="/admin/dashboard"
                element={
                  <DefaultLayout>
                    <Dashboard />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/add-user"
                element={
                  <DefaultLayout>
                    <AddUser />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <DefaultLayout>
                    <AllReports />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/requests"
                element={
                  <DefaultLayout>
                    <AllRequests />
                  </DefaultLayout>
                }
              />
              <Route path="/" element={<Navigate replace to="/admin/dashboard" />} />
              <Route path="*" element={<Navigate replace to="/admin/dashboard" />} />
            </>
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
