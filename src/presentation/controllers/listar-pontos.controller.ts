import { ListarPontos } from '../../application/usecases';
import { HttpRequest, HttpResponse } from '../contracts';

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
      return {
        statusCode: 500,
        data: null,
      };
    }
  }
}
