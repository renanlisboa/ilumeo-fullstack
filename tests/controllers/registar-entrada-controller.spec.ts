import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../src/application/usecases';
import { RegistrarEntradaZodValidator } from '../../src/validators/zod';
import { RegistrarEntradaController } from '../../src/presentation/controllers';

it('Deve retornar status code 400 caso dados obrigatórios não sejam enviados', async () => {
  const pontoMemoryRepository = new PontoMemoryRepository();
  const registrarEntrada = new RegistrarEntrada(pontoMemoryRepository);
  const validator = new RegistrarEntradaZodValidator();
  const registrarEntradaController = new RegistrarEntradaController(
    validator,
    registrarEntrada,
  );
  const requisicao = {
    body: {},
  };

  const output = await registrarEntradaController.handle(requisicao);

  expect(output.statusCode).toBe(400);
});
