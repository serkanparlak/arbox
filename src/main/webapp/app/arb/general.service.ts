import { Injectable } from '@angular/core';
import { ArbTicket, Priority } from 'app/arb/models/ticket.model';
import { Subject, interval, Observable, from, of, Observer, fromEvent, range, timer } from 'rxjs';
import * as moment from 'moment';
import { delay, filter, flatMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  private tickets: ArbTicket[] = [
    new ArbTicket(1, Priority.Medium, true, 'Konu 1', 'Desc 1', moment(new Date())),
    new ArbTicket(2, Priority.Low, true, 'Konu 2', 'Desc 2', moment(new Date())),
    new ArbTicket(3, Priority.High, true, 'Konu 3', 'Desc 3', moment(new Date()))
  ];
  ticketListSubscriber = new Subject<ArbTicket[]>();
  fromObs: Observable<any> = from([...this.tickets]);
  // .pipe(
  //     filter(x => typeof x === 'string'),
  //   map((x: string) => x.toUpperCase())
  // );
  ofObs: Observable<any> = of(this.tickets);
  createObs: Observable<string> = new Observable((observer: Observer<string>) => {
    setTimeout(() => {
      observer.next('hello wordyy 1');
    }, 1000);
    setTimeout(() => {
      observer.next('hello wordyy 2');
    }, 2000);
    setTimeout(() => {
      observer.next('hello wordyy 3');
    }, 3000);
    setTimeout(() => {
      observer.complete();
    }, 2500);
    setTimeout(() => {
      observer.error('bittin olluum');
    }, 2499);
  });
  mapObs: Observable<any> = from([1, 2, 3, 4, 5]).pipe(map(x => x));
  flatMapObs: Observable<any> = from([1, 2, 3, 4, 5]).pipe(flatMap(x => [x]));
  rangeObs: Observable<number> = range(10, 50);

  constructor() {
    setTimeout(() => {
      this.ticketListSubscriber.next(this.tickets);
    }, 0);
  }

  AddTicket(ticket: ArbTicket) {
    this.tickets.push(ticket);
    this.ticketListSubscriber.next(this.tickets.slice());
  }

  RemoveTicket(data: number | ArbTicket) {
    if (typeof data === 'number') {
      data = this.tickets.find(x => x.id === data);
    }
    const ticketIndex = this.tickets.indexOf(data);
    const beforeRemoved = this.tickets.splice(ticketIndex);
    this.ticketListSubscriber.next(beforeRemoved);
  }
}
