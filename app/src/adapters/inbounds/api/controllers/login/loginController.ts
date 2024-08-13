import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginDTO } from '@login/dtos/loginDTO';
import { LoginUseCase } from '@login/use-cases/loginUseCase';

export class LoginController {

  constructor(private userGetByIdService: LoginUseCase = new LoginUseCase()) { }
  route = async (req: Request<object, object, LoginDTO, object, object>, res: Response) => {

    const [error, loggedUser] = await this.userGetByIdService.execute(req.body);

    if (error != null) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else if (loggedUser == null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ code: 10401, message: 'Credentials not authorized!' });
    } else {
      return res.status(StatusCodes.OK).json(loggedUser);
    }
  };
}