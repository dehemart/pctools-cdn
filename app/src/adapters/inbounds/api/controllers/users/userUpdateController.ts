import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { UserUpdateUseCase } from '@users/use-cases/userUpdateUseCase';
import { Prisma } from '@prisma/client';
import { UserUpdateDTO } from '@users/dtos/userUpdateDTO';


export class UserUpdateController {

  constructor(private userUpdateService: UserUpdateUseCase = new UserUpdateUseCase) { }
  route = async (req: Request<UserGetByIdQueryParamsDTO, object, UserUpdateDTO, object, object>, res: Response) => {

    const [error, UserById] = await this.userUpdateService.execute(req.params, req.body);

    if (error != null) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2025') {
        return res.status(StatusCodes.NOT_FOUND).json({ code: 10404, message: 'User not found!' });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    } else {
      return res.status(StatusCodes.OK).json(UserById);
    }
  };
}