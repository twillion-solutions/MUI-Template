import React, { useEffect, useState } from "react";
import SideBar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileDetails,
  updateProfile,
} from "../../operations/authAPi/index";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
} from "@mui/material";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Joi from "../../utils/validator";
import { toast } from "react-hot-toast";
import ImageCropper from "./profileImage";
import ThemeOne from "../../Theme/Theme1/theme1";
import ThemeTwo from "../../Theme/Theme2/theme2";
import "./style.css";

const profileSchema = {
  firstName: Joi.string().label("First Name").required(),
  lastName: Joi.string().label("Last Name").required(),
  email: Joi.string().email().label("Email").required(),
  phone: Joi.number().label("Phone").required(),
  gender: Joi.string().label("Gender").required(),
};

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.profile);
  const currentTheme = useSelector((state) => state.auth.currentTheme); // assuming you have this in Redux state
  const [editMode, setEditMode] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile?.image || "");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageToCrop(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getProfileDetails(token));
  }, [editMode]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        gender: profile.gender || "",
      });
      setAvatarPreview(profile.profile || "");
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
    if (Object.keys(errors).length) {
      setErrors(errors);
      toast.error("Validation Errors");
    } else {
      const token = localStorage.getItem("token");
      dispatch(updateProfile(formData, croppedImage, token));
      setEditMode(false);
    }
  };

  const selectedTheme = currentTheme !== "ThemeOne" ? ThemeOne : ThemeTwo;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box className="main" component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Box
            className="profile_form"
            sx={{
              background: selectedTheme.palette.background.default,
            }}
          >
            <Paper
              component="form"
              elevation={3}
              testing123
              sx={{
                p: "2rem",
                width: "35rem",
                maxWidth: "95%",
                zIndex: "1",
                backgroundColor: selectedTheme.palette.background.paper,
              }}
            >
              <Box display="flex" alignItems="center" flexDirection="column">
                <Avatar
                  alt={`${profile?.firstName} ${profile?.lastName}`}
                  src={croppedImage ? croppedImage : profile?.profile}
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                {editMode && (
                  <React.Fragment>
                    <IconButton color="primary" component="label">
                      <PhotoCamera />
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={onUploadFile}
                      />
                    </IconButton>
                    <Box>
                      <ImageCropper
                        imageToCrop={imageToCrop}
                        onImageCropped={(croppedImage) =>
                          setCroppedImage(croppedImage)
                        }
                      />
                    </Box>
                  </React.Fragment>
                )}
                <Typography
                  align="center"
                  component="h1"
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: selectedTheme.palette.text.primary,
                  }}
                >
                  {`${profile?.firstName} ${profile?.lastName}`}
                </Typography>
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
                        onChange={(e) => handleChange(e, "firstName")}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&:hover fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                          },
                          "& .MuiFormLabel-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                          "& .MuiInputBase-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                        }}
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
                        onChange={(e) => handleChange(e, "lastName")}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&:hover fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                          },
                          "& .MuiFormLabel-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                          "& .MuiInputBase-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                        }}
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
                        onChange={(e) => handleChange(e, "email")}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&:hover fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                          },
                          "& .MuiFormLabel-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                          "& .MuiInputBase-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                        }}
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
                        onChange={(e) => handleChange(e, "phtesting123one")}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&:hover fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: selectedTheme.palette.primary.main,
                            },
                          },
                          "& .MuiFormLabel-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                          "& .MuiInputBase-root": {
                            color: selectedTheme.palette.text.primary,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RadioGroup
                        row
                        aria-labelledby="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => {
                          handleChange(e, "gender");
                        }}
                      >
                        <FormControlLabel
                          value="female"
                          control={
                            <Radio
                              sx={{
                                color: selectedTheme.palette.primary.main,
                                "&.Mui-checked": {
                                  color: selectedTheme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label="Female"
                          sx={{ color: selectedTheme.palette.text.primary }}
                        />
                        <FormControlLabel
                          value="male"
                          control={
                            <Radio
                              sx={{
                                color: selectedTheme.palette.primary.main,
                                "&.Mui-checked": {
                                  color: selectedTheme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label="Male"
                          sx={{ color: selectedTheme.palette.text.primary }}
                        />
                      </RadioGroup>
                      {errors.gender && (
                        <Typography variant="body2" color="error">
                          {errors.gender[0]}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleSave}
                        variant="contained"
                        sx={{
                          backgroundColor: selectedTheme.palette.button.main,
                          "&:hover": {
                            backgroundColor: selectedTheme.palette.primary.dark,
                          },
                        }}
                      >
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
                      <Button
                        onClick={() => setEditMode(true)}
                        variant="contained"
                        sx={{
                          backgroundColor: selectedTheme.palette.button.main,
                          "&:hover": {
                            backgroundColor: selectedTheme.palette.primary.dark,
                          },
                        }}
                      >
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
    </ThemeProvider>
  );
};

export default Profile;
