import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StationForm from './StationForm';

// CORREÇÃO: Padrão mais simples para evitar erro de inicialização
const mocks = vi.hoisted(() => {
  return {
    get: vi.fn(),
    post: vi.fn(),
  }
})

vi.mock('../api/api', () => {
  return {
    default: mocks
  }
})

vi.mock('../services/api', () => {
  return {
    default: mocks
  }
})

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}));

describe('StationForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Configura respostas padrão
        mocks.get.mockResolvedValue({ data: [{ id_tipo_parametro: 1, nome: 'Chuva' }] });
        mocks.post.mockResolvedValue({ data: { id_estacao: '123' } });
    });

    it('Deve enviar os dados da estação', async () => {
        const onCreationMock = vi.fn();
        render(<StationForm onStationCreation={onCreationMock} />);

        // Aguarda carregar para garantir que a tela está pronta
        await waitFor(() => expect(screen.getByText('Chuva')).toBeInTheDocument());

        // Preenche os inputs (Buscando todos os campos de texto)
        const inputs = screen.getAllByRole('textbox');
        // Preenche o primeiro (UUID) e o segundo (Nome)
        if(inputs[0]) fireEvent.change(inputs[0], { target: { value: 'station-01' } });
        if(inputs[1]) fireEvent.change(inputs[1], { target: { value: 'Estação Teste' } });
        
        // Clica no botão de enviar
        const btn = screen.getByRole('button', { name: /Enviar/i });
        fireEvent.click(btn);

        // Verifica sucesso
        await waitFor(() => {
            expect(mocks.post).toHaveBeenCalled();
            expect(onCreationMock).toHaveBeenCalled();
        });
    });
});