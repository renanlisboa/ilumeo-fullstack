import { RegistrarEntradaController } from '../../presentation/controllers';
import { RegistrarEntradaZodValidator } from '../../validators/zod';
import { RegistrarEntrada } from '../../application/usecases';
import {
  ColaboradorPrismaRepository,
  PontoPrismaRepository,
} from '../../infra/repositories/prisma';
import { HttpRequest, HttpResponse } from '../../presentation/contracts';

const colaboradorMemoryRepository = new ColaboradorPrismaRepository();
const pontoPrismaRepository = new PontoPrismaRepository();
const registrarEntrada = new RegistrarEntrada(
  colaboradorMemoryRepository,
  pontoPrismaRepository,
);
const validator = new RegistrarEntradaZodValidator();
const registrarEntradaController = new RegistrarEntradaController(
  validator,
  registrarEntrada,
);

export const makeRegistrarEntradaFactory = async (
  httpRequest: HttpRequest,
): Promise<HttpResponse> => {
  return await registrarEntradaController.handle(httpRequest);
};
