import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Mocks das páginas para verificar onde o usuário "parou"
vi.mock('./pages/admin/LoginPage', () => ({ 
    default: () => <div data-testid="login-page">Pagina Cadastro</div> 
}));
vi.mock('./pages/admin/SignInPage', () => ({ 
    default: () => <div data-testid="signin-page">Pagina Login</div> 
}));
vi.mock('./pages/admin/DashboardPage', () => ({ 
    default: () => <div data-testid="dashboard-page">Dashboard</div> 
}));

describe('App.jsx - Rotas', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('Deve renderizar a tela de LOGIN (SignIn) se já tiver admin criado', async () => {
        localStorage.setItem('hasAdminBeenCreated', 'true');

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('signin-page')).toBeInTheDocument();
        });
    });

    it('Deve renderizar a tela de CADASTRO (Login) se for primeiro acesso', async () => {
        // localStorage vazio
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('login-page')).toBeInTheDocument();
        });
    });
});