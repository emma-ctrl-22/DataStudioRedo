import React, { useState } from 'react';
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ConfirmedRequests, PendingRequests } from './components';

const theme = createTheme({
  palette: {
    primary: {
      main: '#930006',
    },
  },
});

const StyledTabs = styled(Tabs)({
  background: '#3b82f6',
});

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: '#111827',
  },
}));

const tabsData = [
  { label: "Confirmed Requests", value: "confirmed-requests", component: ConfirmedRequests },
  { label: "Pending Requests", value: "pending-requests", component: PendingRequests },
];

const Requests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split('/')[2] || 'confirmed-requests';

  const [openTabs, setOpenTabs] = useState(tabsData);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <StyledTabs value={currentTab} aria-label="Requests tabs">
          {openTabs.map(tab => (
            <StyledTab
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
        </StyledTabs>
        <Routes>
          {openTabs.map(tab => (
            <Route key={tab.value} path={tab.value} element={<tab.component />} />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default Requests;
