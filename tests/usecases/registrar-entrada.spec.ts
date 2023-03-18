import { it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../src/application/usecases';

it('Deve ser possível registrar data de entrada', async () => {
  const pontoRepository = new PontoMemoryRepository();
  const registrarEntrada = new RegistrarEntrada(pontoRepository);
  const input = {
    idColaborador: 'qualquer_id',
    dataEntrada: new Date(),
  };

  await registrarEntrada.execute(input);

  const pontos = await pontoRepository.listar();
  expect(pontos).toHaveLength(1);
  expect(pontos[0].dataEntrada).toBeDefined();
  expect(pontos[0].dataSaida).not.toBeDefined();
});
