import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../src/application/usecases';
import {
  HttpRequest,
  HttpResponse,
  Validator,
} from '../../src/presentation/contracts';
import { RegistrarEntradaZodValidator } from '../../src/validators/zod';
// import { RegistrarEntradaController } from '../../src/presentation/controllers';

export class RegistrarEntradaController {
  constructor(
    private readonly validator: Validator,
    private readonly registrarEntrada: RegistrarEntrada,
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      this.validator.validate(body);
      await this.registrarEntrada.execute(body);
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
      return {
        statusCode: 500,
        data: null,
      };
    }
  }
}

it('Deve retornar status code 400 caso dados obrigatórios não sejam enviados', async () => {
  const pontoMemoryRepository = new PontoMemoryRepository();
  const registrarEntrada = new RegistrarEntrada(pontoMemoryRepository);
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
