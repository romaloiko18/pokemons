import { Ticket } from './ticket';
import { User } from './user';

export type Project = {
  key: string;
  _id: string;
  name: string;
  description: string;
  tickets?: Ticket[];
  contributors: User[];
};
