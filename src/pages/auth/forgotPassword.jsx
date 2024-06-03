import React, { useCallback, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,

} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:'',
    })

  const handleChange = useCallback((e,name) => {
    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  

  const handleForgotPassword = async () => {
    const token = localStorage.getItem('token')

    const payload = {
      email:formData.email,
      token:JSON.parse(token)
    }

    const response = await axios.post('http://localhost:4000/api/forgot-password',payload).then((res) => {
      console.log("response::",res)
      toast.success('Forgot Password Link Sent Successfully!');
      setFormData({email:''})
      navigate('/login');
    }).catch((error) => {
      console.log('error::',error)
      toast.error(error.response && error.response.data.msg)
    })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('https://wallpapercave.com/wp/wp3525740.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 0",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2rem",
          width: "24rem",
          maxWidth: "95%",
          zIndex: "1"
        }}
      >
        <Stack spacing={2}>
          <img
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAHXPluq6GtTRPDIHRv5kJPy86uFjp5sO7hg&usqp=CAU'}
            alt="logo"
            width="100"
            style={{ alignSelf: "center", padding: 0 }}
          />
          <Typography align="center" component="h1" variant="h5" sx={{ mb: 1 }}>
            Forgot Password
          </Typography>
          <TextField
            size="small"
            value={formData.email}
            onChange={(e) => {handleChange(e,'email')}}
            name="email"
            label="Email"
            variant="outlined"
            required
          />
          <Button onClick={handleForgotPassword} variant="contained" sx={{
            backgroundColor: '#fc661a',
            '&:hover': {
              backgroundColor: '#fc661a',
            },}} >
            Send
          </Button>
          <Link
            to='/login'
            align="right"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer"
            }}
          >
            Back
          </Link>
        </Stack>
      </Paper>
     
    </Box>
  );
};

export default ForgotPassword;
