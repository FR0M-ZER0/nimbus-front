import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        last: null,
        history: []
    },
    reducers: {
        statusReceived: (state, action) => {
            state.last = action.payload
            state.history.push(action.payload)
        },
    },
})

export const { statusReceived } = statusSlice.actions
export default statusSlice.reducer