import { RouterAdapter, adaptRoute } from '../../adapters';
import {
  makeListarPontosFactory,
  makeRegistrarEntradaFactory,
  makeRegistrarSaidaFactory,
} from '../factories';

const pontoRoutes = RouterAdapter();

pontoRoutes.get('/listar-pontos', adaptRoute(makeListarPontosFactory));
pontoRoutes.post('/registrar-entrada', adaptRoute(makeRegistrarEntradaFactory));
pontoRoutes.post('/registrar-saida', adaptRoute(makeRegistrarSaidaFactory));

export default pontoRoutes;
