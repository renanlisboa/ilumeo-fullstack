import { describe, it, expect } from 'vitest';

type PontoBody = {
  colaboradorId: string;
  entrada?: Date;
  saida?: Date;
};

export class Ponto {
  private readonly colaboradorId: string;
  private readonly entrada?: Date;
  private saida?: Date;

  constructor(body: PontoBody) {
    this.validarBody(body);
    this.colaboradorId = body.colaboradorId;
    this.entrada = body.entrada;
    this.saida = body.saida;
  }

  getData(): PontoBody {
    return {
      colaboradorId: this.colaboradorId,
      entrada: this.entrada,
      saida: this.saida,
    };
  }

  setSaida(saida: Date): void {
    this.validarHoraEntradaESaida(saida);
    this.saida = saida;
  }

  validarBody(body: PontoBody): void {
    if (!body.colaboradorId) throw new Error('colaborador_id é obrigatório');
    if (!body.entrada && !body.saida) {
      throw new Error('entrada ou saída é obrigatório');
    }
  }

  validarHoraEntradaESaida(saida: Date): void {
    if (!this.entrada) return;
    if (saida <= this.entrada) {
      throw new Error('data de entrada maior ou igual a data de saída');
    }
  }
}

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
