import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../arb.component.scss', './login.component.scss']
})
export class LoginComponent {
  authenticationError: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(loginForm: NgForm) {
    this.authenticationError = false;
    this.loginService
      .login({
        username: loginForm.controls['username'].value,
        password: loginForm.controls['password'].value,
        rememberMe: true
      })
      .then(() => {
        this.router.navigate(['/arb/ticket']);
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
