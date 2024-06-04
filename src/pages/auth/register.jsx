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
  FormControlLabel,
  Switch
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import Joi from '../../utils/validator'

const registerSchema = {
  firstName: Joi.string().label('FirstName').required(),
  lastName: Joi.string().label('Last Name').required(),
  email: Joi.string().email().label('Email').required(),
  phone: Joi.number().label('Phone').required(),
  password: Joi.string().label('Password').required(),
  gender: Joi.string().label('gender').required(),
}

const Register = () => {
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:'',
        gender:'male',
    })
    const [showPassword, setShowPassword] = useState(false);
    const [file,setFile] = useState(null);
    const [errors,setErrors] = useState({});

    const handleFileChnage = (e) => {
      setFile(e.target.files[0])
    }

  const handleChange = useCallback((e,name) => {

    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(e.target.value, registerSchema[name])
    });

    setFormData((prev) =>({
        ...prev,
        [name] : e.target.value
    }))
  },[])

  const handleRegister = async() => {
    const errors = Joi.validateToPlainErrors(formData, registerSchema);
    if(Object.keys(errors).length) {
      setErrors(errors)
      toast.error('Validation Errors');
    }else {
    const data = new FormData();
    data.append('firstName',formData.firstName)
    data.append('lastName',formData.lastName)
    data.append('email',formData.email)
    data.append('password',formData.password)
    data.append('gender',formData.gender)
    data.append('phone',formData.phone)
    data.append('file',file)
    
    const response = await axios.post('http://localhost:4000/api/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      
    }).then((res) => {
      console.log("response::",res);
      setFormData({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:'',
        gender:'male',
      })
      setFile(null);
      navigate('/login')
      toast.success('User Register Successfully!')
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
            Sign UP
          </Typography>
          <TextField
            error={Joi.getFirstPlainError(errors, 'firstName')}
            helperText={Joi.getFirstPlainError(errors, 'firstName')}
            size="small"
            value={formData.firstName}
            onChange={(e) => {handleChange(e,'firstName')}}
            name="firstName"
            label="First Name"
            variant="outlined"
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'lastName')}
            helperText={Joi.getFirstPlainError(errors, 'lastName')}
            size="small"
            value={formData.lastName}
            onChange={(e) => {handleChange(e,'lastName')}}
            name="lastName"
            label="Last Name"
            variant="outlined"
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'email')}
            helperText={Joi.getFirstPlainError(errors, 'email')}
            size="small"
            value={formData.email}
            onChange={(e) => {handleChange(e,'email')}}
            name="email"
            label="Email"
            variant="outlined"
            required
          />
          <TextField
            error={Joi.getFirstPlainError(errors, 'phone')}
            helperText={Joi.getFirstPlainError(errors, 'phone')}
            size="small"
            value={formData.phone}
            onChange={(e) => {handleChange(e,'phone')}}
            name="phone"
            label="Phone"
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
          <input type='file' onChange={(e) => handleFileChnage(e)} name='file'/>
          <FormLabel id="gender" sx={{textAlign:"left"}}>Gender</FormLabel>
          <RadioGroup
          row
          aria-labelledby="gender"
          name="gender"
          value={formData.gender}
          onChange={(e) => {handleChange(e,'gender')}}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Male"
          />
        </RadioGroup>
        {errors["gender"] && (
          <Typography variant="body2" color="error">
            {errors["gender"][0]}
          </Typography>
        )}
  
          <Button onClick={handleRegister} variant="contained" sx={{
            backgroundColor: '#fc661a',
            '&:hover': {
              backgroundColor: '#fc661a',
            },}}>
            Sign UP
          </Button>
        </Stack>
      </Paper>
     
    </Box>
  );
}

export default Register;