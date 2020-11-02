import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[jhiTicket]'
})
export class TicketDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.fontStyle') fontStyle: string;
  @HostBinding('style.borderRadius') borderRadius: string;

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = 'darkgray';
    this.fontStyle = 'normal';
    this.borderRadius = '30px';
  }

  @HostListener('mouseleave') mouseleave() {
    this.backgroundColor = 'transparent';
    this.fontStyle = 'italic';
    this.borderRadius = '5px';
  }

  constructor() {}

  ngOnInit(): void {}
}
