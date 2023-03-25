import { RouterAdapter, adaptRoute } from '../../adapters';
import {
  makeListarPontosFactory,
  makeBuscarPontoFactory,
  makeRegistrarEntradaFactory,
  makeRegistrarSaidaFactory,
} from '../factories';

const pontoRoutes = RouterAdapter();

pontoRoutes.get('/stream', (request, response) => {
  const buscarPonto = makeBuscarPontoFactory(request);
  buscarPonto
    .then(({ data }) => {
      response.setHeader('Content-Type', 'text/event-stream');
      response.setHeader('Cache-Control', 'no-cache');
      response.setHeader('Connection', 'keep-alive');
      const interval = setInterval(async () => {
        response.write('event: message\n');
        response.write(`data: ${JSON.stringify(data)}`);
        response.write('\n\n');
      }, 5000);
      response.on('close', () => {
        clearInterval(interval);
      });
    })
    .catch(err => {
      console.log(err);
    });
});
pontoRoutes.get('/listar-pontos', adaptRoute(makeListarPontosFactory));
pontoRoutes.get('/buscar-ponto', adaptRoute(makeBuscarPontoFactory));
pontoRoutes.post('/registrar-entrada', adaptRoute(makeRegistrarEntradaFactory));
pontoRoutes.put('/registrar-saida/:id', adaptRoute(makeRegistrarSaidaFactory));

export default pontoRoutes;
