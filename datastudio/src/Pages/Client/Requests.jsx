import React, { useState } from 'react';
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { Tabs, Tab, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ConfirmedRequests,PendingRequests } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: '#930006', // red color for the indicator
    },
  },
});

const tabsData = [
  { label: "Confirmed Requests", value: "confirmed-requests", component: ConfirmedRequests },
  { label: "Pending Requests", value: "pending-requests", component: PendingRequests },
];

const Requests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split('/')[2] || 'confirmed-requests';

  const [openTabs, setOpenTabs] = useState(tabsData);

  const handleTabClose = (tabValue) => {
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.value !== tabValue);
      if (currentTab === tabValue && newTabs.length > 0) {
        // Navigate to the first tab if the current tab is closed
        navigate(`/client/requests/${newTabs[0].value}`);
      } else if (newTabs.length === 0) {
        // Navigate to a fallback route if no tabs are open
        navigate('/dashboard');
      }
      return newTabs;
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Tabs value={currentTab} aria-label="Requests tabs" style={{background:"#F3F5F7"}}>
          {openTabs.map(tab => (
            <Tab
              key={tab.value}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {tab.label}
                  
                </div>
              }
              value={tab.value}
              component={Link}
              to={`/client/requests/${tab.value}`}
            />
          ))}
        </Tabs>
        <Routes>
          {openTabs.map(tab => (
            <Route key={tab.value} path={tab.value} element={<tab.component />} />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default Requests