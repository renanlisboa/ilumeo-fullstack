import { ColaboradorType } from '../../domain/types';

export interface ColaboradorRepository {
  buscar: (codigo: string) => Promise<ColaboradorType | null>;
  registrar: (
    dadosColaborador: Pick<ColaboradorType, 'codigo'>,
  ) => Promise<ColaboradorType>;
}
