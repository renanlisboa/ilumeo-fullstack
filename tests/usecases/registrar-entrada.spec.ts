import { describe, it, expect } from 'vitest';

import { PontoMemoryRepository } from '../../src/infra/repositories/prisma';
import { RegistrarEntrada } from '../../src/application/usecases';
import { PontoRepository } from '../../src/application/repositories';
import { Ponto } from '../../src/domain/entities';

class RegistrarSaida {
  constructor(private readonly pontoRepository: PontoRepository) {}

  async execute(input: InputType): Promise<void> {
    const ponto = await this.pontoRepository.buscarPorIdColaborador(
      input.idColaborador,
    );
    if (!ponto) throw new Error('Ponto não encontrado');
    const pontoAtualizado = new Ponto(ponto);
    pontoAtualizado.setDataSaida(input.dataSaida);
    const dadosPontoAtualizado = pontoAtualizado.getDadosPonto();
    await this.pontoRepository.registrarSaida(dadosPontoAtualizado);
  }
}

type InputType = {
  idColaborador: string;
  dataSaida: Date;
};

describe('RegistrarEntrada', () => {
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
});
