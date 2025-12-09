import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Funções de Autenticação ---
export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/login', { email, senha: password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao tentar fazer login.');
    }
};

export const registerFirstUser = async (userData) => {
    try {
        const response = await apiClient.post('/user', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao cadastrar usuário.');
    }
};

// --- Funções para o CRUD de Usuários ---
const USER_ENDPOINT = '/user';

export const getUsers = async () => { try { const response = await apiClient.get(USER_ENDPOINT); return response.data; } catch (error) { throw new Error(error.response?.data?.message || 'Erro ao buscar usuários.'); } };
export const createUser = async (userData) => { try { const response = await apiClient.post(USER_ENDPOINT, userData); return response.data; } catch (error) { throw new Error(error.response?.data?.message || 'Erro ao criar usuário.'); } };
export const updateUser = async (userId, userData) => { try { const response = await apiClient.put(`${USER_ENDPOINT}/${userId}`, userData); return response.data; } catch (error) { throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário.'); } };
export const deleteUser = async (userId) => { try { const response = await apiClient.delete(`${USER_ENDPOINT}/${userId}`); return response.data; } catch (error) { throw new Error(error.response?.data?.message || 'Erro ao deletar usuário.'); } };
