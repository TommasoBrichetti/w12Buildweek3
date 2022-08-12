import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignUp, UserLogin } from '../post';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  isLogged!: boolean | UserLogin;
  sub!: Subscription
  match: boolean = false;
  dirty: boolean = false;

  emailEr: boolean = false;
  rPassword = "" ;

  error: boolean = false;

  constructor(private auth$: AuthService, public fb: FormBuilder) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      age: ["", Validators.required],
      password:["", [Validators.required, Validators.minLength(8)]],
      rPassword:["", [Validators.required, Validators.minLength(8)]]
    })
  }
  ngOnInit(): void {
    this.sub = this.auth$.authObs.subscribe((state)=>{
      this.isLogged = state;
  })
}
  signup() {
     let obj =
      {
      "username" : this.form.controls["username"].value,
      "name" : this.form.controls["name"].value,
      "email" : this.form.controls["email"].value,
      "password" : this.form.controls["password"].value,
      "age" : this.form.controls["age"].value,
      }
      if(this.form.controls["username"].value !== "" && this.form.controls["name"].value !== "" && this.form.controls["password"].value !== "" && this.form.controls["email"].value !== "" && this.form.controls["rPassword"].value !== "" && this.form.controls["age"].value !== ""){
        this.dirty = false
        //password
        if(this.form.controls['rPassword'].value === this.form.controls["password"].value && this.form.controls['password'].value != ""){
          this.match = false;
          if(this.form.valid){
            this.emailEr = false
            this.error = false
            this.auth$.signUp(obj)
          } else {
            this.error = true
            this.emailEr = true
          }
        }else {
          this.match = true;
        }
      } else {
        this.dirty = true
      }

}
}
