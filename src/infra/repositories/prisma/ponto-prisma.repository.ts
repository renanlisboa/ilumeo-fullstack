import crypto from 'crypto';
import { PontoRepository } from '../../../application/repositories';
import { PontoType } from '../../../domain/types';

export class PontoMemoryRepository implements PontoRepository {
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
