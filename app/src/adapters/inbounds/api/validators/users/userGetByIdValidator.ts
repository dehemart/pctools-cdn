import z from 'zod';
import {Validator} from '@validators/validators';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';

export class UserGetByIdValidator {
  private getByIdValidationScheme: z.AnyZodObject;
  private validator: Validator;

  constructor(){
    this.validator = new Validator();
    this.getByIdValidationScheme =  z.object({
      id: z.coerce.number({invalid_type_error: 'O dado deve ser do tipo number.'}).positive().int(),
    }) satisfies z.ZodType<UserGetByIdQueryParamsDTO>;
  }

  validate() {
    return this.validator.validation({params: this.getByIdValidationScheme});
  }
}


