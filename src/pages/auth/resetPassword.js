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
import Joi from '../../utils/validator'

const resetSchema = {
  password: Joi.string().label('password').required(),
  confirmPassword: Joi.string().label('confirmPassword').required(),
}

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [errors,setErrors] = useState({});
    const [formData,setFormData] = useState({
        password:'',
        confirmPassword:''
    })
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tokens = query.get('token');
  console.log("token::",tokens)

  const handleChange = useCallback((e,name) => {

    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, resetSchema[name])
    });

    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  const hnadleResetPassword = async() => {
    const errors = Joi.validateToPlainErrors(formData, resetSchema);
    if(Object.keys(errors).length) {
      setErrors(errors)
      toast.error('Validation Errors');
    }else {

    const payload = {
      newPassword:formData.password,
      confirmPassword:formData.confirmPassword,
    }

    const response = await axios.post(`http://localhost:4000/api/reset-password?token=${tokens}`,payload).then((res) => {
      console.log('response::',res)
      toast.success('Password Reset Successfully')
      setFormData({
        password:'',
        confirmPassword:''
      });
      navigate('/login  ')
    }).catch((error) => {
      console.log("error::",error)
      toast.error(error.response && error.response.data.msg)
    })
  }
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
            Reset Password
          </Typography>
          <TextField
            error={Joi.getFirstPlainError(errors, 'password')}
            helperText={Joi.getFirstPlainError(errors, 'password')}
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            type={showPasswords ? "text" : "password"}
            value={formData.password}
            onChange={(e) => {handleChange(e,'password')}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswords(!showPasswords)}
                    edge="end"
                  >
                    {showPasswords ? <VisibilityIcon /> : <VisibilityOffIcon />}
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

          <Button onClick={hnadleResetPassword} variant="contained" sx={{
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
  );
};

export default UpdatePassword;
