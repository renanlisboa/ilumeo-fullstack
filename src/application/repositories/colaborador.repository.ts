import { ColaboradorType } from '../../domain/types';

export interface ColaboradorRepository {
  buscarPorId: (id: string) => Promise<ColaboradorType | null>;
  buscarPorCodigo: (codigo: string) => Promise<ColaboradorType | null>;
  cadastrar: (
    dadosColaborador: Pick<ColaboradorType, 'codigo'>,
  ) => Promise<ColaboradorType>;
  remover: (id: string) => Promise<void>;
}
