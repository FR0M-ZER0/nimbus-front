import axios from 'axios';

// Configura a URL base para todas as chamadas.
// Agora, em vez de escrever "http://localhost:3001/api/login",
// podemos apenas usar "/auth/login".
const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Função para fazer login
export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        // O backend deve retornar um objeto com a propriedade "token"
        return response.data;
    } catch (error) {
        // Se o backend retornar um erro (ex: 401 Unauthorized), ele será capturado aqui.
        // Lançamos o erro para que o componente de UI possa tratá-lo.
        throw new Error(error.response?.data?.message || 'Erro ao tentar fazer login.');
    }
};

// Função para cadastrar o primeiro usuário
export const registerFirstUser = async (userData) => {
    try {
        const response = await apiClient.post('/users/primeiro-acesso', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erro ao cadastrar usuário.');
    }
};