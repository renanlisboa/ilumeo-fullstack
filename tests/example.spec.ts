import { describe, it, expect } from 'vitest';

export class Colaborador {
  constructor(readonly codigo: string) {}

  validarCodigo(): boolean {
    if (this.codigo.length == 0 || this.codigo.length > 20) {
      return false;
    }
    return true;
  }
}

describe('Colaborador', () => {
  it('deve validar se código possui entre 1 e 20 caracteres', () => {
    const codigo = '4SXXFMf';
    const colaborador = new Colaborador(codigo);

    const codigoValido = colaborador.validarCodigo();

    expect(codigoValido).toBeTruthy();
  });
});
