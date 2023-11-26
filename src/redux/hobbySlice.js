import { createSlice } from "@reduxjs/toolkit";

export const hobbySlice = createSlice({
    name:'hobby',
    initialState:{
        listHobby:['an uong']
    },
    reducers:{
    addHobby:(state,action)=>{
        const newList = [...state.listHobby, action.payload];
        state.listHobby=newList;
        },
    deleteHobby:(state,action)=>{
        const newList=[...state.listHobby]
        newList.splice(action.payload,1)
        state.listHobby=newList
    }
    },
    
})

export const {addHobby,deleteHobby}=hobbySlice.actions;
export default hobbySlice.reducer;