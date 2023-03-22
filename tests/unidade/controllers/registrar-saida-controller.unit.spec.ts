import { describe, it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../../src/infra/repositories/memory';
import { RegistrarSaida } from '../../../src/application/usecases';
import { RegistrarSaidaZodValidator } from '../../../src/validators/zod';
import { RegistrarSaidaController } from '../../../src/presentation/controllers';

describe('RegistrarSaidaController', () => {
  it('Deve retornar status code 400 caso dados obrigatórios não sejam enviados', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registrarSaidaController = new RegistrarSaidaController(
      validator,
      registrarSaida,
    );
    const requisicao = {
      body: {},
    };

    const output = await registrarSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(400);
  });

  it('Deve retornar status code 404 caso ponto não seja encontrado', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registrarSaidaController = new RegistrarSaidaController(
      validator,
      registrarSaida,
    );
    const requisicao = {
      params: {
        id: 'qualquer_id',
      },
      body: {
        dataSaida: new Date().toISOString(),
      },
    };

    const output = await registrarSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(404);
    expect(output.data.name).toBe('NotFoundError');
    expect(output.data.message).toBe('ponto não encontrado');
  });

  it('Deve retornar status code 409 caso a data de saída seja igual ou menor que a de entrada', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registrarSaidaController = new RegistrarSaidaController(
      validator,
      registrarSaida,
    );
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: 'qualquer_id',
    });
    const pontos = await pontoMemoryRepository.listar();
    const data = new Date();
    data.setHours(data.getHours() - 1);
    const requisicao = {
      params: {
        id: pontos[0].id,
      },
      body: {
        dataSaida: data.toISOString(),
      },
    };

    const output = await registrarSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(409);
    expect(output.data.name).toBe('ConflictError');
    expect(output.data.message).toBe(
      'data de entrada maior ou igual a data de saída',
    );
  });

  it('Deve retornar status code 200 caso dados corretos sejam enviados', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registrarSaidaController = new RegistrarSaidaController(
      validator,
      registrarSaida,
    );
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: 'qualquer_id',
    });
    const pontos = await pontoMemoryRepository.listar();
    const data = new Date();
    data.setHours(data.getHours() + 1);
    const requisicao = {
      params: {
        id: pontos[0].id,
      },
      body: {
        dataSaida: data.toISOString(),
      },
    };

    const output = await registrarSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(201);
    expect(output.data).toBe(null);
  });
});
