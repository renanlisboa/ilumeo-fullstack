export class Ponto {
  private readonly idColaborador: string;
  private readonly dataEntrada?: Date;
  dataSaida?: Date;

  constructor(body: PontoBody) {
    this.validarBody(body);
    this.idColaborador = body.idColaborador;
    this.dataEntrada = body.dataEntrada;
    this.dataSaida = body.dataSaida;
  }

  getDadosPonto(): PontoBody {
    return {
      idColaborador: this.idColaborador,
      dataEntrada: this.dataEntrada,
      dataSaida: this.dataSaida,
    };
  }

  setDataSaida(dataSaida: Date): void {
    this.validarHoraEntradaESaida(dataSaida);
    this.dataSaida = dataSaida;
  }

  validarBody(body: PontoBody): void {
    if (!body.idColaborador) throw new Error('colaborador_id é obrigatório');
    if (!body.dataEntrada && !body.dataSaida) {
      throw new Error('entrada ou saída é obrigatório');
    }
  }

  validarHoraEntradaESaida(dataSaida: Date): void {
    if (!this.dataEntrada) return;
    if (dataSaida <= this.dataEntrada) {
      throw new Error('data de entrada maior ou igual a data de saída');
    }
  }
}

type PontoBody = {
  idColaborador: string;
  dataEntrada?: Date;
  dataSaida?: Date;
};
