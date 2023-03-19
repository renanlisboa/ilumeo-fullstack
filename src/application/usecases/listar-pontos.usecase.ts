import { PontoType } from '../../domain/types';
import { PontoRepository } from '../repositories';

export class ListarPontos {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(query?: any): Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }> {
    const data = await this.pontoRepository.listarPaginado(query);
    return data;
  }
}
