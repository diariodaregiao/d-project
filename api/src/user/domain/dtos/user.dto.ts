import { UserStatus } from '@/user/domain/enums/user-status.enum';

export type UserDto = {
  id: string;
  status: UserStatus;
  role: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};
