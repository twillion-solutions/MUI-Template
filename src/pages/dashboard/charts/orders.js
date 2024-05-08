import React from "react";
import { Pie } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js";
import '../style.css'

Chart.register(CategoryScale);


const labels = ['Pending','Confirm','Cancel','Total'];

const data = {
labels: labels,
datasets: [
  {
  label: "All Orders User",
  data: [10000,2500,1000,(10000+2500+1000)],
  },
 ],
};

const OrdersDetails = () => {
return (
  <div>
    <Pie className="canvas-chart" height="300" style={{padding:'6px'}} data={data} />
   </div>
  );
};
export default OrdersDetails;