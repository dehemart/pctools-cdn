import { UserGetByIdQueryParamsDTO } from '@users/dtos/userGetByIdQueryParamsDTO';
import { UserUpdateDTO } from '@users/dtos/userUpdateDTO';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { hashPassword } from '@utils/crypt/cryptUtil';
import { UserResponseDTO } from '@users/dtos/userResponseDTO';

export class UserUpdateUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) { }

  execute = async (identificador: UserGetByIdQueryParamsDTO, data: UserUpdateDTO)
    : Promise<[Prisma.PrismaClientKnownRequestError |
      PrismaClientUnknownRequestError |
      PrismaClientRustPanicError |
      PrismaClientValidationError |
      PrismaClientInitializationError |
      object | null, UserResponseDTO | null]> => {
    try {

      const userPage = await this.prisma.user.update({
        where: {
          id: Number(identificador.id),
        },
        data: {
          email: data.email,
          password: data.password != null ? await hashPassword(data.password) : undefined,
          active: data.active != null ? data.active : undefined,
        },
        omit: {
          password: true
        },
      });
      return [null, userPage];

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof PrismaClientUnknownRequestError ||
        e instanceof PrismaClientRustPanicError ||
        e instanceof PrismaClientValidationError ||
        e instanceof PrismaClientInitializationError) {
        return [e, null];
      }
      return [new Error('Unknown error'), null];
    }
  };
}