import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
// 1. Importamos o MemoryRouter REAL. Não vamos mocká-lo.
import { MemoryRouter } from 'react-router-dom';

// 2. Declaramos a função mock AQUI FORA.
// Assim, nossos testes 'it(...)' conseguem acessá-la.
const navigateMock = vi.fn();

// 3. Mockamos o 'react-router-dom'
vi.mock('react-router-dom', async (importOriginal) => {
  // Pegamos o módulo original
  const actual = await importOriginal();
  
  return {
    ...actual, // <-- Retornamos TODOS os exports reais (Routes, Route, etc.)
    
    // E sobrescrevemos APENAS o componente 'Navigate'
    Navigate: (props) => {
      // Quando o <Navigate> for renderizado, ele chama nosso mock
      navigateMock(props.to); 
      return <div data-testid="mock-navigate" />; // Renderiza algo simples
    },
  };
});

// Função auxiliar para renderizar o App dentro do router
const renderApp = (route = '/') => {
  return render(
    // 4. Usamos o MemoryRouter REAL para envolver o App.
    // Isso resolve o erro "useNavigate() may be used only in..."
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

describe('Componente de Roteamento Principal (App.jsx)', () => {
  
  // 5. Limpamos os mocks E o localStorage ANTES de cada teste
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  
  it('Deve redirecionar para a página de Login (/signin) se o administrador JÁ foi criado', () => {
    // Configuração
    localStorage.setItem('hasAdminBeenCreated', 'true');

    // Ação
    renderApp('/'); // Renderiza o App na rota inicial

    // Verificação
    // 6. Verificamos se a NOSSA função mock foi chamada com a rota correta.
    expect(navigateMock).toHaveBeenCalledWith('/signin');
  });

  it('Deve redirecionar para a página de Cadastro (/login) se o setup NÃO foi concluído', () => {
    // Configuração (localStorage já está limpo pelo beforeEach)
    
    // Ação
    renderApp('/'); // Renderiza o App na rota inicial

    // Verificação
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });
});