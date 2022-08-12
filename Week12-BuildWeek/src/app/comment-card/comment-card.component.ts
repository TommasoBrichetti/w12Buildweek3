import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { comments, user } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  @Input() commento!: comments

  @Input() index!: number

  @Output() customEventTrash= new EventEmitter()

  user: user[] = [];
  account: user[] = [];
  mineC: boolean = false;
  constructor(private http: HttpClient, private auth$: AuthService, private post$: PostService) { }

  ngOnInit(): void {
    this.getUser();
    this.auth$.myAccount()
    this.account = this.auth$.account
    this.mineC = this.auth$.isMine(this.commento.idUser, this.account[0].id);
  }

  getUser(){
    this.http.get<[]>("http://localhost:3000/api/getusers/" + this.commento.idUser).subscribe((user) => {
      this.user = user;
      console.log(this.user);
      console.log(user)
      // this.subU.next(this.user)
    })
  }
  deleteComment(){
    this.post$.deleteComment(this.commento.id)
    this.customEventTrash.emit(this.index)
  }
}
