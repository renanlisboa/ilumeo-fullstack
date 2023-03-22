import { describe, it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import { BuscarPonto } from '../../../src/application/usecases';
import { BuscarPontoController } from '../../../src/presentation/controllers';

describe('BuscarPontoController', () => {
  it('Deve retornar status code 404 caso ponto em aberto não seja encontrado', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const buscarPonto = new BuscarPonto(pontoMemoryRepository);
    const buscarPontoController = new BuscarPontoController(buscarPonto);
    const requisicao = {
      query: {
        idColaborador: 'qualquer_id',
      },
    };

    const output = await buscarPontoController.handle(requisicao);

    expect(output.statusCode).toBe(404);
  });

  it('Deve retornar status code 200 caso ponto em aberto seja encontrado', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoMemoryRepository = new PontoMemoryRepository();
    const colaborador = await colaboradorMemoryRepository.cadastrar({
      codigo: '4SXXFMf',
    });
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: colaborador?.id,
    });
    const buscarPonto = new BuscarPonto(pontoMemoryRepository);
    const buscarPontoController = new BuscarPontoController(buscarPonto);
    const requisicao = {
      query: {
        idColaborador: colaborador.id,
      },
    };
    const output = await buscarPontoController.handle(requisicao);

    expect(output.statusCode).toBe(200);
  });
});
