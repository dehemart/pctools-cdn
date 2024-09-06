
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { sign } from 'jsonwebtoken';
import { comparePassword } from '@utils/crypt/cryptUtil';
import { auth } from '@config/appEnvironment';
import { LoginDTO } from '@login/dtos/loginDTO';
import { LoggedDTO } from '@login/dtos/loggedDTO';


export class LoginUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) { }

  execute = async (data: LoginDTO): Promise<[object | null, LoggedDTO | null]> => {

    try {
      const userById = await this.prisma.user.findFirstOrThrow({
        where: {
          email: data.email,
        }
      });

      const isAuthenticated = await comparePassword(data.password, userById!.password);
      if (!isAuthenticated) {
        return [null, null];
      }
      const token = sign(
        {
          id: userById.id,
        },
        auth.secret,
        {
          expiresIn: auth.expiresIn,
        });

      const userLogged: LoggedDTO = {
        id: userById.id,
        email: userById.email,
        token: token,
        active: userById.active,
      };

      return [null, userLogged];

    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError ||
        e instanceof PrismaClientUnknownRequestError ||
        e instanceof PrismaClientRustPanicError ||
        e instanceof PrismaClientValidationError ||
        e instanceof PrismaClientInitializationError) {
        return [{ prisma_error: e }, null];
      }

      return [new Error('Unknown error'), null];
    }
  };
}