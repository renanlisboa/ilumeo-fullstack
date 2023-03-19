import { PontoType } from '../../domain/types';

export interface PontoRepository {
  registrarEntrada: (
    dadosPonto: Omit<PontoType, 'id' | 'dataSaida'>,
  ) => Promise<void>;
  registrarSaida: (dadosPonto: Omit<PontoType, 'dataEntrada'>) => Promise<void>;
  buscarPorIdColaborador: (idColaborador: string) => Promise<PontoType | null>;
  listarPaginado: (filtro: {
    pagina: number;
    itensPorPagina: number;
  }) => Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }>;
  listar: () => Promise<PontoType[]>;
}
