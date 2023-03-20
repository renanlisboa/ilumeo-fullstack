import { RegistrarSaidaController } from '../../presentation/controllers';
import { RegistrarSaidaZodValidator } from '../../validators/zod';
import { RegistrarSaida } from '../../application/usecases';
import { PontoPrismaRepository } from '../../infra/repositories/prisma';
import { HttpRequest, HttpResponse } from '../../presentation/contracts';

const pontoPrismaRepository = new PontoPrismaRepository();
const registrarSaida = new RegistrarSaida(pontoPrismaRepository);
const validator = new RegistrarSaidaZodValidator();
const registrarSaidaController = new RegistrarSaidaController(
  validator,
  registrarSaida,
);

export const makeRegistrarSaidaFactory = async (
  httpRequest: HttpRequest,
): Promise<HttpResponse> => {
  return await registrarSaidaController.handle(httpRequest);
};
