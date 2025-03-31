import { UserDto } from '@/user/domain/dtos/user.dto';

export interface UserReadRepository {
  getByEmail(email: string): Promise<UserDto | null>;
}
