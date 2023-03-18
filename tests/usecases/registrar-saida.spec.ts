import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/prisma';
import {
  RegistrarEntrada,
  RegistrarSaida,
} from '../../src/application/usecases';

it('Deve registrar data de saída', async () => {
  const pontoRepository = new PontoMemoryRepository();
  const registrarEntrada = new RegistrarEntrada(pontoRepository);
  const registrarSaida = new RegistrarSaida(pontoRepository);
  const inputPontoEntrada = {
    idColaborador: 'qualquer_id',
    dataEntrada: new Date('2023-03-18 08:00'),
  };
  await registrarEntrada.execute(inputPontoEntrada);
  const inputPontoSaida = {
    idColaborador: 'qualquer_id',
    dataSaida: new Date('2023-03-18 17:00'),
  };
  await registrarSaida.execute(inputPontoSaida);

  const ponto = await pontoRepository.buscarPorIdColaborador('qualquer_id');
  expect(ponto).not.toBeNull();
  expect(ponto?.dataEntrada).toEqual(inputPontoEntrada.dataEntrada);
  expect(ponto?.dataSaida).toEqual(inputPontoSaida.dataSaida);
});
