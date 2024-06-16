import { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import { Dashboard, AddUser, AllReports, AllRequests } from "./Pages/Admin";
import { CreateReport, ReportHistory } from "./Pages/Engineer";
import { DefaultLayout } from "./components";
import { CreateRequest, Requests, OfficialReports } from "./Pages/Client";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { userToken, UserInfo, isLogged } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        
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

        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
