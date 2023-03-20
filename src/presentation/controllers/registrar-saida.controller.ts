import { RegistrarSaida } from '../../application/usecases';
import { HttpRequest, HttpResponse, Validator } from '../contracts';

export class RegistrarSaidaController {
  constructor(
    private readonly validator: Validator,
    private readonly registrarSaida: RegistrarSaida,
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const dadosValidados = this.validator.validate(body);
      await this.registrarSaida.execute(dadosValidados);
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
