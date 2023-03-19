import { PontoRepository } from '../repositories';
import { Ponto } from '../../domain/entities';
import { NotFoundError } from '../../domain/errors';

export class RegistrarSaida {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = await this.pontoRepository.buscarPorIdColaborador(
      input.idColaborador,
    );
    if (!ponto) throw new NotFoundError('ponto não encontrado');
    const pontoAtualizado = new Ponto(ponto);
    pontoAtualizado.setDataSaida(input.dataSaida);
    const dadosPontoAtualizado = pontoAtualizado.getDadosPonto();
    await this.pontoRepository.registrarSaida(dadosPontoAtualizado);
  }
}

type InputType = {
  idColaborador: string;
  dataSaida: Date;
};
