import { prismaClient } from '../../database/prisma/prisma-client';
import { ColaboradorRepository } from '../../../application/repositories';
import { ColaboradorType } from '../../../domain/types';

export class ColaboradorPrismaRepository implements ColaboradorRepository {
  async buscarPorCodigo(codigo: string): Promise<ColaboradorType | null> {
    return await prismaClient.colaborador.findUnique({
      where: { codigo },
    });
  }

  async buscarPorId(id: string): Promise<ColaboradorType | null> {
    return await prismaClient.colaborador.findUnique({
      where: { id },
    });
  }

  async cadastrar(
    dadosColaborador: Omit<ColaboradorType, 'id'>,
  ): Promise<ColaboradorType> {
    return await prismaClient.colaborador.create({
      data: dadosColaborador,
    });
  }

  async remover(id: string): Promise<void> {
    await prismaClient.colaborador.delete({ where: { id } });
  }
}
