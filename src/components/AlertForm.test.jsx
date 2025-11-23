import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AlertForm from './AlertForm';
import api from '../api/api';

// Mock do Toast
vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn() }
}));

// Mock do Card para evitar problemas de renderização de filhos
vi.mock('./Card', () => ({
    default: ({ children }) => <div>{children}</div>
}));

describe('Componente AlertForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock da API com a estrutura EXATA que seu componente espera
    vi.spyOn(api, 'get').mockImplementation((url) => {
      if (url === '/stations') {
        // O componente espera response.data.data
        return Promise.resolve({ 
            data: { 
                data: [{ id_estacao: 'uuid-123', nome: 'Estação Teste' }] 
            } 
        });
      }
      if (url === '/user') {
        // O componente espera response.data.usuarios
        return Promise.resolve({ 
            data: { 
                usuarios: [{ id_usuario: 1, nome: 'Usuario Teste', email: 'teste@teste.com' }] 
            } 
        });
      }
      if (url.includes('tipo-parametros')) {
        // O componente espera response.data (array direto)
        return Promise.resolve({ 
            data: [{ id_tipo_parametro: 10, nome: 'Vento', unidade: 'km/h' }] 
        });
      }
      return Promise.resolve({ data: [] });
    });

    vi.spyOn(api, 'post').mockResolvedValue({ data: { id: 1 } });
  });

  it('Deve renderizar e enviar o formulário', async () => {
    const mockOnAdd = vi.fn();
    render(<AlertForm onAdd={mockOnAdd} />);

    // Aguarda o carregamento da estação no select
    await waitFor(() => expect(screen.getByText(/Estação Teste/i)).toBeInTheDocument());

    // Preenche os campos
    // Como o select é customizado ou html padrão, usamos fireEvent.change no select
    const stationSelect = screen.getByLabelText(/Estação/i);
    fireEvent.change(stationSelect, { target: { value: 'uuid-123' } });

    // Preenche Título
    const titleInput = screen.getByLabelText(/Título/i);
    fireEvent.change(titleInput, { target: { value: 'Alerta de Teste' } });

    // Preenche Valor
    const valueInput = screen.getByLabelText(/Valor/i);
    fireEvent.change(valueInput, { target: { value: '50' } });
    
    // Clica no botão de enviar
    const submitBtn = screen.getByText(/Enviar/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(mockOnAdd).toHaveBeenCalled();
    });
  });
});