import { describe, it, expect } from 'vitest';

import { PontoSaida } from '../../../src/domain/entities';

describe('PontoSaida', () => {
  it('Deve lançar uma exceção ao instânciar ponto com dados inválidos', () => {
    const body = {
      id: '',
      dataEntrada: null,
      dataSaida: null,
    };

    const ponto = (): PontoSaida => new PontoSaida(body);

    expect(ponto).toThrowError();
  });

  it('Deve adicionar hora de saída ao ponto', () => {
    const data = new Date();
    const dataEntrada = data;
    data.setHours(data.getHours() + 1);
    const dataSaida = data;
    const body = {
      dataEntrada,
      dataSaida,
      id: 'qualquer_id',
    };

    const ponto = new PontoSaida(body);

    const dadosPonto = ponto.getDadosPonto();
    expect(dadosPonto.dataSaida).toBe(data);
  });

  it('Deve validar se data de saída é menor ou igual a data de entrada', () => {
    const data = new Date();
    const dataEntrada = data;
    data.setHours(data.getHours() + 1);
    const dataSaida = data;
    const body = {
      dataEntrada,
      dataSaida,
      id: 'qualquer_id',
    };
    const ponto = new PontoSaida(body);

    const validarHoraEntradaESaida = (): void => {
      ponto.validarHoraEntradaESaida();
    };

    expect(validarHoraEntradaESaida).toThrowError();
  });
});
