import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// OBS: Substituir esta parte pela chamada real da API de login
const authApi = {
    login: async (email, password) => {
        console.log('API: Tentando logar com', { email, password });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay de rede

        if (email === 'admin@tecsus.com.br' && password === 'admin') {
            return {
                user: { name: 'Admin Principal', email: 'admin@tecsus.com.br' },
                token: 'fake-jwt-token-string-12345'
            };
        } else {
            throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
        }
    }
};

function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const { token } = await authApi.login(email, password);

            localStorage.setItem('authToken', token);

            navigate('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-screen gradient-dark-bg main-light-color-text'>

            <div className='flex flex-col items-center gap-8 w-full max-w-sm px-4'>
                <img src='/nimbus_logo.svg' alt='Nimbus Logo' className='h-24 w-auto mb-4' />

                <div className='text-center'>
                    <h1 className='text-3xl font-semibold mb-1'>Bem-vindo(a) de volta!</h1>
                    <p className='text-md alt-light-color-text'>
                        Acesse a plataforma para continuar monitorando.
                    </p>
                </div>

                <form onSubmit={handleLogin} className='w-full'>
                    {error && (
                        <div className='bg-red-900/50 text-red-300 p-3 rounded-lg mb-6 text-center'>
                            {error}
                        </div>
                    )}

                    <div className='mb-6'>
                        <label htmlFor='email' className='block mb-2 text-sm font-medium alt-light-color-text'>
                            Seu e-mail
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='form-input main-light-color-text border border-transparent focus:border-blue-500'
                            placeholder='nome@tecsus.com.br'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='password' className='block mb-2 text-sm font-medium alt-light-color-text'>
                            Sua senha
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='form-input main-light-color-text border border-transparent focus:border-blue-500'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='submit-button w-full main-light-color-text disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;