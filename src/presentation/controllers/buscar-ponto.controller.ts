import { BuscarPonto } from '../../application/usecases';
import { HttpRequest, HttpResponse } from '../contracts';

export class BuscarPontoController {
  constructor(private readonly buscarPonto: BuscarPonto) {}

  async handle({ query }: HttpRequest): Promise<HttpResponse> {
    try {
      const data = await this.buscarPonto.execute(query.idColaborador);
      return {
        statusCode: 200,
        data,
      };
    } catch (error: any) {
      if (error?.name == 'NotFoundError') {
        return {
          statusCode: 404,
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
