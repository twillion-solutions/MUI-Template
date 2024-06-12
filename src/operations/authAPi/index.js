import { toast } from "react-hot-toast";
import {AUTH_API,PROFILE_APIS} from '../api';
import {apiConnector} from '../apiConnector';
import {setLoading,setToken} from '../../Redux/Slices/authSlice';
import { setProfile } from '../../Redux/Slices/profileSlice';
import axios from 'axios'

const { register_api,logout }  = AUTH_API;

const { PROFILE_DETAILS,PROFILE_UPDATE } = PROFILE_APIS;

export const registerAPI = (data,naviagate) => {
  return async(dispatch) => {
   const toastId = toast.loading('Loading...');
   dispatch(setLoading(true));
   try {
      const response = await apiConnector('POST',register_api,data);
      console.log("response::",response)

      if(!response.data.success){
          throw new Error(response.data.msg)
      }
      toast.success('User Registeration Successfully!');
      naviagate('/login')
   } catch (error) {
      console.log("error::",error)
   }
   dispatch(setLoading(false))
   toast.dismiss(toastId);   
  }
}

export const getProfileDetails = (token) => {
  const payload = {token:JSON.parse(token)}
  
  return async(dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('POST',PROFILE_DETAILS,payload);
      if(!response.data.success){
        throw new Error(response.data.msg)
      }
      dispatch(setProfile(response.data.data))
    }catch(error) {
      console.log("error::",error)
      // toast.error(error.response && error.response.data)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}

export const updateProfile = (data,image,token) => {
  const payload = {
    token:JSON.parse(token),
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    phone:data.phone,
    gender:data.gender,
    file:image
  }

  return async(dispatch) => {
    const toastId = toast.loading('Loading....');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector('PUT',PROFILE_UPDATE,payload,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("responseUpdate::",response.data);
      toast.success("Profile Upadated Successfully");
    }catch(error){
      toast.error(error.response && error.response.data)
      console.log("errors::",error)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}

export const logOut = (token,navigate) => {
  const payload = {
    token:JSON.parse(token)
  }
  return async(dispatch) => {
    const toastId = toast.loading('Loading...')
    dispatch(setLoading(true));
    try {
      axios.defaults.withCredentials = true;
      const response = await apiConnector('POST',logout,payload);
      console.log("response::",response)
      if(!response.data.success){
        throw new Error(response.data.msg)
      }

      toast.success("User Logout Successfully");
      localStorage.removeItem('token')
      dispatch(setToken(null));
      dispatch(setProfile(null))
      navigate('/login')
    }catch (error) {
      console.log("error::",error)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}