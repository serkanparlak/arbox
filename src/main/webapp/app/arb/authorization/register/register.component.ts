import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'app/account';
import { ConfirmPasswordValidator } from 'app/arb/authorization/authorization.validators';
import { ArbUser } from 'app/arb/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../arb.component.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  userExist: boolean;
  registerSuccess: boolean;
  registerForm: FormGroup;
  private registerUser: ArbUser;

  constructor(private registerService: Register, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        login: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: [ConfirmPasswordValidator] }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser = new ArbUser(this.registerForm.get('login').value, this.registerForm.get('password').value);
    this.registerService.save(this.registerUser).subscribe(
      res => {
        this.registerSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/arb/login']);
        }, 5000);
      },
      err => {
        if (err.error.errorKey === 'userexists') {
          this.userExist = true;
        }
        console.log(err.error);
      }
    );
  }
}
