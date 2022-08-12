import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post, user } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() post!: Post

  mineP: boolean = this.auth$.mine;

  dettagli: boolean = false;
  user:any;

  account: user[] = []

  subU = new BehaviorSubject<any>({})
  obsU = this.subU.asObservable();

  constructor( private http: HttpClient, private post$: PostService,private auth$: AuthService) { }

  ngOnInit(): void {
    this.user = this.getUser();
    this.auth$.myAccount()
    this.account = this.auth$.account
    this.auth$.mine = this.auth$.isMine(this.post.autore, this.account[0].id);
    this.mineP = this.auth$.mine
  }

  getUser(){
    this.http.get<[]>("http://localhost:3000/api/getusers/" + this.post.autore).subscribe((user) => {
      this.user = user;
      // this.subU.next(this.user)
    })
  }
  mostraDettagli(){
    if(this.dettagli == false){
      this.dettagli = true;
    } else {
      this.dettagli = false;
    }
  }
  dammiId(){
    this.post$.getPostId(this.post.id)
    console.log(this.post.id);
  }
  }

