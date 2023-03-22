import { NotFoundError } from '../../domain/errors';
import { PontoType } from '../../domain/types';
import { PontoRepository } from '../repositories';

export class BuscarPonto {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(idColaborador: string): Promise<PontoType | null> {
    const data = await this.pontoRepository.buscarPorIdColaborador(
      idColaborador,
    );
    if (!data) throw new NotFoundError('ponto em aberto não encontrado');
    return data;
  }
}
