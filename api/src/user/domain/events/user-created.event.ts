import { DomainEvent } from '@/shared/interfaces/domain.event';
import { UserDto } from '@/user/domain/dtos/user.dto';

export class UserCreatedEvent implements DomainEvent<UserDto> {
  readonly eventName: string = UserCreatedEvent.name;
  readonly referenceId: string;
  readonly occurredAt: Date = new Date();

  constructor(readonly payload: UserDto) {
    this.referenceId = payload.id;
  }
}
