import React from 'react'
import { Box,Typography } from '@mui/material'
import SideBar from '../sidebar'

const Profile = () => {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
      <Typography variant='h4'>
            User Profile
        </Typography>
      </Box>
    </Box>
  )
}

export default Profile