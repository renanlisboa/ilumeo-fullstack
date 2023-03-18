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
      return {
        colaboradorId: novoColaborador.id,
        codigoColaborador: novoColaborador.codigo,
      };
    }
    return {
      colaboradorId: colaborador.id,
      codigoColaborador: colaborador.codigo,
    };
  }
}

type InputType = {
  codigoColaborador: string;
};

type OutputType = {
  colaboradorId: string;
  codigoColaborador: string;
};
