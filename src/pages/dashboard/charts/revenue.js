import React from "react";
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js";

Chart.register(CategoryScale);

const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Monthly Revenue",
      data: [10000, 18000, 50000, 100000, 20000, 15000, 120000],
    },
  ],
};
const LineChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
