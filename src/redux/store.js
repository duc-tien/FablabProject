import { configureStore } from "@reduxjs/toolkit";
import hobbyReducer from "./hobbySlice";
import displayReducer from './displaySlice'

export default configureStore({
    reducer:{
        hobby:hobbyReducer,
        display:displayReducer
    }
})


