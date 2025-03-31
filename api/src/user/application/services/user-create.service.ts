import { UserCreateCommand } from '@/user/application/commands/user-create.command';
import { GetUserByEmailQuery } from '@/user/application/queries/get-user-by-email.query';
import { UserDto } from '@/user/domain/dtos/user.dto';
import { UserStatus } from '@/user/domain/enums/user-status.enum';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UserCreateService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    input: Pick<UserDto, 'role' | 'name' | 'email' | 'password'>,
  ): Promise<void> {
    await this.checkEmailAlreadyInUse(input.email);
    await this.commandBus.execute(new UserCreateCommand(input));
  }

  private async checkEmailAlreadyInUse(email: string): Promise<void> {
    const existsUser = await this.queryBus.execute<
      GetUserByEmailQuery,
      UserDto | null
    >(new GetUserByEmailQuery(email));
    if (existsUser && existsUser.status !== UserStatus.REMOVED) {
      throw new BadRequestException(
        'E e-mail informado já está em uso, tente novamente.',
      );
    }
  }
}
