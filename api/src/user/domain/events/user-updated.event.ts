import { DomainEvent } from '@/shared/interfaces/domain.event';
import { UserDto } from '@/user/domain/dtos/user.dto';

export class UserUpdatedEvent implements DomainEvent<UserDto> {
  readonly eventName: string = UserUpdatedEvent.name;
  readonly referenceId: string;
  readonly occurredAt: Date = new Date();

  constructor(readonly payload: UserDto) {
    this.referenceId = payload.id;
  }
}
