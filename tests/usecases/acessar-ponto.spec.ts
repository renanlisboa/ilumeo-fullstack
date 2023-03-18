import { describe, it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../src/infra/repositories/prisma';
import { AcessarPonto } from '../../src/application/usecases';

describe('AcessarPonto', () => {
  it('Colaborador deve ser registrado caso ainda não possua registro', async () => {
    const pontoRepository = new ColaboradorMemoryRepository();
    const acessarPonto = new AcessarPonto(pontoRepository);
    const input = {
      codigoColaborador: '4SXXFMf',
    };

    const output = await acessarPonto.execute(input);

    expect(output.colaborador).toBeDefined();
    expect(output.colaborador.codigo).toBe('4SXXFMf');
    expect(output.colaborador.pontos).toHaveLength(0);
  });
});
