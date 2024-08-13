import z from 'zod';
import { UserCreateDTO } from '@users/dtos/userCreateDTO';
import { Validator } from '@validators/validators';

export class UserCreateValidator {
  private createValidationScheme: z.AnyZodObject;
  private validator: Validator;

  constructor() {
    this.validator = new Validator();
    this.createValidationScheme = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      phoneNumber: z.string().min(10),
      password: z.string().min(4),
    }) satisfies z.ZodType<UserCreateDTO>;
  }

  validate() {
    return this.validator.validation({ body: this.createValidationScheme });
  }
}