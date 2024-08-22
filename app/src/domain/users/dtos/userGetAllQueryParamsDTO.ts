import { Prisma } from '@prisma/client';

export type UserGetAllQueryParamsDTO = {
  page?: number;
  limit?: number;
  email?: string;
  active?: boolean;
  orderByEmail?: Prisma.SortOrder;
};
