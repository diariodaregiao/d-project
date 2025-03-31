import { DomainEvent } from '@/shared/interfaces/domain.event';
import { UserDto } from '@/user/domain/dtos/user.dto';
import { UserStatus } from '@/user/domain/enums/user-status.enum';
import { UserCreatedEvent } from '@/user/domain/events/user-created.event';
import { UserRemovedEvent } from '@/user/domain/events/user-removed.event';
import { UserUpdatedEvent } from '@/user/domain/events/user-updated.event';
import { randomUUID } from 'node:crypto';

export class User {
  private _events: DomainEvent<UserDto>[] = [];

  constructor(private props: UserDto) {}

  static create(
    input: Pick<UserDto, 'role' | 'name' | 'email' | 'password'>,
  ): User {
    const user = new User({
      ...input,
      id: randomUUID(),
      status: UserStatus.ACTIVE,
      avatar: process.env.DEFAULT_USER_AVATAR,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    user._events.push(new UserCreatedEvent(user.data));
    return user;
  }

  update(
    input: Partial<Omit<UserDto, 'id' | 'createdAt' | 'updatedAt'>>,
  ): void {
    const keys = Object.keys(input);
    for (const key of keys) {
      this.props[key] = input[key];
    }
    this.props.updatedAt = new Date();
    this._events.push(new UserUpdatedEvent(this.data));
  }

  remove(): void {
    this.props.status = UserStatus.REMOVED;
    this.props.name = this.props.name.split(' ')[0];
    this.props.email = process.env.DEFAULT_ANONYMIZED_EMAIL;
    this.props.updatedAt = new Date();
    this._events.push(new UserRemovedEvent(this.data));
  }

  get data(): UserDto {
    return this.props;
  }

  get events(): DomainEvent<UserDto>[] {
    return this._events;
  }
}
