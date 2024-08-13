import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Prisma } from '@prisma/client';
import { UserDeleteUseCase } from '@users/use-cases/userDeleteUseCase';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';

export class UserDeleteController {
  constructor(private userDeleteService: UserDeleteUseCase = new UserDeleteUseCase()) {}

  route = async (req: Request<UserGetByIdQueryParamsDTO, object, object, object, object>, res: Response) => {

    const error = await this.userDeleteService.execute(req.params);

    if (error != null){
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2025') {
        return res.status(StatusCodes.NOT_FOUND).json({code: 10404, message: 'User not found!'});
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else {
      return res.status(StatusCodes.NO_CONTENT).send();
    }
  };
}