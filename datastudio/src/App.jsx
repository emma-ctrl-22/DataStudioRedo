import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Authentication/Login"; 
import { Dashboard, AddUser, AllReports, AllRequests } from "./Pages/Admin"; 
import { CreateReport ,ReportHistory} from "./Pages/Engineer";
import {DefaultLayout} from "./components";
import { CreateRequest } from "./Pages/Client";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
        <Route path="/engineer/create-report" element={
          <DefaultLayout>
            <CreateReport />
          </DefaultLayout>
        } />
        <Route path="/engineer/report-history" element={
          <DefaultLayout>
            <ReportHistory />
          </DefaultLayout>
        } />
      </Routes>
      <Route path="/client/create-request" element={
        <DefaultLayout>
          <CreateRequest />
        </DefaultLayout>
      } />
    </Router>
  );
}

export default App;
