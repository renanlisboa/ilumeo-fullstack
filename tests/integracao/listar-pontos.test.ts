import { config as envConfig } from 'dotenv';
import { it, expect, beforeAll } from 'vitest';
import axios from 'axios';

import {
  PontoPrismaRepository,
  ColaboradorPrismaRepository,
} from '../../src/infra/repositories/prisma';

beforeAll(() => {
  envConfig();
});

it('Deve retornar uma lista de pontos paginada', async () => {
  const { data: dadosColaborador } = await axios.post(
    `${process.env.API_URL}/api/acessar-pontos`,
    {
      codigoColaborador: '5SYYFMf',
    },
  );
  await axios.post(`${process.env.API_URL}/api/registrar-entrada`, {
    idColaborador: dadosColaborador.colaborador.id,
  });

  const { status, data: dadosListagem } = await axios.get(
    `${process.env.API_URL}/api/listar-pontos?idColaborador=${dadosColaborador.colaborador.id}`,
  );

  expect(status).toBe(200);

  const pontoPrismaRepository = new PontoPrismaRepository();
  await pontoPrismaRepository.remover(dadosListagem.registros[0].id);
  const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
  await colaboradorPrismaRepository.remover(dadosColaborador.colaborador.id);
});
