import { DomainEvent } from '@/shared/interfaces/domain.event';
import { UserDto } from '@/user/domain/dtos/user.dto';

export interface UserEventRepository {
  persist(event: DomainEvent<UserDto>): Promise<void>;
}
