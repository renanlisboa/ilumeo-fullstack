import { describe, it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import { RegistrarEntrada } from '../../../src/application/usecases';

describe('Colaborador', () => {
  it('Deve lançar um erro ao tentar registrar entrada sem id do colaborador', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoRepository = new PontoMemoryRepository();
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoRepository,
    );
    const input = {};

    registrarEntrada
      .execute(input)
      .then()
      .catch(error => {
        expect(error.name).toBe('BadRequestError');
        expect(error.message).toBe('código do colaborador é obrigatório');
      });
  });

  it('Deve lançar um erro ao tentar registrar entrada se já houver uma em aberto', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoRepository = new PontoMemoryRepository();
    await colaboradorMemoryRepository.cadastrar({ codigo: '4SXXFMf' });
    const colaborador = await colaboradorMemoryRepository.buscarPorCodigo(
      '4SXXFMf',
    );
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoRepository,
    );
    const input = {
      idColaborador: colaborador?.id,
    };
    await registrarEntrada.execute(input);

    registrarEntrada
      .execute(input)
      .then()
      .catch(error => {
        expect(error.name).toBe('ConflictError');
        expect(error.message).toBe('já existe um ponto em aberto');
      });
  });

  it('Deve ser possível registrar data de entrada', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoRepository = new PontoMemoryRepository();
    await colaboradorMemoryRepository.cadastrar({ codigo: '4SXXFMf' });
    const colaborador = await colaboradorMemoryRepository.buscarPorCodigo(
      '4SXXFMf',
    );
    const registrarEntrada = new RegistrarEntrada(
      colaboradorMemoryRepository,
      pontoRepository,
    );
    const input = {
      idColaborador: colaborador?.id,
    };

    await registrarEntrada.execute(input);

    const pontos = await pontoRepository.listar();
    expect(pontos).toHaveLength(1);
    expect(pontos[0].dataEntrada).not.toBeNull();
    expect(pontos[0].dataSaida).toBeNull();
  });
});
