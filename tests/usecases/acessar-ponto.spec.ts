import crypto from 'crypto';
import { it, expect } from 'vitest';

type Colaborador = {
  id: string;
  codigo: string;
};

type InputType = {
  codigoColaborador: string;
};

type OutputType = {
  colaboradorId?: string;
  codigoColaborador: string;
};

export class AcessarPonto {
  constructor(private readonly colaboradorRepository: ColaboradorRepository) {}

  async execute(input: InputType): Promise<OutputType | null> {
    const colaborador = await this.colaboradorRepository.get(
      input.codigoColaborador,
    );
    if (!colaborador) {
      const dadosNovoColaborador = {
        codigo: input.codigoColaborador,
      };
      const novoColaborador = await this.colaboradorRepository.registrar(
        dadosNovoColaborador,
      );
      return {
        colaboradorId: novoColaborador.id,
        codigoColaborador: novoColaborador.codigo,
      };
    }
    return {
      colaboradorId: colaborador.id,
      codigoColaborador: colaborador.codigo,
    };
  }
}

interface ColaboradorRepository {
  get: (codigo: string) => Promise<Colaborador | null>;
  registrar: (
    dadosColaborador: Omit<Colaborador, 'id'>,
  ) => Promise<Colaborador>;
}

export class ColaboradorMemoryRepository {
  colaboradores: Colaborador[];

  constructor() {
    this.colaboradores = [];
  }

  async get(codigo: string): Promise<Colaborador | null> {
    const colaborador = this.colaboradores.find(
      colaborador => colaborador.codigo == codigo,
    );
    if (!colaborador) return null;
    return colaborador;
  }

  async registrar(
    dadosColaborador: Omit<Colaborador, 'id'>,
  ): Promise<Colaborador> {
    const colaborador = {
      ...dadosColaborador,
      id: crypto.randomUUID(),
    };
    this.colaboradores.push(colaborador);
    return colaborador;
  }
}

it('Colaborador deve registrado no primeiro acesso', async () => {
  const pontoRepository = new ColaboradorMemoryRepository();
  const acessarPonto = new AcessarPonto(pontoRepository);
  const input = {
    codigoColaborador: '4SXXFMf',
  };

  const output = await acessarPonto.execute(input);

  expect(output?.colaboradorId).toBeDefined();
  expect(output?.codigoColaborador).toBe('4SXXFMf');
});
