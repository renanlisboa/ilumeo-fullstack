import { ColaboradorRepository, PontoRepository } from '../repositories';
import { PontoEntrada } from '../../domain/entities';
import { NotFoundError } from '../../domain/errors';

export class RegistrarEntrada {
  constructor(
    private readonly colaboradorRepository: ColaboradorRepository,
    private readonly pontoRepository: PontoRepository,
  ) {}

  async execute(input: InputType): Promise<void> {
    const colaborador = await this.colaboradorRepository.buscarPorId(
      input.idColaborador,
    );
    if (!colaborador) throw new NotFoundError('colaborador não encontrado');
    const ponto = new PontoEntrada(input);
    await this.pontoRepository.registrarEntrada(ponto.getDadosPonto());
  }
}

type InputType = {
  idColaborador: string;
};
