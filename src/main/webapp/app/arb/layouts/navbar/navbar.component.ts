import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-arb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../arb.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/arb/login']);
  }
}
