import React, { useState,useEffect } from "react";
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
  Switch,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Joi from '../../utils/validator';
import { useDispatch,useSelector } from 'react-redux';
import { setToken } from '../../Redux/Slices/authSlice';
import Cookies from 'js-cookie';
import ThemeOne from '../../Theme/Theme1/theme1'; 
import ThemeTwo from '../../Theme/Theme2/theme2'; 
import {setCurrentTheme} from '../../Redux/Slices/authSlice';
import './style.css';

const loginSchema = {
  email: Joi.string().email().label('Email').required(),
  password: Joi.string().label('Password').required(),
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentTheme} = useSelector((state) => state.auth)
  const data = JSON.parse(localStorage.getItem('rememberMe'))
  const [formData,setFormData] = useState({
      email:data && data.rememberMe ? data.email : '',
      password:''
  })
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e, name) => {
    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, loginSchema[name])
    });

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  };

  useEffect(() => {
    if(data && data.email == formData.email){
      setRememberMe(true);
    }
  },[])

  useEffect(() => {
    if(data && data.email == formData.email){
      rememberMe === true && localStorage.removeItem('rememberMe')
    }
  },[formData])

  const handleSign = async () => {
    const errors = Joi.validateToPlainErrors(formData, loginSchema);
    if (Object.keys(errors).length) {
      setErrors(errors);
      toast.error('Validation Errors');
    } else {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:4000/api/login', formData).then((res) => {
        dispatch(setToken(res.data.data));
        localStorage.setItem('token', JSON.stringify(res.data.data));
        rememberMe ? localStorage.setItem('rememberMe', JSON.stringify({ rememberMe, email: formData.email })):localStorage.removeItem('rememberMe');
        setFormData({
          email: '',
          password: '',
        });
        const referBy = Cookies.get('refer');

        referBy ? window.location.href = "http://accounts.local.com" : navigate('/dashboard');
        toast.success('User Login Successfully!');
        Cookies.set('token', JSON.stringify(res.data.data), { expires: 2, domain: '.local.com' });
      }).catch((error) => {
        console.log('error::', error);
        toast.error(error.response && error.response.data.msg);
      });
    }
  };

  const selectedTheme = currentTheme !== 'ThemeOne' ? ThemeOne : ThemeTwo;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box className='login_page' sx={{backgroundColor: selectedTheme.palette.background.default}}>
        <Paper
          component="form"
          className="auth_form"
          sx={{
            backgroundColor: selectedTheme.palette.background.paper,
          }}
        >
          <Stack spacing={2}>
            <Typography align="center" component="h1" variant="h5" sx={{ mb: 1, color: selectedTheme.palette.text.primary }}>
              Sign in
            </Typography>
            <TextField
              error={!!Joi.getFirstPlainError(errors, 'email')}
              helperText={Joi.getFirstPlainError(errors, 'email')}
              size="small"
              value={formData.email}
              onChange={(e) => { handleChange(e, 'email') }}
              name="email"
              label="Username"
              variant="outlined"
              autoComplete='off'
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                },
                '& .MuiFormLabel-root': {
                  color: selectedTheme.palette.text.primary,
                },
                '& .MuiInputBase-root': {
                  color: selectedTheme.palette.text.primary,
                },
              }}
            />
            <TextField
              error={!!Joi.getFirstPlainError(errors, 'password')}
              helperText={Joi.getFirstPlainError(errors, 'password')}
              size="small"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => { handleChange(e, 'password') }}
              autoComplete='off'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: selectedTheme.palette.primary.main }} // Icon color based on theme
                    >
                      {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: selectedTheme.palette.primary.main,
                  },
                },
                '& .MuiFormLabel-root': {
                  color: selectedTheme.palette.text.primary,
                },
                '& .MuiInputBase-root': {
                  color: selectedTheme.palette.text.primary,
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
              }
              color="primary"
              label="Remember Me"
            />
            <Button onClick={handleSign} variant="contained" sx={{
              backgroundColor: selectedTheme.palette.button.main,
              '&:hover': {
                backgroundColor: selectedTheme.palette.primary.dark,
              },
            }}>
              Sign In
            </Button>
            <Link
              to='/forgot-password'
              align="right"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: "pointer",
                color: selectedTheme.palette.primary.main,
              }}
            >
              Forgot password?
            </Link>
          </Stack>
        </Paper>
        
      </Box>
    </ThemeProvider>
  );
};

export default Login;
