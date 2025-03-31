import { GetUserByEmailQuery } from '@/user/application/queries/get-user-by-email.query';
import { UserDto } from '@/user/domain/dtos/user.dto';
import { UserReadRepository } from '@/user/domain/ports/user-read.repository';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements
    IQueryHandler<GetUserByEmailQuery, Omit<UserDto, 'password'> | null>
{
  constructor(
    @Inject('UserReadRepository') private readonly repo: UserReadRepository,
  ) {}

  async execute(
    query: GetUserByEmailQuery,
  ): Promise<Omit<UserDto, 'password'> | null> {
    return this.repo.getByEmail(query.email);
  }
}
