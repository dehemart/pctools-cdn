import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';


export class UserDeleteUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  execute = async (data: UserGetByIdQueryParamsDTO): Promise<object | null> => {
    try {

      await this.prisma.user.delete({
        where: {
          id: Number(data.id),
        }
      });

      return null;

    } catch (e){
      if (
        e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof PrismaClientUnknownRequestError ||
        e instanceof PrismaClientRustPanicError ||
        e instanceof PrismaClientValidationError ||
        e instanceof PrismaClientInitializationError ) {
        return e;
      }
      return new Error('Unknown error');
    }
  };
}