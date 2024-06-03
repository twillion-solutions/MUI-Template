import React, { useCallback, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import SideBar from '../sidebar'


const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((e,name) => {
    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  const handleSign = async() => {
    const token = localStorage.getItem('token')

    const payload = {
      oldPassword:formData.oldPassword,
        newPassword:formData.newPassword,
        confirmPassword:formData.confirmPassword,
        token:JSON.parse(token)
    }

    const response = await axios.post(`http://localhost:4000/api/change-password`,payload).then((res) => {
      toast.success('Password Change Successfully')
      setFormData({
        newPassword:'',
        oldPassword:'',
        confirmPassword:''
      });
      navigate('/dashboard')
    }).catch((error) => {
      console.log("error::",error)
      toast.error(error.response && error.response.data.msg)
    })
  }

  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
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
            Change Password
          </Typography>
          <TextField
            size="small"
            name="oldPassword"
            label="Old Password"
            variant="outlined"

            value={formData.oldPassword}
            onChange={(e) => {handleChange(e,'oldPassword')}}
            required
          />
          <TextField
            size="small"
            name="newPassword"
            label="New Password"
            variant="outlined"
            value={formData.newPassword}
            onChange={(e) => {handleChange(e,'newPassword')}}
            required
          />
          <TextField
            size="small"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => {handleChange(e,'confirmPassword')}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />

          <Button onClick={handleSign} variant="contained" sx={{
            backgroundColor: '#fc661a',
            '&:hover': {
              backgroundColor: '#fc661a',
            },}}>
            Update
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
    </Box>
    </Box>
  );
};

export default ChangePassword;
