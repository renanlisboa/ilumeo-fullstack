export type Colaborador = {
  id: string;
  codigo: string;
  pontos?: Array<{
    id: string;
    dataEntrada: string;
    dataSaida: string;
    tempoTrabalhado?: string;
  }>;
};
