import { it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import {
  RegistrarEntrada,
  RegistrarSaida,
} from '../../../src/application/usecases';

it('Deve registrar data de saída', async () => {
  const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
  const pontoRepository = new PontoMemoryRepository();
  await colaboradorMemoryRepository.cadastrar({ codigo: '4SXXFMf' });
  const colaborador = await colaboradorMemoryRepository.buscarPorCodigo(
    '4SXXFMf',
  );
  if (colaborador) {
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoRepository,
    );
    const registrarSaida = new RegistrarSaida(pontoRepository);
    const inputPontoEntrada = {
      idColaborador: colaborador.id,
    };
    await registrarEntrada.execute(inputPontoEntrada);
    const pontos = await pontoRepository.listar();
    const data = new Date();
    data.setHours(data.getHours() + 1);
    const inputPontoSaida = {
      id: pontos[0].id,
      dataSaida: data,
    };
    await registrarSaida.execute(inputPontoSaida);

    const ponto = await pontoRepository.buscarPorId(pontos[0].id);
    expect(ponto).not.toBeNull();
    expect(ponto?.dataSaida).toEqual(inputPontoSaida.dataSaida);
  }
});
