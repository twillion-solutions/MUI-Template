import { toast } from "react-hot-toast";
import AUTH_API from '../api';
import apiConnector from '../apiConnector';
import setLoading from '../../Redux/Slices/authSlice';

const {register_api} = AUTH_API;

const signUpAPI = (
    data,
    navigate
  ) => {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", register_api, {
          data
        })
  
        console.log("response", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("error::", error)
        toast.error("Signup Failed")
        navigate("/")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

  export default signUpAPI;