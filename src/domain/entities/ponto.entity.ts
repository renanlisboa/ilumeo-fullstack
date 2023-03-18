export class Ponto {
  private readonly colaboradorId: string;
  private readonly entrada?: Date;
  private saida?: Date;

  constructor(body: PontoBody) {
    this.validarBody(body);
    this.colaboradorId = body.colaboradorId;
    this.entrada = body.entrada;
    this.saida = body.saida;
  }

  getData(): PontoBody {
    return {
      colaboradorId: this.colaboradorId,
      entrada: this.entrada,
      saida: this.saida,
    };
  }

  setSaida(saida: Date): void {
    this.validarHoraEntradaESaida(saida);
    this.saida = saida;
  }

  validarBody(body: PontoBody): void {
    if (!body.colaboradorId) throw new Error('colaborador_id é obrigatório');
    if (!body.entrada && !body.saida) {
      throw new Error('entrada ou saída é obrigatório');
    }
  }

  validarHoraEntradaESaida(saida: Date): void {
    if (!this.entrada) return;
    if (saida <= this.entrada) {
      throw new Error('data de entrada maior ou igual a data de saída');
    }
  }
}

type PontoBody = {
  colaboradorId: string;
  entrada?: Date;
  saida?: Date;
};
