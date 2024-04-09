import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const projectSlice = createSlice({
    name:'detailProject',
    initialState:{
        listDetail:[]
    },
    reducers:{
        addDetailToList:(state,action)=>{
            const tempListDetail = [...state.listDetail,action.payload]
            state.listDetail=tempListDetail
        }
    },
   
    
})

export const {addDetailToList}=projectSlice.actions;
export default projectSlice.reducer;


