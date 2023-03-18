export class Colaborador {
  constructor(readonly codigo: string) {}

  validarCodigo(): boolean {
    if (this.codigo.length == 0 || this.codigo.length > 20) {
      return false;
    }
    return true;
  }
}
