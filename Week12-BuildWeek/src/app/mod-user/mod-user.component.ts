import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { user } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.scss']
})
export class ModUserComponent implements OnInit {

  activeMT: boolean = false;

  activeMB: boolean = false;

  formT!: FormGroup

  formB!: FormGroup

  modal: boolean = true;

  account: user[] = []

  form!: FormGroup

  modalEr: boolean = false


  constructor(private post$: PostService, private fb: FormBuilder, private http: HttpClient, private auth$: AuthService) {
    this.form = this.fb.group({
      email: ["", [Validators.required]]
    })
    this.formT = this.fb.group({
      title: ["", [Validators.required]],
    })
    this.formB = this.fb.group({
      body: ["", [Validators.required]],
    })
   }

  ngOnInit(): void {
    this.auth$.myAccount()
    this.account = this.auth$.account
  }


  modTitle(){
    this.http.patch('http://localhost:3000/api/modusers/' + this.account[0].id, {"username":this.formT.controls['title'].value}).subscribe((res) => {
     console.log(res);
     this.account[0].username = this.formT.controls['title'].value
    })
    this.activeMT = false
   }

   modBody(){
     this.http.patch('http://localhost:3000/api/modusers/' + this.account[0].id, {"name":this.formB.controls['body'].value}).subscribe((res) => {
      console.log(res);
      this.account[0].name = this.formB.controls['body'].value
     })
     this.activeMB = false
    }

   clickMT(){
     this.formT.controls['title'].setValue(this.account[0].username)
     if(this.activeMT == false){
       this.activeMT = true
     } else {
       this.activeMT = false
     }
   }

   clickMB(){
     this.formB.controls['body'].setValue(this.account[0].name)
     if(this.activeMB == false){
       this.activeMB = true
     } else {
       this.activeMB = false
     }
   }
   confirmPass(){
    console.log(this.account[0].email, this.form.controls['email'].value);

    if(this.form.controls['email'].value === this.account[0].email){
      this.modalEr = false
      this.modal = false

    }else {
      this.modalEr = true
    }
   }

}
