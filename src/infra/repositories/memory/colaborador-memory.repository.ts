import crypto from 'crypto';

import { ColaboradorRepository } from '../../../application/repositories';
import { ColaboradorType } from '../../../domain/types';

export class ColaboradorMemoryRepository implements ColaboradorRepository {
  readonly colaboradores: ColaboradorType[];

  constructor() {
    this.colaboradores = [];
  }

  async buscar(codigo: string): Promise<ColaboradorType | null> {
    const colaborador = this.colaboradores.find(
      colaborador => colaborador.codigo == codigo,
    );
    if (!colaborador) return null;
    return colaborador;
  }

  async registrar(
    dadosColaborador: Omit<ColaboradorType, 'id'>,
  ): Promise<ColaboradorType> {
    const colaborador = {
      ...dadosColaborador,
      id: crypto.randomUUID(),
    };
    this.colaboradores.push(colaborador);
    return colaborador;
  }
}
