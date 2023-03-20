import { describe, it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../../src/application/usecases';
import { RegistrarEntradaZodValidator } from '../../../src/validators/zod';
import { RegistrarEntradaController } from '../../../src/presentation/controllers';

describe('RegistrarEntradaController', () => {
  it('Deve retornar status code 400 caso dados obrigatórios não sejam enviados', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoMemoryRepository,
    );
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

  it('Deve retornar status code 404 caso colaborador não seja encontrado', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoMemoryRepository,
    );
    const validator = new RegistrarEntradaZodValidator();
    const registrarEntradaController = new RegistrarEntradaController(
      validator,
      registrarEntrada,
    );
    const requisicao = {
      body: { idColaborador: 'qualquer_outro_id' },
    };

    const output = await registrarEntradaController.handle(requisicao);

    expect(output.statusCode).toBe(404);
  });

  it('Deve retornar status code 201 caso dados obrigatórios sejam enviados', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoMemoryRepository = new PontoMemoryRepository();
    await colaboradorMemoryRepository.cadastrar({ codigo: '4SXXFMf' });
    const colaborador = await colaboradorMemoryRepository.buscarPorCodigo(
      '4SXXFMf',
    );
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoMemoryRepository,
    );
    const validator = new RegistrarEntradaZodValidator();
    const registrarEntradaController = new RegistrarEntradaController(
      validator,
      registrarEntrada,
    );
    const requisicao = {
      body: {
        idColaborador: colaborador?.id,
      },
    };

    const output = await registrarEntradaController.handle(requisicao);

    expect(output.statusCode).toBe(201);
    expect(output.data).toBe(null);
  });
});
