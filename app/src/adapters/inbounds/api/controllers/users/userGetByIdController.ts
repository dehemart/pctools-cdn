import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { UserGetByIdUseCase } from '@users/use-cases/userGetByIdUseCase';

export class UserGetByIdController {

  constructor(private userGetByIdService: UserGetByIdUseCase = new UserGetByIdUseCase()) {}

  route = async (req: Request<UserGetByIdQueryParamsDTO>, res: Response) => {

    const [error, UserById] = await this.userGetByIdService.execute(req.params);

    if (error != null){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else if (UserById == null){
      return res.status(StatusCodes.NOT_FOUND).json({code: 10404, message: 'User not found!'});
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password: _, ...user } = UserById!;
      return res.status(StatusCodes.OK).json(user);
    }
  };
}