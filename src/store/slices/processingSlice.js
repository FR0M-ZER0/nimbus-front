import { createSlice } from '@reduxjs/toolkit'

const processingSlice = createSlice({
    name: 'processing',
    initialState: {
        last: null,
        history: []
    },
    reducers: {
        processingReceived: (state, action) => {
            state.last = action.payload
            state.history.push(action.payload)
        },
    },
})

export const { processingReceived } = processingSlice.actions
export default processingSlice.reducer