import { PontoRepository } from '../repositories';
import { Ponto } from '../../domain/entities';

export class RegistrarSaida {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = await this.pontoRepository.buscarPorIdColaborador(
      input.idColaborador,
    );
    if (!ponto) throw new Error('Ponto não encontrado');
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
