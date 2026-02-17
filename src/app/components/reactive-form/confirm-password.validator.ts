import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator that checks if confirmPassword control matches the password control.
 * Use with FormGroup: set on the group so it can compare password and confirmPassword.
 */
export function confirmPasswordValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group.get('password') && group.get('confirmPassword'))) return null;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password === confirmPassword) return null;
    return { passwordMismatch: true };
  };
}
