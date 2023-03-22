import { describe, it, expect } from 'vitest';

import { PontoEntrada } from '../../../src/domain/entities';

describe('PontoEntrada', () => {
  it('Deve lançar uma exceção ao instânciar ponto com dado inválido', () => {
    const body = {
      idColaborador: '',
    };

    const ponto = (): PontoEntrada => new PontoEntrada(body);

    expect(ponto).toThrowError();
  });
});
