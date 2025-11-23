import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './slices/connectionSlice.js'
import statusReducer from './slices/statusSlice.js'
import logReducer from './slices/logSlice.js'
import processingReducer from './slices/processingSlice.js'
import summaryReducer from './slices/summarySlice.js'
import activityReducer from './slices/activitySlice.js'
import authSliceReducer from './slices/authSlice.js'
import { websocketMiddleware } from './webSocketMiddleware.js'

const WS_URL = 'ws://localhost:3001'

export const store = configureStore({
    reducer: {
        connection: connectionReducer,
        status: statusReducer,
        log: logReducer,
        processing: processingReducer,
        summary: summaryReducer,
        activity: activityReducer,
        auth: authSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware(WS_URL)),
})
