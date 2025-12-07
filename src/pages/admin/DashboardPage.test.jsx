import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from './DashboardPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import api from '../../api/api';

// Mocks de componentes filhos pesados para isolar o teste da página
vi.mock('../../components/MeasureChart', () => ({ default: () => <div>Chart</div> }));
vi.mock('../../components/StationDownMap', () => ({ default: () => <div>Map</div> }));
vi.mock('../../components/LastAlerts', () => ({ default: () => <div>Alerts</div> }));
vi.mock('../../components/DateTimeWatcher', () => ({ default: () => <div>Relógio</div> }));

describe('DashboardPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        
        // Mock Robusto da API
        vi.spyOn(api, 'get').mockImplementation((url) => {
            if (url.includes('/alarms/today')) {
                return Promise.resolve({ data: [] }); // Array vazio para .length
            }
            if (url.includes('/station-status/summary')) {
                return Promise.resolve({ 
                    data: { online: 5, total: 10, current_date: '10/10/2024' } 
                });
            }
            if (url.includes('/station-log/data-sent')) {
                // Estrutura profunda que causava o erro
                return Promise.resolve({ 
                    data: { 
                        data: { total_data_sent_mb: 100 } 
                    } 
                });
            }
            if (url.includes('/logs/activity')) {
                return Promise.resolve({ 
                    data: { history: [] } // Array vazio para evitar erro no slice
                });
            }
            return Promise.resolve({ data: {} });
        });
    });

    it('Deve renderizar o dashboard e exibir dados da API', async () => {
        render(
            <Provider store={store}>
                <DashboardPage />
            </Provider>
        );

        // Verifica se os cards estáticos renderizaram
        expect(screen.getByText(/Estações conectadas/i)).toBeInTheDocument();
        
        // Aguarda os dados da API serem carregados e exibidos
        // O valor '100' vem do mock do total_data_sent_mb
        await waitFor(() => {
            expect(screen.getByText('100')).toBeInTheDocument();
        });
        
        // Verifica se o mock de status funcionou (Total: 10)
        expect(screen.getByText('10')).toBeInTheDocument();
    });
});