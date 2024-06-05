import React, { useEffect, useState } from "react";
import SideBar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails, updateProfile } from "../../operations/authAPi/index";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Box, Typography, Avatar, Grid, Paper, Button, TextField, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Joi from '../../utils/validator';
import { toast } from 'react-hot-toast';
import "./style.css";

const profileSchema = {
  firstName: Joi.string().label('First Name').required(),
  lastName: Joi.string().label('Last Name').required(),
  email: Joi.string().email().label('Email').required(),
  phone: Joi.number().label('Phone').required(),
  gender: Joi.string().label('Gender').required(),
};

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.profile);
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.image || '');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getProfileDetails(token));
  }, [editMode]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        gender: profile.gender || '',
      });
      setAvatarPreview(profile.profile || '');
    }
  }, [profile]);

  const handleChange = (e, name) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: Joi.validateToPlainErrors(value, profileSchema[name]),
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        image: file,
      });
      setAvatarPreview(imageUrl);
    }
  };

  const handleSave = () => {
    const errors = Joi.validateToPlainErrors(formData, profileSchema);
    if(Object.keys(errors).length) {
      setErrors(errors)
      toast.error('Validation Errors');
    }else {
    const token = localStorage.getItem("token");
    dispatch(updateProfile(formData,avatarPreview,token))
    setEditMode(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Box
          sx={{
            minHeight: "80vh",
            background: "#e8e8e8",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Paper
            component="form"
            elevation={3}
            sx={{
              p: "2rem",
              width: "35rem",
              maxWidth: "95%",
              zIndex: "1",
            }}
          >
            <Box display="flex" alignItems="center" flexDirection="column">
              <Avatar
                alt={`${profile?.firstName} ${profile?.lastName}`}
                src={avatarPreview ? avatarPreview : profile?.profile}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
              />
              {editMode && (
                <IconButton color="primary" component="label">
                  <PhotoCamera />
                  <input type="file" hidden onChange={handleAvatarChange} />
                </IconButton>
              )}
              <Typography align="center" component="h1" variant="h5" sx={{ mb: 1,fontWeight:'bold',color:'#4e4e4e' }}>
              {`${profile?.firstName} ${profile?.lastName}`}</Typography>
              
            </Box>
            <Grid container spacing={2} style={{ marginTop: "2rem" }}>
              {editMode ? (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      size="small"
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange(e, 'firstName')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      size="small"
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange(e, 'lastName')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={!!errors.email}
                      helperText={errors.email}
                      size="small"
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange(e, 'email')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={!!errors.phone}
                      helperText={errors.phone}
                      size="small"
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, 'phone')}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => handleChange(e, 'gender')}
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
                    {errors.gender && (
                      <Typography variant="body2" color="error">
                        {errors.gender[0]}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                  <Button onClick={handleSave} variant="contained" sx={{
                    backgroundColor: '#fc661a',
                    '&:hover': {
                      backgroundColor: '#fc661a',
                  },}}>
                    Update
                  </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>First Name:</strong> {profile?.firstName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Last Name:</strong> {profile?.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profile?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Phone:</strong> {profile?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                      <strong>Gender:</strong> {profile?.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button onClick={() => setEditMode(true)} variant="contained" sx={{
                      backgroundColor: '#fc661a',
                      '&:hover': {
                        backgroundColor: '#fc661a',
                    },}}>
                      Edit
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
