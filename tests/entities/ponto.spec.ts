import { describe, it, expect } from 'vitest';
import { Ponto } from '../../src/domain/entities';

describe('Ponto', () => {
  it('Deve lançar uma exceção ao instânciar ponto com dados insuficientes', () => {
    const body = {
      colaboradorId: 'qualquer_id',
    };

    const ponto = (): Ponto => new Ponto(body);

    expect(ponto).toThrowError();
  });

  it('Deve adicionar hora de saída ao ponto', () => {
    const body = {
      entrada: new Date('2023-03-18 08:00'),
      colaboradorId: 'qualquer_id',
    };
    const ponto = new Ponto(body);
    const saida = new Date('2023-03-18 17:00');

    ponto.setSaida(saida);

    const data = ponto.getData();
    expect(data.saida).toBe(saida);
  });

  it('Deve validar se hora de saída é menor ou igual a hora de entrada', () => {
    const body = {
      entrada: new Date('2023-03-18 08:00'),
      colaboradorId: 'qualquer_id',
    };
    const ponto = new Ponto(body);
    const saida = new Date('2023-03-18 07:00');

    const setSaida = (): void => {
      ponto.setSaida(saida);
    };

    expect(setSaida).toThrowError();
  });
});
