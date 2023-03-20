import { z, Schema } from 'zod';

import { Validator } from '../../presentation/contracts';

export class RegistrarSaidaZodValidator implements Validator {
  private readonly schema: Schema;

  constructor() {
    this.schema = z.object({
      id: z.string(),
      dataSaida: z.string().transform(date => new Date(date)),
    });
  }

  validate(body: any): any {
    return this.schema.parse(body);
  }
}
