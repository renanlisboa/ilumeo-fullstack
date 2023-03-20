import { AcessarPontosController } from '../../presentation/controllers';
import { AcessarPontos } from '../../application/usecases';
import { AcessarPontosZodValidator } from '../../validators/zod';
import { ColaboradorPrismaRepository } from '../../infra/repositories/prisma';
import { HttpRequest, HttpResponse } from '../../presentation/contracts';

const colaboradorPrismaRepository = new ColaboradorPrismaRepository();
const acessarPontos = new AcessarPontos(colaboradorPrismaRepository);
const acessarPontosZodValidator = new AcessarPontosZodValidator();
const acessarPontosController = new AcessarPontosController(
  acessarPontosZodValidator,
  acessarPontos,
);

export const makeAcessarPontoFactory = async (
  httpRequest: HttpRequest,
): Promise<HttpResponse> => {
  return await acessarPontosController.handle(httpRequest);
};
