import React, { useCallback, useState,useEffect } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Joi from '../../utils/validator';
import ThemeOne from '../../Theme/Theme1/theme1';
import ThemeTwo from '../../Theme/Theme2/theme2'; 
import { useSelector,useDispatch } from 'react-redux';
import {setCurrentTheme} from '../../Redux/Slices/authSlice';
import './style.css';

const forgotSchema = {
  email: Joi.string().email().label('Email').required(),
};

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {currentTheme} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = useCallback((e, name) => {
    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, forgotSchema[name])
    });

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value
    }));
  }, [errors]);

  const handleForgotPassword = async () => {
    const errors = Joi.validateToPlainErrors(formData, forgotSchema);
    if (Object.keys(errors).length) {
      setErrors(errors);
      toast.error('Validation Errors');
    } else {
      const token = localStorage.getItem('token');

      const payload = {
        email: formData.email,
        token: JSON.parse(token)
      };

      await axios.post('http://localhost:4000/api/forgot-password', payload).then((res) => {
        console.log("response::", res);
        toast.success('Forgot Password Link Sent Successfully!');
        setFormData({ email: '' });
        navigate('/login');
      }).catch((error) => {
        console.log('error::', error);
        toast.error(error.response && error.response.data.msg);
      });
    }
  };

  const selectedTheme = currentTheme !== 'ThemeOne' ? ThemeOne : ThemeTwo;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box className='login_page' sx={{ backgroundColor: selectedTheme.palette.background.default }}>
        <Paper
          component="form"
          className="auth_form"
          sx={{
            backgroundColor: selectedTheme.palette.background.paper,
          }}
        >
          <Stack spacing={2}>
            <Typography align="center" component="h1" variant="h5" sx={{ mb: 1, color: selectedTheme.palette.text.primary }}>
              Forgot Password
            </Typography>
            <TextField
              error={Joi.getFirstPlainError(errors, 'email')}
              helperText={Joi.getFirstPlainError(errors, 'email')}
              size="small"
              value={formData.email}
              onChange={(e) => { handleChange(e, 'email') }}
              name="email"
              label="Email"
              variant="outlined"
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
            <Button onClick={handleForgotPassword} variant="contained" sx={{
              backgroundColor: selectedTheme.palette.button.main,
              '&:hover': {
                backgroundColor: selectedTheme.palette.button.main,
              },
            }}>
              Send
            </Button>
            <Link
              to='/login'
              align="right"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: "pointer",
                color: selectedTheme.palette.primary.main,
              }}
            >
              Back
            </Link>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
