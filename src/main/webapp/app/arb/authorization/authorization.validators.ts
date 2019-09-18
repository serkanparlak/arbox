import { AbstractControl } from '@angular/forms';

export function ConfirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.pristine || confirmPassword.pristine) return null;
  return password.value !== confirmPassword.value ? { passwordMatch: true } : null;
}
