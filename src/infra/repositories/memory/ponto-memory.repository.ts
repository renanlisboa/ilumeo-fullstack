import crypto from 'crypto';

import { PontoRepository } from '../../../application/repositories';
import { PontoType } from '../../../domain/types';

export class PontoMemoryRepository implements PontoRepository {
  pontos: PontoType[];

  constructor() {
    this.pontos = [];
  }

  async registrarEntrada(
    dadosPonto: Pick<PontoType, 'idColaborador'>,
  ): Promise<void> {
    const ponto = {
      ...dadosPonto,
      dataEntrada: new Date(),
      dataSaida: null,
      id: crypto.randomUUID(),
    };
    this.pontos.push(ponto);
  }

  async registrarSaida(
    dadosPonto: Omit<PontoType, 'dataEntrada' | 'idColaborador'>,
  ): Promise<void> {
    const pontosAtualizados = this.pontos.map(ponto =>
      ponto.id == dadosPonto.id
        ? {
            ...ponto,
            dataSaida: dadosPonto.dataSaida,
          }
        : ponto,
    );
    this.pontos = pontosAtualizados;
  }

  async buscarPorId(id: string): Promise<PontoType | null> {
    const ponto = this.pontos.find(ponto => ponto.id == id);
    if (!ponto) return null;
    return ponto;
  }

  async listarPaginado(query?: any): Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }> {
    let indiceInicial = 0;
    let indiceFinal = 10;
    if (query?.pagina && query?.itensPorPagina) {
      const pagina = parseInt(query.pagina);
      const itensPorPagina = parseInt(query.itensPorPagina);
      indiceInicial = pagina > 0 ? pagina * itensPorPagina : 0;
      indiceFinal = pagina > 0 ? (pagina + 1) * itensPorPagina : itensPorPagina;
    }
    const registros = this.pontos.slice(indiceInicial, indiceFinal);
    return {
      totalRegistros: registros.length,
      registros,
    };
  }

  async listar(): Promise<PontoType[]> {
    return this.pontos;
  }
}
