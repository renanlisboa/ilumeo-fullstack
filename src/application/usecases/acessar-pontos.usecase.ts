import { ColaboradorRepository } from '../repositories';
import { Colaborador } from '../../domain/entities';
import { ColaboradorType } from '../../domain/types';
import { BadRequestError } from '../../domain/errors';

export class AcessarPontos {
  constructor(private readonly colaboradorRepository: ColaboradorRepository) {}

  async execute(input: InputType): Promise<OutputType> {
    const colaborador = await this.colaboradorRepository.buscar(
      input.codigoColaborador,
    );
    if (!colaborador) {
      const novoColaborador = new Colaborador(input.codigoColaborador);
      const codigoValido = novoColaborador.validarCodigo();
      if (!codigoValido) {
        throw new BadRequestError('codigo de colaborador inválido');
      }
      const dadosNovoColaborador = await this.colaboradorRepository.registrar(
        novoColaborador,
      );
      return { colaborador: dadosNovoColaborador };
    }
    return { colaborador };
  }
}

type InputType = {
  codigoColaborador: string;
};

type OutputType = {
  colaborador: ColaboradorType;
};
