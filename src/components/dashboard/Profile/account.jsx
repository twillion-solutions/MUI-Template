import React from 'react'
import { Box,Typography } from '@mui/material'
import SideBar from '../sidebar'

const Account = () => {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
      <Typography variant='h4'>
            Account
        </Typography>
      </Box>
    </Box>
  )
}

export default Account