import { it, expect } from 'vitest';

import { ColaboradorMemoryRepository } from '../../src/infra/repositories/memory';
import { AcessarPontos } from '../../src/application/usecases';
import { z } from 'zod';

export type HttpRequest = {
  params?: any;
  query?: Record<string, string>;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  data: any;
};

export interface Validator {
  validate: (body: any) => any;
}

export class AcessarPontosZodValidator {
  private readonly schema: any;

  constructor() {
    this.schema = z.object({
      codigoColaborador: z.string().min(1).max(20),
    });
  }

  validate(body: { codigoColaborador: string }): any {
    this.schema.parse(body);
  }
}

export class AcessarPontosController {
  constructor(
    private readonly validator: Validator,
    private readonly acessarPontos: AcessarPontos,
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      this.validator.validate(body);
      const data = await this.acessarPontos.execute(body);
      return {
        statusCode: 200,
        data,
      };
    } catch (error: any) {
      if (error?.name == 'ZodError' || error?.name == 'BadRequestError') {
        return {
          statusCode: 400,
          data: null,
        };
      }
      return {
        statusCode: 500,
        data: null,
      };
    }
  }
}

it('Deve retornar status 400 se o código do colaborador for inválido', async () => {
  const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
  const acessarPontos = new AcessarPontos(colaboradorMemoryRepository);
  const validator = new AcessarPontosZodValidator();
  const acessarPontosController = new AcessarPontosController(
    validator,
    acessarPontos,
  );
  const requisicao = {
    body: {
      codigoColaborador: '',
    },
  };

  const output = await acessarPontosController.handle(requisicao);

  expect(output.statusCode).toBe(400);
  expect(output.data).toBe(null);
});
