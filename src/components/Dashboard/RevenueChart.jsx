import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const COLORS = {
  gold: '#C9A227',
  lightBg: '#F5F5F4',
};

const RevenueChart = () => {
  const data = [4000, 3000, 2000, 2800, 1900, 2400, 3500];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: COLORS.lightBg,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant='h6' fontWeight={600} mb={2}>
          Revenue Overview
        </Typography>

        <LineChart
          height={300}
          series={[
            {
              data: data,
              color: COLORS.gold,
              area: false,
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          ]}
          grid={{ vertical: false, horizontal: true }}
        />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
