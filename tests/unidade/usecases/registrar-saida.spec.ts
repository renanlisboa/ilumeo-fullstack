import { describe, it, expect } from 'vitest';

import {
  ColaboradorMemoryRepository,
  PontoMemoryRepository,
} from '../../../src/infra/repositories/memory';
import {
  RegistrarEntrada,
  RegistrarSaida,
} from '../../../src/application/usecases';

describe('RegistrarSaida', () => {
  it('Deve lançar um erro caso a data de saída seja menor ou igual a data de entrada', async () => {
    const colaboradorMemoryRepository = new ColaboradorMemoryRepository();
    const pontoRepository = new PontoMemoryRepository();
    await colaboradorMemoryRepository.cadastrar({ codigo: '4SXXFMf' });
    const colaborador = await colaboradorMemoryRepository.buscarPorCodigo(
      '4SXXFMf',
    );
    try {
      if (!colaborador) throw new Error();
      const registrarEntrada = new RegistrarEntrada(
        colaboradorMemoryRepository,
        pontoRepository,
      );
      const inputPontoEntrada = {
        idColaborador: colaborador?.id,
      };
      await registrarEntrada.execute(inputPontoEntrada);
      const registrarSaida = new RegistrarSaida(pontoRepository);
      const ponto = await pontoRepository.buscarPorIdColaborador(
        colaborador?.id,
      );
      if (!ponto) throw new Error();
      const dataSaida = new Date();
      dataSaida.setHours(dataSaida.getHours() - 1);
      const inputPontoSaida = {
        id: ponto.id,
        dataSaida,
      };
      await registrarSaida.execute(inputPontoSaida);
    } catch (error: any) {
      expect(error.name).toBe('ConflictError');
      expect(error.message).toBe(
        'data de entrada maior ou igual a data de saída',
      );
    }
  });

  it('Deve lançar um erro ponto não seja encontrado', async () => {
    const pontoRepository = new PontoMemoryRepository();
    const registrarSaida = new RegistrarSaida(pontoRepository);
    const input = {
      id: 'qualquer_id',
      dataSaida: new Date(),
    };

    registrarSaida
      .execute(input)
      .then()
      .catch(error => {
        expect(error.name).toBe('NotFoundError');
        expect(error.message).toBe('ponto não encontrado');
      });
  });

  it('Deve registrar data de saída', async () => {
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
    const registrarSaida = new RegistrarSaida(pontoRepository);
    const inputPontoEntrada = {
      idColaborador: colaborador?.id,
    };
    await registrarEntrada.execute(inputPontoEntrada);
    try {
      if (!colaborador) throw Error();
      const ponto = await pontoRepository.buscarPorIdColaborador(
        colaborador?.id,
      );
      if (!ponto) throw Error();
      const data = new Date();
      data.setHours(data.getHours() + 1);
      const inputPontoSaida = {
        id: ponto.id,
        dataSaida: data,
      };
      await registrarSaida.execute(inputPontoSaida);

      const output = await pontoRepository.buscarPorId(ponto.id);
      expect(output?.dataSaida).toEqual(inputPontoSaida.dataSaida);
    } catch (error) {
      expect(error).toEqual(Error);
    }
  });
});
