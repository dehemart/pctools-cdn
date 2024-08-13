import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserCreateDTO } from '@users/dtos/userCreateDTO';
import { UserCreateUseCase } from '@users/use-cases/userCreateUseCase';

export class UserCreateController {

  constructor(private userCreateService: UserCreateUseCase = new UserCreateUseCase()) { }

  route = async (req: Request<object, object, UserCreateDTO, object, object>, res: Response): Promise<Response> => {
    const [error, userCreated] = await this.userCreateService.create(req.body);

    if (error != null) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else {

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = userCreated!;
      return res.status(StatusCodes.CREATED).json(user);
    }
  };
}