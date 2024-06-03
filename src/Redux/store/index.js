import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Slices/authSlice'

const rootReducer = configureStore({
    reducer:{
        auth:authSlice
    }
})

export default rootReducer;
