import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { ListarPontos } from '../../src/application/usecases';
import { HttpRequest, HttpResponse } from '../../src/presentation/contracts';
// import { ListarPontosController } from '../../src/presentation/controllers';

export class ListarPontosController {
  constructor(private readonly listarPontos: ListarPontos) {}

  async handle({ query }: HttpRequest): Promise<HttpResponse> {
    try {
      const data = await this.listarPontos.execute(query);
      return {
        statusCode: 200,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: null,
      };
    }
  }
}

it('Deve retornar status code 200 ao listar pontos', async () => {
  const pontoMemoryRepository = new PontoMemoryRepository();
  const listarPontos = new ListarPontos(pontoMemoryRepository);
  const listarPontosController = new ListarPontosController(listarPontos);
  const requisicao = {
    query: {
      pagina: 0,
      itensPorPagina: 10,
    },
  };

  const output = await listarPontosController.handle(requisicao);
  expect(output.statusCode).toBe(200);
});
