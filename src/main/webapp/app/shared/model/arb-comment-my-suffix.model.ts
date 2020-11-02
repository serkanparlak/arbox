import { Moment } from 'moment';

export interface IArbCommentMySuffix {
  id?: number;
  date?: Moment;
  content?: string;
  isSolution?: boolean;
  ticketId?: number;
  ownerId?: number;
}

export class ArbCommentMySuffix implements IArbCommentMySuffix {
  constructor(
    public id?: number,
    public date?: Moment,
    public content?: string,
    public isSolution?: boolean,
    public ticketId?: number,
    public ownerId?: number
  ) {
    this.isSolution = this.isSolution || false;
  }
}
