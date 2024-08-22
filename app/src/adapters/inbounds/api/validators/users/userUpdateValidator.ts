import z from 'zod';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { Validator } from '@validators/validators';
import { UserUpdateDTO } from '@users/dtos/userUpdateDTO';

export class UserUpdateValidator {
  private updateValidationScheme: z.AnyZodObject;
  private getByIdValidationScheme: z.AnyZodObject;
  private validator: Validator;




  constructor() {
    this.validator = new Validator();
    this.getByIdValidationScheme = z.object({
      id: z.coerce.number({ invalid_type_error: 'O dado deve ser do tipo number.' }).positive().int(),
    }) satisfies z.ZodType<UserGetByIdQueryParamsDTO>;

    this.validator = new Validator();
    this.updateValidationScheme = z.object({
      email: z.string().email().or(z.undefined()),
      password: z.string().min(4).or(z.undefined()),
      active: z.boolean().optional().or(z.undefined()),

    }) satisfies z.ZodType<UserUpdateDTO>;
  }

  validate() {
    return this.validator.validation({ params: this.getByIdValidationScheme, body: this.updateValidationScheme });
  }
}