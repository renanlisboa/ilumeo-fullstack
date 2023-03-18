import { Colaborador } from '../../domain/types';

export interface ColaboradorRepository {
  get: (codigo: string) => Promise<Colaborador | null>;
  registrar: (
    dadosColaborador: Omit<Colaborador, 'id'>,
  ) => Promise<Colaborador>;
}
