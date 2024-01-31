import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, getDataTest} from "~/services/getService";

export const getMe= createAsyncThunk('api/getMe',async (data,thunk)=>{
    const current = await getDataTest();
    return current;
})
export const apiSlice = createSlice({
    name:'api',
    initialState:{
        allData:[],
        singleData:[]
    },
    reducers:{
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getMe.fulfilled,(state,action)=>{
            state.allData=action.payload;
        })
        
    }
    
})

export const {getProduct}=apiSlice.actions;
export default apiSlice.reducer;