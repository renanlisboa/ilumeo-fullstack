import { PontoType } from '../../domain/types';

export interface PontoRepository {
  registrar: (dadosPonto: Omit<PontoType, 'id'>) => Promise<void>;
  listar: () => Promise<PontoType[]>;
}
