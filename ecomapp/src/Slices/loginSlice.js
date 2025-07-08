import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email:" ",
    password:" ",
    token:localStorage.getItem("token") || " ",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setEmail:(state,action)=>{
            state.email=action.payload;
        },
        setPassword:(state,action)=>{
            state.password=action.payload;
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        }
    }
});

export const {setEmail,setPassword,setToken } = loginSlice.actions;
export default loginSlice.reducer;
