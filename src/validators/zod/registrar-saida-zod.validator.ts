import { z, Schema } from 'zod';

import { Validator } from '../../presentation/contracts';

export class RegistrarSaidaZodValidator implements Validator {
  private readonly schema: Schema;

  constructor() {
    this.schema = z.object({
      idColaborador: z.string(),
      dataSaida: z.date(),
    });
  }

  validate(body: any): void {
    this.schema.parse(body);
  }
}
