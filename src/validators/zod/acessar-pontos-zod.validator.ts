import { z } from 'zod';

export class AcessarPontosZodValidator {
  private readonly schema: any;

  constructor() {
    this.schema = z.object({
      codigoColaborador: z.string().min(1).max(20),
    });
  }

  validate(body: Body): any {
    this.schema.parse(body);
  }
}

type Body = {
  codigoColaborador: string;
};
