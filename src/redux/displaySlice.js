import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
    name:'display',
    initialState:{
        isLogin:false
    },
    reducers:{
    displayModalLogin:(state,action)=>{
        state.isLogin=action.payload;
        },
    
    },
    
})

export const {displayModalLogin}=displaySlice.actions;
export default displaySlice.reducer;