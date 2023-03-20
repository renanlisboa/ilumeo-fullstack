import { BadRequestError, ConflictError } from '../errors';

export class PontoSaida {
  private readonly id: string;
  dataEntrada: Date | null;
  dataSaida: Date | null;

  constructor(body: PontoBody) {
    this.validarBody(body);
    this.id = body.id;
    this.dataSaida = body.dataSaida;
    this.dataEntrada = body.dataEntrada;
    this.dataSaida = body.dataSaida;
  }

  getDadosPonto(): PontoBody {
    return {
      id: this.id,
      dataEntrada: this.dataEntrada,
      dataSaida: this.dataSaida,
    };
  }

  validarBody(body: PontoBody): void {
    if (!body.id || !body.dataSaida) {
      throw new BadRequestError('id e data de saída são obrigatórios');
    }
  }

  validarHoraEntradaESaida(): void {
    if (!this.dataEntrada || !this.dataSaida) return;
    if (this.dataSaida <= this.dataEntrada) {
      throw new ConflictError('data de entrada maior ou igual a data de saída');
    }
  }
}

type PontoBody = {
  id: string;
  dataEntrada: Date | null;
  dataSaida: Date | null;
};
