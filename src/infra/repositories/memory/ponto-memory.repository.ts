import crypto from 'crypto';

import { PontoRepository } from '../../../application/repositories';
import { PontoType } from '../../../domain/types';

export class PontoMemoryRepository implements PontoRepository {
  pontos: PontoType[];

  constructor() {
    this.pontos = [];
  }

  async registrarEntrada(
    dadosPonto: Omit<PontoType, 'id' | 'dataSaida'>,
  ): Promise<void> {
    const ponto = {
      ...dadosPonto,
      id: crypto.randomUUID(),
    };
    this.pontos.push(ponto);
  }

  async registrarSaida(
    dadosPonto: Omit<PontoType, 'dataEntrada'>,
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

  async buscarPorIdColaborador(
    idColaborador: string,
  ): Promise<PontoType | null> {
    const ponto = this.pontos.find(
      ponto => ponto.idColaborador == idColaborador,
    );
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
