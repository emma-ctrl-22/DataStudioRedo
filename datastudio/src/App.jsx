import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Authentication/Login"; // Ensure this path is correct
import { Dashboard, AddUser, AllReports, AllRequests } from "./Pages/Admin"; // Ensure this path is correct
import DefaultLayout from "./components/DefaultLayout";

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
      </Routes>
    </Router>
  );
}

export default App;
