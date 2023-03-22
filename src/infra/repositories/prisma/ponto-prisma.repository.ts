import { prismaClient } from '../../database/prisma-client';
import { PontoRepository } from '../../../application/repositories';
import { PontoType } from '../../../domain/types';

export class PontoPrismaRepository implements PontoRepository {
  async registrarEntrada(
    dadosPonto: Pick<PontoType, 'idColaborador'>,
  ): Promise<void> {
    await prismaClient.ponto.create({ data: dadosPonto });
  }

  async registrarSaida(
    dadosPonto: Omit<PontoType, 'dataEntrada' | 'idColaborador'>,
  ): Promise<void> {
    await prismaClient.ponto.update({
      where: { id: dadosPonto.id },
      data: dadosPonto,
    });
  }

  async buscarPorId(id: string): Promise<PontoType | null> {
    return await prismaClient.ponto.findUnique({
      where: { id },
    });
  }

  async buscarPorIdColaborador(
    idColaborador: string,
  ): Promise<PontoType | null> {
    return await prismaClient.ponto.findFirst({
      where: { idColaborador, dataSaida: null },
    });
  }

  async listarPaginado(query?: any): Promise<{
    totalRegistros: number;
    registros: PontoType[];
  }> {
    let offset = 0;
    let limit = 8;
    if (query?.pagina && query?.itensPorPagina) {
      const pagina = parseInt(query.pagina) - 1;
      const itensPorPagina = parseInt(query.itensPorPagina);
      limit = itensPorPagina;
      offset = pagina > 0 ? pagina * itensPorPagina : 0;
    }
    delete query.pagina;
    delete query.itensPorPagina;
    const data = await prismaClient.$transaction([
      prismaClient.ponto.count({
        where: { ...query, NOT: [{ dataSaida: null }] },
      }),
      prismaClient.ponto.findMany({
        where: { ...query, NOT: [{ dataSaida: null }] },
        skip: offset,
        take: limit,
        orderBy: { dataEntrada: 'desc' },
      }),
    ]);
    return {
      totalRegistros: data[0],
      registros: data[1],
    };
  }

  async listar(): Promise<PontoType[]> {
    return await prismaClient.ponto.findMany();
  }

  async remover(id: string): Promise<void> {
    await prismaClient.ponto.delete({ where: { id } });
  }
}
