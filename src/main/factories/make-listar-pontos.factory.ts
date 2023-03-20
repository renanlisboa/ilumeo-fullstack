import { ListarPontosController } from '../../presentation/controllers';
import { ListarPontos } from '../../application/usecases';
import { PontoPrismaRepository } from '../../infra/repositories/prisma';
import { HttpRequest, HttpResponse } from '../../presentation/contracts';

const pontoPrismaRepository = new PontoPrismaRepository();
const listarPontos = new ListarPontos(pontoPrismaRepository);
const listarPontosController = new ListarPontosController(listarPontos);

export const makeListarPontosFactory = async (
  httpRequest: HttpRequest,
): Promise<HttpResponse> => {
  return await listarPontosController.handle(httpRequest);
};
