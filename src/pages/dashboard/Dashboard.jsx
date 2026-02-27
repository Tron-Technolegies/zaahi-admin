import React from 'react';
import { Box, Container } from '@mui/material';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import RevenueChart from '../../components/Dashboard/RevenueChart';
import SalesCategory from '../../components/Dashboard/SalesCategory';

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E7E5E4',
        py: 4,
      }}
    >
      <Container maxWidth='xl'>
        <Box mb={4}>
          <DashboardStats />
        </Box>

        <Box
          display='grid'
          gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr' }}
          gap={3}
        >
          <RevenueChart />
          <SalesCategory />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
