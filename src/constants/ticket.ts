import { StatusSelectOption } from '../types/inputs';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CODE_REVIEW = 'CODE_REVIEW',
  READY_FOR_TESTING = 'READY_FOR_TESTING',
  TESTING = 'TESTING',
  DONE = 'DONE',
  DEPRECATED = 'DEPRECATED'
}

export const STATUS_SELECT_OPTIONS: StatusSelectOption[] = [
  {
    value: 1,
    name: TicketStatus.OPEN,
    bg: 'light',
    text: 'dark'
  },
  {
    value: 2,
    name: TicketStatus.CODE_REVIEW,
    bg: 'info'
  },
  {
    value: 3,
    name: TicketStatus.DONE,
    bg: 'success'
  },
  {
    value: 4,
    name: TicketStatus.IN_PROGRESS,
    bg: 'primary'
  },
  {
    value: 5,
    name: TicketStatus.READY_FOR_TESTING,
    bg: 'primary'
  },
  {
    value: 6,
    name: TicketStatus.TESTING,
    bg: 'primary'
  },
  {
    value: 7,
    name: TicketStatus.DEPRECATED,
    bg: 'secondary'
  }
];
