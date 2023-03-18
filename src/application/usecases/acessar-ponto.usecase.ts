import { Colaborador } from '../../domain/types';
import { ColaboradorRepository } from '../repositories';

export class AcessarPonto {
  constructor(private readonly colaboradorRepository: ColaboradorRepository) {}

  async execute(input: InputType): Promise<OutputType> {
    const colaborador = await this.colaboradorRepository.get(
      input.codigoColaborador,
    );
    if (!colaborador) {
      const dadosNovoColaborador = {
        codigo: input.codigoColaborador,
      };
      const novoColaborador = await this.colaboradorRepository.registrar(
        dadosNovoColaborador,
      );
      return { colaborador: novoColaborador };
    }
    return { colaborador };
  }
}

type InputType = {
  codigoColaborador: string;
};

type OutputType = {
  colaborador: Colaborador;
};
