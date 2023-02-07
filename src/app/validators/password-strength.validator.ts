import {AbstractControl, ValidatorFn} from "@angular/forms";


export function createPasswordStrengthValidator(): ValidatorFn | null {
  return (control: AbstractControl): { [key: string]: any } => {
    const password = control.value;
    if (password) {
      const hasNumber = /\d/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNonAlphas = /\W/.test(password);
      const valid = hasNumber && hasUpper && hasLower && hasNonAlphas;
      return valid ? null : {passwordStrength: true};
    }
    return null;
  };

}
