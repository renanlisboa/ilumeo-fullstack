import crypto from 'crypto';
import { describe, it, expect } from 'vitest';
import { Ponto } from '../../src/domain/entities';

export type PontoType = {
  id: string;
  idColaborador: string;
  dataEntrada?: Date;
  dataSaida?: Date;
};

export interface PontoRepository {
  registrar: (dadosPonto: Omit<PontoType, 'id'>) => Promise<void>;
  listar: () => Promise<PontoType[]>;
}

export class PontoMemoryRepository {
  readonly pontos: PontoType[];

  constructor() {
    this.pontos = [];
  }

  async registrar(dadosPonto: Omit<PontoType, 'id'>): Promise<void> {
    const ponto = {
      ...dadosPonto,
      id: crypto.randomUUID(),
    };
    this.pontos.push(ponto);
  }

  async listar(): Promise<PontoType[]> {
    return this.pontos;
  }
}

export class RegistrarEntrada {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = new Ponto(input);
    await this.pontoRepository.registrar(ponto.getDadosPonto());
  }
}

type InputType = {
  idColaborador: string;
  dataEntrada?: Date;
  dataSaida?: Date;
};

describe('RegistrarEntrada', () => {
  it('Deve ser possível registrar data de entrada', async () => {
    const pontoRepository = new PontoMemoryRepository();
    const registrarEntrada = new RegistrarEntrada(pontoRepository);
    const input = {
      idColaborador: 'qualquer_id',
      dataEntrada: new Date(),
    };

    await registrarEntrada.execute(input);

    const pontos = await pontoRepository.listar();
    expect(pontos).toHaveLength(1);
  });
});
