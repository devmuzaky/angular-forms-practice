import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {createPasswordStrengthValidator} from "../validators/password-strength.validator";


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      createPasswordStrengthValidator()
    ]]
  });


  constructor(private fb: FormBuilder) {
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  ngOnInit() {

  }

}
