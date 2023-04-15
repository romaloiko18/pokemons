import { Color } from 'react-bootstrap/types';
import { TicketStatus } from '../constants/ticket';

export type SelectOption = {
  value: number;
  name: string;
};

export type StatusSelectOption = { bg: string; text?: Color; name: TicketStatus; value: number };
