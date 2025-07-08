import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: " ",
    email: " ",
    password: " ",
    avatar:"https://picsum.photos/800"
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setEmail:(state,action)=>{
            state.email=action.payload;
        },
        setPassword:(state,action)=>{
            state.password=action.payload;
        },
        setName:(state,action)=>{
            state.name=action.payload;
        }
       
    }
});

export const {setEmail,setPassword,setName } = registerSlice.actions;
export default registerSlice.reducer;