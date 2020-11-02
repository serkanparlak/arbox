import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() selectedInterface: boolean;

  @Output() selectInterface = new EventEmitter<boolean>();
}
