import { BuscarPontoController } from '../../presentation/controllers';
import { BuscarPonto } from '../../application/usecases';
import { PontoPrismaRepository } from '../../infra/repositories/prisma';
import { HttpRequest, HttpResponse } from '../../presentation/contracts';

const pontoPrismaRepository = new PontoPrismaRepository();
const buscarPonto = new BuscarPonto(pontoPrismaRepository);
const buscarPontoController = new BuscarPontoController(buscarPonto);

export const makeBuscarPontoFactory = async (
  httpRequest: HttpRequest,
): Promise<HttpResponse> => {
  return await buscarPontoController.handle(httpRequest);
};
