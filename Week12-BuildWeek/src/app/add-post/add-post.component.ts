import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { user } from '../post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form!: FormGroup;

  user: user[] = [];

  error:boolean = false;

  succes:boolean = false;


  constructor(private auth$: AuthService, private http: HttpClient, public fb: FormBuilder) {
    this.form = this.fb.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
    })
   }

  ngOnInit(): void {
    this.succes = false
    this.auth$.myAccount()
    this.user = this.auth$.account
    console.log(this.user)
  }

submit(){
  let obj =
  {
    'autore': this.user[0].id,
    'title': this.form.controls["title"].value,
    'body': this.form.controls["body"].value
  }
   console.log(obj)
  if(!this.form.valid){
    this.error = true
    console.log('not valid')
  }
  else{
    this.http.post<{}>("http://localhost:3000/api/posts", obj).subscribe((res) =>{
      console.log("alleluia")
    })
    this.error = false
    this.succes = true
  }

}
}
