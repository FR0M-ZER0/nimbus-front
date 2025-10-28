import {
    wsConnected,
    wsDisconnected
} from './slices/connectionSlice.js'
import { statusReceived } from './slices/statusSlice.js'
import { logReceived } from './slices/logSlice.js'
import { processingReceived } from './slices/processingSlice.js'

let socket = null

export const websocketMiddleware = (url) => (store) => (next) => (action) => {
    if (action.type === 'WS_CONNECT') {
        if (socket) socket.close()

        socket = new WebSocket(url)

        socket.onopen = () => {
            console.log('WebSocket conectado')
            store.dispatch(wsConnected())
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)

            console.log('Mensagem recebida do WS:', data)
            
            switch (data.type) {
                case 'STATUS_UPDATE':
                    store.dispatch(statusReceived(data.estacaoStatus))
                    break
                case 'LOG_UPDATE':
                    store.dispatch(logReceived(data.estacaoLog))
                    break
                case 'PROCESSING_LOG':
                    store.dispatch(processingReceived(data.dataProcessingLog))
                    break
                default:
                    console.warn('Tipo de mensagem desconhecido:', data.type)
                    break
            }
        }

        socket.onclose = () => {
            console.log('WebSocket desconectado')
            store.dispatch(wsDisconnected())
        }
    }

    if (action.type === 'WS_DISCONNECT' && socket) {
        socket.close()
    }

    return next(action)
}
