import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Directive, ElementRef, Input} from "@angular/core";
import {createPasswordStrengthValidator} from "../validators/password-strength.validator";

@Directive({
  selector: '[passwordStrength]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective, multi: true}]
})
export class PasswordStrengthDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}
