import { createSlice } from '@reduxjs/toolkit'

const summarySlice = createSlice({
    name: 'summary',
    initialState: {
        last: null,
        history: [],
    },
    reducers: {
        summaryReceived: (state, action) => {
            state.last = action.payload
            state.history.push(action.payload)
        },
    },
})

export const { summaryReceived } = summarySlice.actions
export default summarySlice.reducer
