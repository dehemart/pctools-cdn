import { Prisma } from '@prisma/client';

export type UserGetAllQueryParamsDTO = {
  page?: number;
  limit?: number;
  email: string;
  phoneNumber?: string;
  username?: string;
  active?: boolean;
  orderByEmail?: Prisma.SortOrder;
  orderByUsername?: Prisma.SortOrder;
  orderByPhoneNumber?: Prisma.SortOrder;
};
