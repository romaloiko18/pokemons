import { Ticket } from './ticket';
import { User } from './user';

export type Project = {
  key: string;
  _id: string;
  name: string;
  lead: {
    _id: string;
    email: string;
  };
  description: string;
  tickets?: Ticket[];
  contributors: User[];
};
