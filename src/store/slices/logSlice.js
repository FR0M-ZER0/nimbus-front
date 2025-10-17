import { createSlice } from '@reduxjs/toolkit'

const logSlice = createSlice({
    name: 'log',
    initialState: {
        last: null,
        history: []
    },
    reducers: {
        logReceived: (state, action) => {
            state.last = action.payload
            state.history.push(action.payload)
        },
    },
})

export const { logReceived } = logSlice.actions
export default logSlice.reducer