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
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Joi from '../../utils/validator';
import { Link } from 'react-router-dom';
import ThemeOne from '../../Theme/Theme1/theme1'; 
import ThemeTwo from '../../Theme/Theme2/theme2';
import { useSelector,useDispatch } from 'react-redux';
import {setCurrentTheme} from '../../Redux/Slices/authSlice';
import './style.css';

const resetSchema = {
  password: Joi.string().label('Password').required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).label('Confirm Password').required(),
};

const UpdatePassword = () => {
  const navigate = useNavigate();
  const {currentTheme} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleChange = useCallback((e, name) => {
    const value = e.target.value;

    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(value, resetSchema[name])
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }, [errors]);

  const handleResetPassword = async () => {
    const errors = Joi.validateToPlainErrors(formData, resetSchema);
    if (Object.keys(errors).length) {
      setErrors(errors);
      toast.error('Validation Errors');
    } else {
      const payload = {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      try {
        const response = await axios.post(`http://localhost:4000/api/reset-password?token=${token}`, payload);
        console.log('response::', response);
        toast.success('Password Reset Successfully');
        setFormData({
          password: '',
          confirmPassword: ''
        });
        navigate('/login');
      } catch (error) {
        console.log("error::", error);
        toast.error(error.response && error.response.data.msg);
      }
    }
  };

  const selectedTheme = currentTheme === 'ThemeOne' ? ThemeOne : ThemeTwo;

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
              Reset Password
            </Typography>
            <TextField
              error={Joi.getFirstPlainError(errors, 'password')}
              helperText={Joi.getFirstPlainError(errors, 'password')}
              size="small"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => { handleChange(e, 'password') }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: selectedTheme.palette.primary.main }}
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
            <TextField
              error={Joi.getFirstPlainError(errors, 'confirmPassword')}
              helperText={Joi.getFirstPlainError(errors, 'confirmPassword')}
              size="small"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => { handleChange(e, 'confirmPassword') }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: selectedTheme.palette.primary.main }}
                    >
                      {!showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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

            <Button onClick={handleResetPassword} variant="contained" sx={{
              backgroundColor: selectedTheme.palette.button.main,
              '&:hover': {
                backgroundColor: selectedTheme.palette.button.main,
              },
            }}>
              Update
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

export default UpdatePassword;
