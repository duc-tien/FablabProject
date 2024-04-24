import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const projectSlice = createSlice({
    name:'project',
    initialState:{
        currentMachineId:'MC'
    },
    reducers:{
        activeMachine:(state,action)=>{
            state.currentMachineId=action.payload
        }
    },
   
    
})

export const {activeMachine}=projectSlice.actions;
export default projectSlice.reducer;


