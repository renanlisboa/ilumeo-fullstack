import { z, Schema } from 'zod';

import { Validator } from '../../presentation/contracts';

export class RegistrarEntradaZodValidator implements Validator {
  private readonly schema: Schema;

  constructor() {
    this.schema = z.object({
      idColaborador: z.string(),
      dataEntrada: z.date(),
    });
  }

  validate(body: any): void {
    this.schema.parse(body);
  }
}
