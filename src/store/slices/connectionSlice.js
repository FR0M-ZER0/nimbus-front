import { createSlice } from '@reduxjs/toolkit'

const connectionSlice = createSlice({
    name: 'connection',
    initialState: { connected: false },
    reducers: {
        wsConnected: (state) => {
            state.connected = true
        },
        wsDisconnected: (state) => {
            state.connected = false
        },
    },
})

export const { wsConnected, wsDisconnected } = connectionSlice.actions
export default connectionSlice.reducer