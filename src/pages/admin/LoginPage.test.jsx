import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import * as apiService from '../../services/api';

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('Deve renderizar os campos corretamente', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        // Verifica se os campos existem pelo texto da etiqueta (Label)
        expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    });

    it('Deve chamar a API de registro ao enviar o formulário', async () => {
        // Mock da API
        vi.spyOn(apiService, 'registerFirstUser').mockResolvedValue({});
        // Mock do alert para não travar o teste (jsdom não implementa window.alert)
        vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        // Preenche formulário buscando pelos Labels exatos do seu componente
        fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'Admin' } });
        fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'admin@nimbus.com' } });
        fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });

        // Envia
        const btn = screen.getByRole('button', { name: /Criar Administrador/i });
        fireEvent.click(btn);

        // Verifica chamada da API
        await waitFor(() => {
            expect(apiService.registerFirstUser).toHaveBeenCalledWith(expect.objectContaining({
                email: 'admin@nimbus.com'
            }));
        });
        
        expect(localStorage.getItem('hasAdminBeenCreated')).toBe('true');
    });
});