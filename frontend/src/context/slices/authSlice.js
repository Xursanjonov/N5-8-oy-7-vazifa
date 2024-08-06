import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("new-auth-token", action.payload)
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("new-user-data", action.payload)
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("new-auth-token")
            localStorage.removeItem("new-user-data")
        },
    },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;