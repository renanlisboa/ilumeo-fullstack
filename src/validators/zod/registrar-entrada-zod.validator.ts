import { z, Schema } from 'zod';

import { Validator } from '../../presentation/contracts';

export class RegistrarEntradaZodValidator implements Validator {
  private readonly schema: Schema;

  constructor() {
    this.schema = z.object({
      idColaborador: z.string(),
    });
  }

  validate(body: any): any {
    return this.schema.parse(body);
  }
}
