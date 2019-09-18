import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'app/core';

@Component({
  selector: 'jhi-arb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../arb.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit() {}
}
