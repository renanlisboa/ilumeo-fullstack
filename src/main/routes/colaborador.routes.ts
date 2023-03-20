import { RouterAdapter, adaptRoute } from '../../adapters';
import { makeAcessarPontoFactory } from '../factories';

const colaboradorRoutes = RouterAdapter();

colaboradorRoutes.post('/acessar-pontos', adaptRoute(makeAcessarPontoFactory));

export default colaboradorRoutes;
