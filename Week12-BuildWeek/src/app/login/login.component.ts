import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { user, UserLogin } from '../post';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  isLogged!: boolean | UserLogin;
  sub!: Subscription

  error: boolean = false;

  constructor(private auth$: AuthService, public fb: FormBuilder) {
    this.form = this.fb.group({

      email: ["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    })
   }

ngOnInit(): void {
  this.sub = this.auth$.authObs.subscribe((state)=>{
    this.isLogged = state;
  })
}
login() {
  if(!this.form.valid ) {
    this.error = true;
  } else {
    this.auth$.login(this.form.value)
    this.error = false;
  }
}

}
