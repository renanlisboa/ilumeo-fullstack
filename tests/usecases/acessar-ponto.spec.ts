import { describe, it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../src/infra/prisma';
import { AcessarPonto } from '../../src/application/usecases';

describe('AcessarPonto', () => {
  it('Colaborador deve registrado no primeiro acesso', async () => {
    const pontoRepository = new ColaboradorMemoryRepository();
    const acessarPonto = new AcessarPonto(pontoRepository);
    const input = {
      codigoColaborador: '4SXXFMf',
    };

    const output = await acessarPonto.execute(input);

    expect(output.colaboradorId).toBeDefined();
    expect(output.codigoColaborador).toBe('4SXXFMf');
  });
});
