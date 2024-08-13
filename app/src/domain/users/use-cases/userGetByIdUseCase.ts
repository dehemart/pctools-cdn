import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';


export class UserGetByIdUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  execute = async (data: UserGetByIdQueryParamsDTO): Promise<[object | null , User | null]> => {
    try {

      const userById = await this.prisma.user.findUnique({
        where: {
          id: Number(data.id),
        }
      });
      return [null, userById];
    } catch (e){
      if (e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof PrismaClientUnknownRequestError ||
        e instanceof PrismaClientRustPanicError ||
        e instanceof PrismaClientValidationError ||
        e instanceof PrismaClientInitializationError ) {
        return [{prisma_error: e}, null];
      }
      return [new Error('Unknown error'), null];
    }
  };
}