import crypto from 'crypto';

import { Colaborador } from '../../../domain/types';

export class ColaboradorMemoryRepository {
  colaboradores: Colaborador[];

  constructor() {
    this.colaboradores = [];
  }

  async get(codigo: string): Promise<Colaborador | null> {
    const colaborador = this.colaboradores.find(
      colaborador => colaborador.codigo == codigo,
    );
    if (!colaborador) return null;
    return colaborador;
  }

  async registrar(
    dadosColaborador: Omit<Colaborador, 'id'>,
  ): Promise<Colaborador> {
    const colaborador = {
      ...dadosColaborador,
      id: crypto.randomUUID(),
      pontos: [],
    };
    this.colaboradores.push(colaborador);
    return colaborador;
  }
}
