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
        // Busca infalível pelo ID de teste
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-email')).toBeInTheDocument();
        expect(screen.getByTestId('input-password')).toBeInTheDocument();
    });

    it('Deve chamar a API de registro ao enviar o formulário', async () => {
        vi.spyOn(apiService, 'registerFirstUser').mockResolvedValue({});
        vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        // Preenche usando os IDs (garante que vai achar o elemento certo)
        fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Admin' } });
        fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'admin@nimbus.com' } });
        fireEvent.change(screen.getByTestId('input-password'), { target: { value: '123456' } });

        const btn = screen.getByRole('button', { name: /Criar Administrador/i });
        fireEvent.click(btn);

        await waitFor(() => {
            expect(apiService.registerFirstUser).toHaveBeenCalledWith(expect.objectContaining({
                email: 'admin@nimbus.com'
            }));
        });
        
        expect(localStorage.getItem('hasAdminBeenCreated')).toBe('true');
    });
});