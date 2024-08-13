import z from 'zod';
import { UserGetAllQueryParamsDTO } from '@users/dtos/userGetAllQueryParamsDTO';
import {Validator} from '@validators/validators';

export class UserGetAllValidator {
  private getAllValidationScheme: z.AnyZodObject;
  private validator: Validator;

  constructor(){
    this.validator = new Validator();
    this.getAllValidationScheme =  z.object({
      page: z.coerce.number({invalid_type_error: 'O dado deve ser do tipo number'}).positive().optional(),
      limit: z.coerce.number().positive().optional(),
      filter: z.string().optional(),
    }) satisfies z.ZodType<UserGetAllQueryParamsDTO>;
  }

  validate() {
    return this.validator.validation({query: this.getAllValidationScheme});
  }
}


