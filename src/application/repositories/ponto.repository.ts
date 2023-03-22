import { PontoType } from '../../domain/types';

export interface PontoRepository {
  registrarEntrada: (
    dadosPonto: Pick<PontoType, 'idColaborador'>,
  ) => Promise<void>;
  registrarSaida: (
    dadosPonto: Omit<PontoType, 'dataEntrada' | 'idColaborador'>,
  ) => Promise<void>;
  buscarPorId: (id: string) => Promise<PontoType | null>;
  buscarPorIdColaborador: (idColaborador: string) => Promise<PontoType | null>;
  listarPaginado: (query?: any) => Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }>;
  listar: (idColaborador: string) => Promise<PontoType[]>;
  remover: (id: string) => Promise<void>;
}
