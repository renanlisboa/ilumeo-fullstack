import { describe, it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import { BuscarPonto } from '../../../src/application/usecases';

describe('BuscarPonto', () => {
  it('Deve retornar lançar erro caso não haja ponto em aberto', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const colaborador = await colaboradorMemoryRepository.cadastrar({
      codigo: '4SXXFMf',
    });
    const pontoMemoryRepository = new PontoMemoryRepository();
    const buscarPontos = new BuscarPonto(pontoMemoryRepository);

    buscarPontos
      .execute(colaborador.id)
      .then()
      .catch(error => {
        expect(error.name).toBe('NotFoundError');
        expect(error.message).toBe('ponto em aberto não encontrado');
      });
  });

  it('Deve retornar ponto em aberto se encontrado', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const colaborador = await colaboradorMemoryRepository.cadastrar({
      codigo: '4SXXFMf',
    });
    const pontoMemoryRepository = new PontoMemoryRepository();
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: colaborador.id,
    });
    const buscarPontos = new BuscarPonto(pontoMemoryRepository);

    const ponto = await buscarPontos.execute(colaborador.id);

    expect(ponto).not.toBeNull();
  });
});
