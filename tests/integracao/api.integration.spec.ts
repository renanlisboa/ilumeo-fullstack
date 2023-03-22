import { config as envConfig } from 'dotenv';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import axios from 'axios';

import {
  ColaboradorPrismaRepository,
  PontoPrismaRepository,
} from '../../src/infra/repositories/prisma';
import { prismaClient } from '../../src/infra/database/prisma-client';

beforeAll(() => {
  envConfig();
});

afterEach(async () => {
  await prismaClient.ponto.deleteMany();
  await prismaClient.colaborador.deleteMany();
});

describe('API', () => {
  it('POST /acessar-pontos', async () => {
    const codigoColaborador = 'codigo_valido';

    const { data } = await axios.post(`${process.env.API_URL}/acessar-pontos`, {
      codigoColaborador,
    });

    expect(data).not.toBeNull();
    expect(data.colaborador.codigo).toBe(codigoColaborador);
  });

  it('GET /listar-pontos', async () => {
    const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
    const colaborador = await colaboradorPrismaRepository.cadastrar({
      codigo: 'codigo_valido',
    });
    const searchParams = new URLSearchParams({
      idColaborador: colaborador.id,
    }).toString();

    const { data } = await axios.get(
      `${process.env.API_URL}/listar-pontos?${searchParams}`,
    );

    expect(data).not.toBeNull();
    expect(data.registros).toHaveLength(0);
    expect(data.totalRegistros).toBe(0);
  });

  it('GET /buscar-ponto', async () => {
    const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
    const colaborador = await colaboradorPrismaRepository.cadastrar({
      codigo: 'codigo_valido',
    });
    const pontoPrismaRepository = new PontoPrismaRepository();
    await pontoPrismaRepository.registrarEntrada({
      idColaborador: colaborador.id,
    });
    const searchParams = new URLSearchParams({
      idColaborador: colaborador.id,
    }).toString();

    const { data } = await axios.get(
      `${process.env.API_URL}/buscar-ponto?${searchParams}`,
    );

    expect(data).not.toBeNull();
    expect(data.dataSaida).toBeNull();
  });

  it('POST /registra-entrada', async () => {
    const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
    const colaborador = await colaboradorPrismaRepository.cadastrar({
      codigo: 'codigo_valido',
    });

    await axios.post(`${process.env.API_URL}/registrar-entrada`, {
      idColaborador: colaborador.id,
    });

    const pontoPrismaRepository = new PontoPrismaRepository();
    const ponto = await pontoPrismaRepository.buscarPorIdColaborador(
      colaborador.id,
    );
    expect(ponto).not.toBeNull();
    expect(ponto?.dataEntrada).not.toBeNull();
    expect(ponto?.dataSaida).toBeNull();
  });

  it('PUT /registrar-saida/:id', async () => {
    const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
    const colaborador = await colaboradorPrismaRepository.cadastrar({
      codigo: 'codigo_valido',
    });
    const pontoPrismaRepository = new PontoPrismaRepository();
    await pontoPrismaRepository.registrarEntrada({
      idColaborador: colaborador.id,
    });
    const pontoAberto = await pontoPrismaRepository.buscarPorIdColaborador(
      colaborador.id,
    );

    await axios.put(
      `${process.env.API_URL}/registrar-saida/${pontoAberto?.id}`,
      {
        dataSaida: new Date(),
      },
    );

    try {
      if (!pontoAberto) throw new Error();
      const pontoFechado = await pontoPrismaRepository.buscarPorId(
        pontoAberto.id,
      );
      expect(pontoFechado).not.toBeNull();
      expect(pontoFechado?.dataSaida).not.toBeNull();
    } catch (error) {
      expect(error).toEqual(Error);
    }
  });
});
