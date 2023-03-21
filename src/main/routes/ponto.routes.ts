import { RouterAdapter, adaptRoute } from '../../adapters';
import {
  makeListarPontosFactory,
  makeBuscarPontoFactory,
  makeRegistrarEntradaFactory,
  makeRegistrarSaidaFactory,
} from '../factories';

const pontoRoutes = RouterAdapter();

pontoRoutes.get('/listar-pontos', adaptRoute(makeListarPontosFactory));
pontoRoutes.get('/buscar-ponto', adaptRoute(makeBuscarPontoFactory));
pontoRoutes.post('/registrar-entrada', adaptRoute(makeRegistrarEntradaFactory));
pontoRoutes.put('/registrar-saida/:id', adaptRoute(makeRegistrarSaidaFactory));

export default pontoRoutes;
