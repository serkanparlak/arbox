import { Moment } from 'moment';

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface IArbTicket {
  id?: number;
  priority?: Priority;
  state?: boolean;
  subject?: string;
  description?: string;
  date?: Moment;
  ownerId?: number;
  ownerUsername?: string;
  assigneeId?: number;
  assigneeUsername?: string;
}

export class ArbTicket implements IArbTicket {
  constructor(
    public id?: number,
    public priority?: Priority,
    public state?: boolean,
    public subject?: string,
    public description?: string,
    public date?: Moment,
    public ownerId?: number,
    public ownerUsername?: string,
    public assigneeId?: number,
    public assigneeUsername?: string
  ) {
    this.state = this.state || false;
  }
}
