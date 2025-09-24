import axios from 'axios'

const api = axios.create({
    baseURL: process.env.API_ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000,
})

export default api