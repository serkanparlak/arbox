import { Moment } from 'moment';

export interface IArbComment {
  id?: number;
  date?: Moment;
  content?: string;
  isSolution?: boolean;
  ticketId?: number;
  ownerId?: number;
  ownerUsername?: string;
}

export class ArbComment implements IArbComment {
  constructor(
    public id?: number,
    public date?: Moment,
    public content?: string,
    public isSolution?: boolean,
    public ticketId?: number,
    public ownerId?: number,
    public ownerUsername?: string
  ) {
    this.isSolution = this.isSolution || false;
  }
}
