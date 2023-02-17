import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {


  constructor() {


  }

  ngOnInit() {

  }

  login(loginForm: NgForm, event: Event) {
    console.log(loginForm.value);


  }
}
