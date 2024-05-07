import React from 'react';
import BarChart from './barchart';
import { Grid, Paper,Box } from '@mui/material';
import PieChart from './piechart';
import LineChart from './revenue';
import Orders from './orders';
import Users from '../DataGrid/users';
import SideBar from '../../sidebar';

const FooderData = () => {

  return (
    <Box sx={{display:'flex'}}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"70px"}}>
      <Grid item container spacing={2}>
        <Grid xs={4} md={4} sx={{display:'flex'}}>
          <Paper elevation={8}>
            <BarChart/>
          </Paper>
        </Grid>
        <Grid xs={4} md={4} sx={{display:'flex'}}>
          <Paper elevation={3}>
            <PieChart/>
          </Paper>
        </Grid>
        <Grid xs={4} md={4} sx={{display:'flex'}}>
          <Paper elevation={3}>
            <LineChart/>
          </Paper>
        </Grid>
        <Grid xs={4} md={4} sx={{display:'flex',marginTop:'30px'}}>
          <Paper elevation={3}>
            <Orders/>
          </Paper>
        </Grid>
        <Grid  sx={{marginTop:'30px'}} xs={4} md='8' >
          <Users/>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default FooderData;
