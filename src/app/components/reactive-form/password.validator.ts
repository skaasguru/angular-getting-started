import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom password validator: at least 8 chars, one uppercase, one lowercase, one number.
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasMinLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    const valid = hasMinLength && hasUppercase && hasLowercase && hasNumber;
    if (valid) return null;

    const errors: ValidationErrors = {};
    if (!hasMinLength) errors['minLength'] = { requiredLength: 8 };
    if (!hasUppercase) errors['requireUppercase'] = true;
    if (!hasLowercase) errors['requireLowercase'] = true;
    if (!hasNumber) errors['requireNumber'] = true;
    return errors;
  };
}
