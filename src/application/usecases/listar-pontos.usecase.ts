import { PontoType } from '../../domain/types';
import { PontoRepository } from '../repositories';

export class ListarPontos {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }> {
    return await this.pontoRepository.listarPaginado(input);
  }
}

type InputType = {
  pagina: number;
  itensPorPagina: number;
};
