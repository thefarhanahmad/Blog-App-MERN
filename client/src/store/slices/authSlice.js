
import { createSlice } from '@reduxjs/toolkit';

const data = {
    token:localStorage.getItem("token")||null,
    user:null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState:data,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken:(state,action)=>{
        state.token = null
    },
    setUser:(state,action)=>{
        state.user = action.payload
    },
    removeUser:(state,action)=>{
        state.user = null
    },
    
  },
});

export const { setToken,removeToken,setUser,removeUser } = authSlice.actions;


export default authSlice.reducer;
