import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StationForm from './StationForm';

// 1. Criamos o objeto de mock usando vi.hoisted para garantir que ele exista antes das importações
const mocks = vi.hoisted(() => ({
    get: vi.fn(),
    post: vi.fn(),
}));

// 2. Mockamos os módulos retornando nosso objeto criado acima
vi.mock('../api/api', () => ({
    default: mocks
}));
vi.mock('../services/api', () => ({
    default: mocks
}));

vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), error: vi.fn() }
}));

describe('StationForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Configura retorno padrão para GET (lista de parâmetros para popular o form)
        mocks.get.mockResolvedValue({ data: [{ id_tipo_parametro: 1, nome: 'Chuva' }] });
        // Configura retorno padrão para POST (sucesso ao criar)
        mocks.post.mockResolvedValue({ data: { id_estacao: '123' } });
    });

    it('Deve enviar os dados da estação', async () => {
        const onCreationMock = vi.fn();
        render(<StationForm onStationCreation={onCreationMock} />);

        // Aguarda o carregamento dos parâmetros (confirma que o useEffect rodou)
        await waitFor(() => expect(screen.getByText('Chuva')).toBeInTheDocument());

        // Preenche os campos
        // Como temos vários inputs, usamos seletores específicos ou getAllByRole se os labels não forem únicos
        const inputs = screen.getAllByRole('textbox');
        // O primeiro input geralmente é o UUID, o segundo o Nome, etc. (Baseado na ordem do seu JSX)
        if(inputs[0]) fireEvent.change(inputs[0], { target: { value: 'station-01' } }); // UUID
        if(inputs[1]) fireEvent.change(inputs[1], { target: { value: 'Estação Teste' } }); // Nome
        
        // Clica no botão de enviar
        const btn = screen.getByRole('button', { name: /Enviar/i });
        fireEvent.click(btn);

        // Verifica se o POST foi chamado
        await waitFor(() => {
            expect(mocks.post).toHaveBeenCalled();
            expect(onCreationMock).toHaveBeenCalled();
        });
    });
});