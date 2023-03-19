import { AcessarPontos } from '../../application/usecases';
import { HttpRequest, HttpResponse, Validator } from '../contracts';

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
