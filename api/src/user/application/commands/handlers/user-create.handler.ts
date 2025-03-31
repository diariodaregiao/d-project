import { UserCreateCommand } from '@/user/application/commands/user-create.command';
import { UserEventRepository } from '@/user/domain/ports/user-event.repository';
import { User } from '@/user/domain/user';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler
  implements ICommandHandler<UserCreateCommand, void>
{
  constructor(
    @Inject('UserEventRepository') private readonly repo: UserEventRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UserCreateCommand): Promise<void> {
    const user = User.create(command.props);
    const event = user.events[0];
    await this.repo.persist(event);
    await this.eventBus.publish(event);
  }
}
