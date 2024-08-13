export type UserCreateDTO = {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  active?: boolean;
};
