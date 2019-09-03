import { Moment } from 'moment';

export const enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface IArbTicketMySuffix {
  id?: number;
  priority?: Priority;
  state?: boolean;
  subject?: string;
  description?: string;
  date?: Moment;
  ownerId?: number;
  assigneeId?: number;
}

export class ArbTicketMySuffix implements IArbTicketMySuffix {
  constructor(
    public id?: number,
    public priority?: Priority,
    public state?: boolean,
    public subject?: string,
    public description?: string,
    public date?: Moment,
    public ownerId?: number,
    public assigneeId?: number
  ) {
    this.state = this.state || false;
  }
}
