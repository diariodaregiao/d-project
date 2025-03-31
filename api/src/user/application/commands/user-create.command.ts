import { UserDto } from '@/user/domain/dtos/user.dto';

export class UserCreateCommand {
  constructor(
    readonly props: Pick<UserDto, 'role' | 'name' | 'email' | 'password'>,
  ) {}
}
