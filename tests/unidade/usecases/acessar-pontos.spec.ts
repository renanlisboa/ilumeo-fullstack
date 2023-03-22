import { describe, it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../../src/infra/repositories/memory';
import { AcessarPontos } from '../../../src/application/usecases';

describe('AcessarPontos', () => {
  it('Deve lançar um erro se o código do colaborador for inválido', async () => {
    const colaboradorRepository = new ColaboradorMemoryRepository();
    const acessarPontos = new AcessarPontos(colaboradorRepository);
    const input = {
      codigoColaborador: '',
    };

    acessarPontos
      .execute(input)
      .then()
      .catch(error => {
        expect(error.name).toBe('BadRequestError');
        expect(error.message).toBe('codigo de colaborador inválido');
      });
  });

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
});
