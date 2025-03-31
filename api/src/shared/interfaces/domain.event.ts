export interface DomainEvent<T> {
  eventName: string;
  payload: T;
  referenceId: string;
  occurredAt: Date;
}
