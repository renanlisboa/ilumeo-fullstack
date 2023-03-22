import { ColaboradorRepository, PontoRepository } from '../repositories';
import { PontoEntrada } from '../../domain/entities';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../../domain/errors';

export class RegistrarEntrada {
  constructor(
    private readonly colaboradorRepository: ColaboradorRepository,
    private readonly pontoRepository: PontoRepository,
  ) {}

  async execute(input: InputType): Promise<void> {
    if (!input?.idColaborador) {
      throw new BadRequestError('código do colaborador é obrigatório');
    }
    const colaborador = await this.colaboradorRepository.buscarPorId(
      input.idColaborador,
    );
    if (!colaborador) throw new NotFoundError('colaborador não encontrado');
    const pontoAberto = await this.pontoRepository.buscarPorIdColaborador(
      colaborador.id,
    );
    if (pontoAberto) throw new ConflictError('já existe um ponto em aberto');
    const ponto = new PontoEntrada({
      idColaborador: input.idColaborador,
    });
    await this.pontoRepository.registrarEntrada(ponto.getDadosPonto());
  }
}

type InputType = {
  idColaborador?: string;
};
