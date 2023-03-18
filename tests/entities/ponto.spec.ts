import { describe, it, expect } from 'vitest';
import { Ponto } from '../../src/domain/entities';

describe('Ponto', () => {
  it('Deve lançar uma exceção ao instânciar ponto com dados insuficientes', () => {
    const body = {
      idColaborador: 'qualquer_id',
    };

    const ponto = (): Ponto => new Ponto(body);

    expect(ponto).toThrowError();
  });

  it('Deve adicionar hora de saída ao ponto', () => {
    const body = {
      dataEntrada: new Date('2023-03-18 08:00'),
      idColaborador: 'qualquer_id',
    };
    const ponto = new Ponto(body);
    const dataSaida = new Date('2023-03-18 17:00');

    ponto.setDataSaida(dataSaida);

    const dadosPonto = ponto.getDadosPonto();
    expect(dadosPonto.dataSaida).toBe(dataSaida);
  });

  it('Deve validar se data de saída é menor ou igual a data de entrada', () => {
    const body = {
      dataEntrada: new Date('2023-03-18 08:00'),
      idColaborador: 'qualquer_id',
    };
    const ponto = new Ponto(body);
    const dataSaida = new Date('2023-03-18 07:00');

    const setDataSaida = (): void => {
      ponto.setDataSaida(dataSaida);
    };

    expect(setDataSaida).toThrowError();
  });
});
