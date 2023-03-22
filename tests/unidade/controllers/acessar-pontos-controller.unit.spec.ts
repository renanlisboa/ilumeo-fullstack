import { describe, it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../../src/infra/repositories/memory';
import { AcessarPontos } from '../../../src/application/usecases';
import { AcessarPontosZodValidator } from '../../../src/validators/zod';
import { AcessarPontosController } from '../../../src/presentation/controllers';

describe('AcessarPontosController', () => {
  it('Deve retornar status 400 se o código do colaborador for inválido', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const acessarPontos = new AcessarPontos(colaboradorMemoryRepository);
    const validator = new AcessarPontosZodValidator();
    const acessarPontosController = new AcessarPontosController(
      validator,
      acessarPontos,
    );
    const requisicao = {
      body: {
        codigoColaborador: '',
      },
    };

    const output = await acessarPontosController.handle(requisicao);

    expect(output.statusCode).toBe(400);
  });

  it('Deve retornar status 200 se o código do colaborador for válido', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const acessarPontos = new AcessarPontos(colaboradorMemoryRepository);
    const validator = new AcessarPontosZodValidator();
    const acessarPontosController = new AcessarPontosController(
      validator,
      acessarPontos,
    );
    const requisicao = {
      body: {
        codigoColaborador: '4SXXFMf',
      },
    };

    const output = await acessarPontosController.handle(requisicao);

    expect(output.statusCode).toBe(200);
  });
});
