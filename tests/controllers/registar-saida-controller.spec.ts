import { describe, it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { RegistrarSaida } from '../../src/application/usecases';
import { RegistrarSaidaZodValidator } from '../../src/validators/zod';
import {
  HttpRequest,
  HttpResponse,
  Validator,
} from '../../src/presentation/contracts';
// import { RegistraSaidaController } from '../../src/presentation/controllers';

export class RegistraSaidaController {
  constructor(
    private readonly validator: Validator,
    private readonly registrarSaida: RegistrarSaida,
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      this.validator.validate(body);
      await this.registrarSaida.execute(body);
      return {
        statusCode: 201,
        data: null,
      };
    } catch (error: any) {
      if (error?.name == 'ZodError' || error?.name == 'BadRequestError') {
        return {
          statusCode: 400,
          data: error,
        };
      }
      if (error?.name == 'NotFoundError') {
        return {
          statusCode: 404,
          data: {
            name: error.name,
            message: error.message,
          },
        };
      }
      if (error?.name == 'ConflictError') {
        return {
          statusCode: 409,
          data: {
            name: error.name,
            message: error.message,
          },
        };
      }
      return {
        statusCode: 500,
        data: null,
      };
    }
  }
}

describe('RegistrarSaidaController', () => {
  it('Deve retornar status code 400 caso dados obrigatórios não sejam enviados', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registraSaidaController = new RegistraSaidaController(
      validator,
      registrarSaida,
    );
    const requisicao = {
      body: {},
    };

    const output = await registraSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(400);
  });

  it('Deve retornar status code 404 caso ponto não seja encontrado', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registraSaidaController = new RegistraSaidaController(
      validator,
      registrarSaida,
    );
    const requisicao = {
      body: {
        idColaborador: 'qualquer_id',
        dataSaida: new Date('2023-03-18 17:00'),
      },
    };

    const output = await registraSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(404);
    expect(output.data.name).toBe('NotFoundError');
    expect(output.data.message).toBe('ponto não encontrado');
  });

  it('Deve retornar status code 409 caso a data de saída seja igual ou menor que a de entrada', async () => {
    const pontoMemoryRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoMemoryRepository);
    const validator = new RegistrarSaidaZodValidator();
    const registraSaidaController = new RegistraSaidaController(
      validator,
      registrarSaida,
    );
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: 'qualquer_id',
      dataEntrada: new Date('2023-03-18 08:00'),
    });
    const requisicao = {
      body: {
        idColaborador: 'qualquer_id',
        dataSaida: new Date('2023-03-18 07:00'),
      },
    };

    const output = await registraSaidaController.handle(requisicao);

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
    const registraSaidaController = new RegistraSaidaController(
      validator,
      registrarSaida,
    );
    await pontoMemoryRepository.registrarEntrada({
      idColaborador: 'qualquer_id',
      dataEntrada: new Date('2023-03-18 08:00'),
    });
    const requisicao = {
      body: {
        idColaborador: 'qualquer_id',
        dataSaida: new Date('2023-03-18 17:00'),
      },
    };

    const output = await registraSaidaController.handle(requisicao);

    expect(output.statusCode).toBe(201);
    expect(output.data).toBe(null);
  });
});
