import { config as envConfig } from 'dotenv';
import { it, expect, beforeAll } from 'vitest';
import axios from 'axios';

import { ColaboradorPrismaRepository } from '../../src/infra/repositories/prisma';

beforeAll(() => {
  envConfig();
});

it('Deve retornar um colaborador registrado', async () => {
  const response = await axios.post(
    `${process.env.API_URL}/api/acessar-pontos`,
    {
      codigoColaborador: '4SXXFMf',
    },
  );

  expect(response.status).toBe(200);
  expect(response.data).not.toBeNull();
  const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
  await colaboradorPrismaRepository.remover(response.data.colaborador.id);
});
