import { it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../../src/application/usecases';

it('Deve ser possível registrar data de entrada', async () => {
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
    const input = {
      idColaborador: colaborador.id,
    };

    await registrarEntrada.execute(input);

    const pontos = await pontoRepository.listar();
    expect(pontos).toHaveLength(1);
    expect(pontos[0].dataEntrada).not.toBeNull();
    expect(pontos[0].dataSaida).toBeNull();
  }
});
