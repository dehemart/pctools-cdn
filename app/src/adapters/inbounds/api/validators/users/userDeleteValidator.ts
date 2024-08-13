import z from 'zod';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import {Validator} from '@validators/validators';

export class UserDeleteValidator {
  private deleteValidationScheme: z.AnyZodObject;
  private validator: Validator;

  constructor(){
    this.validator = new Validator();
    this.deleteValidationScheme =  z.object({
      id: z.coerce.number({invalid_type_error: 'O dado deve ser do tipo number.'}).positive().int(),
    }) satisfies z.ZodType<UserGetByIdQueryParamsDTO>;
  }

  validate() {
    return this.validator.validation({params: this.deleteValidationScheme});
  }
}


