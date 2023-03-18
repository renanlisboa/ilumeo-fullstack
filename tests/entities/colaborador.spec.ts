import { describe, it, expect } from 'vitest';

import { Colaborador } from '../../src/entities';

describe('Colaborador', () => {
  it('deve validar se código possui entre 1 e 20 caracteres', () => {
    const codigo = '4SXXFMf';
    const colaborador = new Colaborador(codigo);

    const codigoValido = colaborador.validarCodigo();

    expect(codigoValido).toBeTruthy();
  });
});
