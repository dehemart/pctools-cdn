import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserCreateDTO } from '@users/dtos/userCreateDTO';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { hashPassword } from '@utils/crypt/cryptUtil';

export class UserCreateUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) {}

  create = async (data: UserCreateDTO): Promise<[object | null , User | null]> => {
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          email: data.email,
          password: await hashPassword(data.password),
          active: true,
        },
      });
      return [null, userCreated];

    } catch (e){
      if (e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof PrismaClientUnknownRequestError ||
        e instanceof PrismaClientRustPanicError ||
        e instanceof PrismaClientValidationError ||
        e instanceof PrismaClientInitializationError ) {
        return [e, null];
      }
      return [new Error('Unknown error'), null];
    }
  };
}