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
  Checkbox,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Joi from '../../utils/validator';
import { Link } from 'react-router-dom';
import ThemeOne from '../../Theme/Theme1/theme1'; 
import ThemeTwo from '../../Theme/Theme2/theme2'; 
import { useSelector,useDispatch } from 'react-redux';
import {setCurrentTheme} from '../../Redux/Slices/authSlice'
import './style.css'

const registerSchema = {
  firstName: Joi.string().label('FirstName').required(),
  lastName: Joi.string().label('Last Name').required(),
  email: Joi.string().email().label('Email').required(),
  phone: Joi.number().label('Phone').required(),
  password: Joi.string().label('Password').required(),
  gender: Joi.string().label('Gender').required(),
  agreeToTerms: Joi.boolean().invalid(false).label('Agree to terms').required(),
};

const Register = () => {
  const navigate = useNavigate();
  const {currentTheme} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    gender: 'male',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e, name) => {
    const value = name === 'agreeToTerms' ? e.target.checked : e.target.value;

    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(value, registerSchema[name])
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }, [errors]);

  const handleRegister = async () => {
    const errors = Joi.validateToPlainErrors(formData, registerSchema);
    if (Object.keys(errors).length) {
      setErrors(errors);
      toast.error('Validation Errors');
    } else {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
      };
      await axios.post('http://localhost:4000/api/register', payload).then((res) => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          gender: 'male',
          agreeToTerms: false,
        });
        navigate('/login');
        toast.success('User Registered Successfully!');
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
              Sign Up
            </Typography>
            <TextField
              error={Joi.getFirstPlainError(errors, 'firstName')}
              helperText={Joi.getFirstPlainError(errors, 'firstName')}
              size="small"
              value={formData.firstName}
              onChange={(e) => { handleChange(e, 'firstName') }}
              name="firstName"
              label="First Name"
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
            <TextField
              error={Joi.getFirstPlainError(errors, 'lastName')}
              helperText={Joi.getFirstPlainError(errors, 'lastName')}
              size="small"
              value={formData.lastName}
              onChange={(e) => { handleChange(e, 'lastName') }}
              name="lastName"
              label="Last Name"
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
            <TextField
              error={Joi.getFirstPlainError(errors, 'phone')}
              helperText={Joi.getFirstPlainError(errors, 'phone')}
              size="small"
              value={formData.phone}
              onChange={(e) => { handleChange(e, 'phone') }}
              name="phone"
              label="Phone"
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
            <FormLabel id="gender" sx={{ textAlign: "left", fontWeight: 'bold', color: selectedTheme.palette.text.primary }}>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => { handleChange(e, 'gender') }}
            >
              <FormControlLabel
                value="female"
                control={<Radio sx={{ color: selectedTheme.palette.primary.main, '&.Mui-checked': { color: selectedTheme.palette.primary.main } }} />}
                label="Female"
                sx={{ color: selectedTheme.palette.text.primary }}
              />
              <FormControlLabel
                value="male"
                control={<Radio sx={{ color: selectedTheme.palette.primary.main, '&.Mui-checked': { color: selectedTheme.palette.primary.main } }} />}
                label="Male"
                sx={{ color: selectedTheme.palette.text.primary }}
              />
            </RadioGroup>
            {errors["gender"] && (
              <Typography variant="body2" color="error">
                {errors["gender"][0]}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleChange(e, 'agreeToTerms')}
                  sx={{
                    color: selectedTheme.palette.primary.main,
                    '&.Mui-checked': {
                      color: selectedTheme.palette.primary.main,
                    },
                  }}
                />
              }
              label="I agree to the terms and conditions"
              sx={{ color: selectedTheme.palette.text.primary }}
            />
            {errors["agreeToTerms"] && (
              <Typography variant="body2" color="error">
                {errors["agreeToTerms"][0]}
              </Typography>
            )}
            <Button onClick={handleRegister} variant="contained" sx={{
              backgroundColor: selectedTheme.palette.button.main,
              '&:hover': {
                backgroundColor: selectedTheme.palette.button.main,
              },
            }}>
              Sign Up
            </Button>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Typography sx={{ color: selectedTheme.palette.text.primary }}>Already have an account?</Typography>
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
                Login
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Register;
