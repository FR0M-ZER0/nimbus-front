import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('authToken')
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        }
    }
})

export const { loginSuccess, logout, updateUser } = authSlice.actions
export default authSlice.reducer