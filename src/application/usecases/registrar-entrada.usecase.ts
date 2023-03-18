import { PontoRepository } from '../repositories';
import { Ponto } from '../../domain/entities';

export class RegistrarEntrada {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = new Ponto(input);
    await this.pontoRepository.registrar(ponto.getDadosPonto());
  }
}

type InputType = {
  idColaborador: string;
  dataEntrada?: Date;
  dataSaida?: Date;
};
