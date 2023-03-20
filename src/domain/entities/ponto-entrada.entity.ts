import { BadRequestError } from '../errors';

export class PontoEntrada {
  private readonly idColaborador: string;

  constructor(body: PontoBody) {
    this.validarBody(body);
    this.idColaborador = body.idColaborador;
  }

  getDadosPonto(): PontoBody {
    return {
      idColaborador: this.idColaborador,
    };
  }

  validarBody(body: PontoBody): void {
    if (!body.idColaborador) {
      throw new BadRequestError('colaborador_id é obrigatório');
    }
  }
}

type PontoBody = {
  idColaborador: string;
};
