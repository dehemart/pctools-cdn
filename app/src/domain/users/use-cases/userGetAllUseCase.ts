import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { UserGetAllQueryParamsDTO } from '@users/dtos/userGetAllQueryParamsDTO';
import { UserResponseDTO } from '@users/dtos/userResponseDTO';
import { PaginatedOutputDto } from 'src/domain/pagination/dtos/paginateOutputDTO';

export class UserGetAllUseCase {

  constructor(private prisma: PrismaClient = new PrismaClient()) { }

  execute = async (data: UserGetAllQueryParamsDTO): Promise<[object | null, PaginatedOutputDto<UserResponseDTO> | null]> => {
    try {
      const page_current = Math.max(Number(data.page || 1), 1);
      const page_size = Number(data.limit || 40);

      const [total, users] = await this.prisma.$transaction([
        this.prisma.user.count(),
        this.prisma.user.findMany({
          omit: {
            password: true
          },
          take: page_size,
          skip: (page_current - 1) * page_size,
          where: {
            active: {
              equals: data.active == false ? false : true
            },
            email: {
              contains: data.email,
              mode: 'insensitive'
            },
          },
          orderBy: [
            { email: data.orderByEmail },
          ]
        })
      ]);

      const output: PaginatedOutputDto<UserResponseDTO> = {
        data: users,
        meta: [{
          currentPage: page_current,
          lastPage: Math.ceil(total / page_size),
          perPage: page_size
        }]
      };
      return [null, output];

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