import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserGetAllQueryParamsDTO } from '@users/dtos/userGetAllQueryParamsDTO';
import { UserGetAllUseCase } from '@users/use-cases/userGetAllUseCase';

export class UserGetAllController {

  constructor(private userGetAllService: UserGetAllUseCase = new UserGetAllUseCase()) { }

  route = async (req: Request<object, object, object, object, UserGetAllQueryParamsDTO>, res: Response) => {

    const [error, userAll] = await this.userGetAllService.execute(req.query);

    if (error != null) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else {
      return res.status(StatusCodes.OK).json(userAll);
    }
  };
}