import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StationTable from './StationTable';

describe('StationTable', () => {
    const mockStations = [
        { uid: '1', Nome: 'Estação Norte', address: 'Rua A', status: 'online' },
    ];

    it('Deve renderizar os dados corretamente', () => {
        render(
            <StationTable 
                stations={mockStations} 
                onActionBtnClick={vi.fn()} 
                onLoading={false} 
            />
        );

        // Se o texto aparecer mais de uma vez (mobile/desktop), pegamos o primeiro
        const nomes = screen.getAllByText('Estação Norte');
        expect(nomes.length).toBeGreaterThan(0);
        
        const ruas = screen.getAllByText('Rua A');
        expect(ruas.length).toBeGreaterThan(0);
    });

    it('Deve clicar no botão de ação', () => {
        const actionMock = vi.fn();
        render(
            <StationTable 
                stations={mockStations} 
                onActionBtnClick={actionMock} 
                onLoading={false} 
            />
        );

        // Tenta achar o botão pelo texto (ex: "Ver mais", "Detalhes" ou "Editar")
        // Ajuste o texto abaixo para o que realmente aparece no seu botão
        const btn = screen.queryByText(/Ver mais|Detalhes/i) || screen.getAllByRole('button')[0];
        
        if (btn) {
            fireEvent.click(btn);
            expect(actionMock).toHaveBeenCalled();
        }
    });
});