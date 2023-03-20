import { PontoRepository } from '../repositories';
import { PontoSaida } from '../../domain/entities';
import { NotFoundError } from '../../domain/errors';

export class RegistrarSaida {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = await this.pontoRepository.buscarPorId(input.id);
    if (!ponto) throw new NotFoundError('ponto não encontrado');
    const pontoAtualizado = new PontoSaida({
      ...ponto,
      dataSaida: input.dataSaida,
    });
    pontoAtualizado.validarHoraEntradaESaida();
    const dadosPontoAtualizado = pontoAtualizado.getDadosPonto();
    await this.pontoRepository.registrarSaida(dadosPontoAtualizado);
  }
}

type InputType = {
  id: string;
  dataSaida: Date;
};
