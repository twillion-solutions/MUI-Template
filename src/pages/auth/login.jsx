import React, { useCallback, useState,useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  FormControlLabel,
  Switch
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import Joi from '../../utils/validator'
import {useDispatch} from 'react-redux'
import {setToken} from '../../Redux/Slices/authSlice'
import Cookies from 'js-cookie'

const loginSchema = {
  email: Joi.string().email().label('Email').required(),
  password: Joi.string().label('Password').required(),
}

const Login = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('rememberMe'))
    const [formData,setFormData] = useState({
        email:data && data.rememberMe ? data.email : '',
        password:''
    })
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors,setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = useCallback((e,name) => {

    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, loginSchema[name])
    });

    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  useEffect(() => {
    if(data && data.email === formData.email){
      setRememberMe(true);
    }
  },[])

  useEffect(() => {
    if(data && data.email === formData.email){
      rememberMe === true && localStorage.removeItem('rememberMe')
    }
  },[formData])

  const handleSign = async() => {
    const errors = Joi.validateToPlainErrors(formData, loginSchema);
    if(Object.keys(errors).length) {
      setErrors(errors)
      toast.error('Validation Errors');
    }else {
    axios.defaults.withCredentials = true;
    const response = await axios.post('http://localhost:4000/api/login', formData).then((res) => {
      dispatch(setToken(res.data.data));
      localStorage.setItem('token',JSON.stringify(res.data.data))
      rememberMe && localStorage.setItem('rememberMe',JSON.stringify({rememberMe ,email:formData.email}))
      setFormData({
        email:'',
        password:'',
      })
      const referBy = Cookies.get('refer');

      referBy  ? window.location.href = "http://accounts.local.com" : navigate('/dashboard')
      toast.success('User Login Successfully!')
      Cookies.set('token',JSON.stringify(res.data.data),{expires:2,domain:'.local.com'});
    }).catch((error) => {
      console.log('error::',error)
      toast.error(error.response && error.response.data.msg)
    });
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
            Sign in
          </Typography>
          <TextField
            error={Joi.getFirstPlainError(errors, 'email')}
            helperText={Joi.getFirstPlainError(errors, 'email')}
            size="small"
            value={formData.email}
            onChange={(e) => {handleChange(e,'email')}}
            name="email"
            label="Username"
            variant="outlined"
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'password')}
            helperText={Joi.getFirstPlainError(errors, 'password')}
            size="small"
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => {handleChange(e,'password')}}
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
          <FormControlLabel
            control={
              <Switch
                color="warning"
                checked={rememberMe}
                onChange={(event) => {console.log(event.target.checked);setRememberMe(event.target.checked)}}
              />
            }
            color="primary"
            label="Remember Me"
          />
          <Button onClick={handleSign} variant="contained"  sx={{
            backgroundColor: '#fc661a',
            '&:hover': {
              backgroundColor: '#fc661a',
            },}}>
            Sign In
          </Button>
          <Link
            to='https://accounts.local.com'
            align="right"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: "pointer"
            }}
          >
            Forgot password?
          </Link>
        </Stack>
      </Paper>
     
    </Box>
  );
};

export default Login;
