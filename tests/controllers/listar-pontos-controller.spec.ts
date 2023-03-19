import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { ListarPontos } from '../../src/application/usecases';
import { ListarPontosController } from '../../src/presentation/controllers';

it('Deve retornar status code 200 ao listar pontos', async () => {
  const pontoMemoryRepository = new PontoMemoryRepository();
  const listarPontos = new ListarPontos(pontoMemoryRepository);
  const listarPontosController = new ListarPontosController(listarPontos);
  const requisicao = {
    query: {
      pagina: 0,
      itensPorPagina: 10,
    },
  };

  const output = await listarPontosController.handle(requisicao);
  expect(output.statusCode).toBe(200);
});
