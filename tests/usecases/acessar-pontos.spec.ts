import { it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../src/infra/repositories/memory';
import { AcessarPontos } from '../../src/application/usecases';

it('Colaborador deve ser registrado caso ainda não possua registro', async () => {
  const colaboradorRepository = new ColaboradorMemoryRepository();
  const acessarPontos = new AcessarPontos(colaboradorRepository);
  const input = {
    codigoColaborador: '4SXXFMf',
  };

  const output = await acessarPontos.execute(input);

  expect(output.colaborador).toBeDefined();
  expect(output.colaborador.codigo).toBe('4SXXFMf');
});
