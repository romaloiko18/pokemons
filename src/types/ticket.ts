import { TicketStatus } from '../constants/ticket';
import { ProjectBlock } from '../constants/project';
import { Project } from './project';
import { User } from './user';
import { Comment } from './comment';

export type Ticket = {
  _id: string;
  name: string;
  description?: string;
  status: TicketStatus;
  projectBlock: ProjectBlock;
  project: Project;
  comments: Comment[];
  assignee?: User;
};
