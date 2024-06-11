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
import Joi from '../../utils/validator'

const changePasswordSchema = {
  oldPassword: Joi.string().label('oldPassword').required(),
  newPassword: Joi.string().label('newPassword').required(),
  confirmPassword: Joi.string().label('confirmPassword').required(),
}


const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    })
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [errors,setErrors] = useState({});

  const handleChange = useCallback((e,name) => {
    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, changePasswordSchema[name])
    });

    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  const handleSign = async() => {
    const errors = Joi.validateToPlainErrors(formData, changePasswordSchema);
    if(Object.keys(errors).length) {
      setErrors(errors)
      toast.error('Validation Errors');
    }else {
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
}

  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
    <Box
      sx={{
        minHeight: "80vh",
        background:'#e8e8e8',
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          p: "2rem",
          width: "35rem",
          maxWidth: "95%",
          zIndex: "1"
        }}
      >
        <Stack spacing={2}>
          <Typography align="center" component="h1" variant="h5" sx={{ mb: 1,fontWeight:'bold',color:'#4e4e4e' }}>
            Change Password
          </Typography>
          <TextField
            error={Joi.getFirstPlainError(errors, 'oldPassword')}
            helperText={Joi.getFirstPlainError(errors, 'oldPassword')}
            size="small"
            name="oldPassword"
            label="Old Password"
            variant="outlined"
            type={showOldPassword ? "text" : "password"}
            value={formData.oldPassword}
            onChange={(e) => {handleChange(e,'oldPassword')}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'newPassword')}
            helperText={Joi.getFirstPlainError(errors, 'newPassword')}
            size="small"
            name="newPassword"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            variant="outlined"
            value={formData.newPassword}
            onChange={(e) => {handleChange(e,'newPassword')}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'confirmPassword')}
            helperText={Joi.getFirstPlainError(errors, 'confirmPassword')}
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
            to='/dashboard'
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
