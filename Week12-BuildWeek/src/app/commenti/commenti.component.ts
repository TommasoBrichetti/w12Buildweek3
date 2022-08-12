import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { comments, user, UserLogin } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.scss']
})
export class CommentiComponent implements OnInit {

  user: user[] = [];

  isLogged!: boolean | UserLogin

  arrayCommenti: comments[] = []

  sub!: Subscription

  error: boolean = false;

  succes: boolean = false;


  form!: FormGroup;

  constructor(private post$: PostService, private auth$: AuthService, public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      body: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.sub = this.auth$.authSub.subscribe((state) => {
      this.isLogged = state;
  })
    this.auth$.myAccount()
    this.user = this.auth$.account
    this.post$.getComments(this.post$.postid);
    this.sub = this.post$.obsC.subscribe((res)=>{
      this.arrayCommenti = res
      console.log(res)
    })
  }

  newComment(){
    console.log(this.arrayCommenti);

    let obj = {
      "idPost": this.post$.postid,
      "idUser": this.user[0].id,
      "body" : this.form.controls["body"].value,
    }
    if(!this.form.valid){
      this.error = true
      console.log('not valid')
    }
    else{
      this.http.post<{}>("http://localhost:3000/api/comments", obj).subscribe((res) =>{
        console.log("alleluia")
      })
      this.error = false
      this.succes = true
      this.post$.getComments(this.post$.postid)
      this.form.reset()
    }
  }
  delComment(index: number){
    this.arrayCommenti.splice(index, 1)
  }
}
