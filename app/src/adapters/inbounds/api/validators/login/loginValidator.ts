import z from 'zod';
import {Validator} from '@validators/validators';
import { LoginDTO } from '@login/dtos/loginDTO';


export class LoginValidator {
  private loginValidationScheme: z.AnyZodObject;
  private validator: Validator;

  constructor(){
    this.validator = new Validator();
    this.loginValidationScheme =  z.object({
      email: z.string().email(),
      password: z.string().min(6)
    }) satisfies z.ZodType<LoginDTO>;
  }

  validate() {
    return this.validator.validation({body: this.loginValidationScheme});
  }
}


