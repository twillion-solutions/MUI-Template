

import React from "react";
import {Box} from '@mui/material'
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js";

Chart.register(CategoryScale);

const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Registered Fooder",
        data: [0, 1000, 55, 2225, 2089, 300, 4544],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9966",
        ],
      },
    ],
  };
  return (
    <Box>
      <Bar style={{width:'100%',height:'100%'}} data={data} />
    </Box>
  );
};
export default BarChart;
