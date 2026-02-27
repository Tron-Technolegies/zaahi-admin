import * as React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const COLORS = {
  gold: '#C9A227',
  black: '#1C1917',
  gray: '#A8A29E',
  darkGray: '#44403C',
  lightBg: '#F5F5F4',
};

const salesData = [
  { id: 0, value: 400, label: 'Watches', color: COLORS.black },
  { id: 1, value: 300, label: 'Accessories', color: COLORS.gold },
  { id: 2, value: 300, label: 'Fine Art', color: COLORS.gray },
  { id: 3, value: 200, label: 'Jewelry', color: COLORS.darkGray },
];

const SalesCategory = () => {
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
          Sales by Category
        </Typography>

        <Box display='flex' justifyContent='center'>
          <PieChart
            series={[
              {
                data: salesData,
                innerRadius: 60,
                outerRadius: 80,
                paddingAngle: 3,
                cornerRadius: 5,
              },
            ]}
            width={250}
            height={250}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>

        <Stack spacing={1} mt={2}>
          {salesData.map((item) => (
            <Box
              key={item.id}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box display='flex' alignItems='center' gap={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant='body2'>{item.label}</Typography>
              </Box>

              <Typography variant='body2' fontWeight={500}>
                {item.value} sales
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SalesCategory;
