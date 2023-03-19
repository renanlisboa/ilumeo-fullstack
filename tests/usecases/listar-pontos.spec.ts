import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { ListarPontos } from '../../src/application/usecases';

it('Colaborador deve ser registrado caso ainda não possua registro', async () => {
  const pontoMemoryRepository = new PontoMemoryRepository();
  const listarPontos = new ListarPontos(pontoMemoryRepository);
  const query = {
    pagina: 0,
    itensPorPagina: 10,
  };

  const resposta = await listarPontos.execute(query);

  expect(resposta.totalRegistros).toBeGreaterThanOrEqual(0);
  expect(resposta.totalRegistros).toBeLessThanOrEqual(10);
});
