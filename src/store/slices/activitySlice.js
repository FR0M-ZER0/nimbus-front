import { createSlice } from '@reduxjs/toolkit'
import { statusReceived } from './statusSlice'
import { logReceived } from './logSlice'
import { processingReceived } from './processingSlice'

const MAX_HISTORY = 30

const activitySlice = createSlice({
    name: 'activity',
    initialState: {
        history: [],
        lastStatusByStation: {}
    },
    reducers: {
        activityFetched: (state, action) => {
            state.history = action.payload.slice(0, MAX_HISTORY)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(statusReceived, (state, action) => {
                const { id_estacao, status, created_at } = action.payload
                const previousStatus = state.lastStatusByStation[id_estacao]
                const timestamp = new Date(created_at)
                const formattedDate = `${timestamp.toLocaleDateString('pt-BR')} - ${timestamp.toLocaleTimeString('pt-BR', { hour12: false })}`

                let event = null
                let eventStatus = 'Info'

                if (previousStatus && previousStatus !== status) {
                    if (status === 'OFFLINE') {
                        event = 'Conexão perdida'
                        eventStatus = 'Erro'
                    } else if (status === 'ONLINE') {
                        event = 'Retomou conexão'
                        eventStatus = 'Info'
                    }
                }

                if (event) {
                    state.history.unshift({
                        date: formattedDate,
                        station: id_estacao,
                        event,
                        status: eventStatus
                    })
                }

                if (state.history.length > MAX_HISTORY) {
                    state.history = state.history.slice(0, MAX_HISTORY)
                }

                state.lastStatusByStation[id_estacao] = status
            })
            .addCase(logReceived, (state, action) => {
                const { id_estacao, created_at } = action.payload
                const timestamp = new Date(created_at)
                const formattedDate = `${timestamp.toLocaleDateString('pt-BR')} - ${timestamp.toLocaleTimeString('pt-BR', { hour12: false })}`

                state.history.unshift({
                    date: formattedDate,
                    station: id_estacao,
                    event: 'Enviou dados não processados',
                    status: 'Info'
                })

                if (state.history.length > MAX_HISTORY) {
                    state.history = state.history.slice(0, MAX_HISTORY)
                }
            })
            .addCase(processingReceived, (state, action) => {
                const { id_estacao, created_at } = action.payload
                const timestamp = new Date(created_at)
                const formattedDate = `${timestamp.toLocaleDateString('pt-BR')} - ${timestamp.toLocaleTimeString('pt-BR', { hour12: false })}`

                state.history.unshift({
                    date: formattedDate,
                    station: id_estacao || 'Data Processing Service',
                    event: 'Dados processados',
                    status: 'Info'
                })

                if (state.history.length > MAX_HISTORY) {
                    state.history = state.history.slice(0, MAX_HISTORY)
                }
            })
    }
})

export const { activityFetched } = activitySlice.actions
export default activitySlice.reducer
