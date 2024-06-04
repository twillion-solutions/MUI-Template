import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Slices/authSlice'
import profileSlice from '../Slices/profileSlice';

const rootReducer = configureStore({
    reducer:{
        auth:authSlice,
        profile:profileSlice,
    }
})

export default rootReducer;
