import crypto from 'crypto';

import { ColaboradorRepository } from '../../../application/repositories';
import { ColaboradorType } from '../../../domain/types';

export class ColaboradorMemoryRepository implements ColaboradorRepository {
  colaboradores: ColaboradorType[];

  constructor() {
    this.colaboradores = [];
  }

  async buscarPorId(id: string): Promise<ColaboradorType | null> {
    const colaborador = this.colaboradores.find(
      colaborador => colaborador.id == id,
    );
    if (!colaborador) return null;
    return colaborador;
  }

  async buscarPorCodigo(codigo: string): Promise<ColaboradorType | null> {
    const colaborador = this.colaboradores.find(
      colaborador => colaborador.codigo == codigo,
    );
    if (!colaborador) return null;
    return colaborador;
  }

  async cadastrar(
    dadosColaborador: Omit<ColaboradorType, 'id'>,
  ): Promise<ColaboradorType> {
    const colaborador = {
      ...dadosColaborador,
      id: crypto.randomUUID(),
    };
    this.colaboradores.push(colaborador);
    return colaborador;
  }

  async remover(id: string): Promise<void> {
    const colaboradoresAtualizados = this.colaboradores.filter(
      colaborador => colaborador.id != id,
    );
    this.colaboradores = colaboradoresAtualizados;
  }
}
