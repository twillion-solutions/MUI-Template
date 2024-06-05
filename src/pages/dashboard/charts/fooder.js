import React,{useEffect} from 'react';
import BarChart from './barchart';
import { Grid, Paper,Box } from '@mui/material';
import PieChart from './piechart';
import LineChart from './revenue';
import Users from '../DataGrid/users';
import SideBar from '../../sidebar';
import {useDispatch} from 'react-redux';
import { getProfileDetails } from "../../../operations/authAPi/index";

const FooderData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getProfileDetails(token));
  }, []);

  return (
    <Box sx={{display:'flex'}}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"70px"}}>
      <Grid  container spacing={2}>
        <Grid xs={4} item>
          <Paper variant='outlined'>
            <BarChart/>
          </Paper>
        </Grid>
        <Grid xs={4} item>
          <Paper variant='outlined'>
            <PieChart/>
          </Paper>
        </Grid>
        <Grid xs={4} item>
          <Paper variant='outlined'>
            <LineChart/>
          </Paper>
        </Grid>
        <Grid xs={12} item  sx={{marginTop:'30px'}} >
          <Paper>
            <Users/>
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default FooderData;
