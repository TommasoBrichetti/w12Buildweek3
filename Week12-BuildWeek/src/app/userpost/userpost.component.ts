import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post, user } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.scss']
})
export class UserpostComponent implements OnInit {

  arrayPost: Post[] = []
  sub!: Subscription;
  user: user[] = [];

  constructor(private post$: PostService, private auth$: AuthService) { }

  ngOnInit(): void {
    this.auth$.myAccount()
    this.user = this.auth$.account
    this.post$.arrayPostGet();
    this.sub = this.post$.obs.subscribe((res)=>{
       this.arrayPost = res.filter((el:Post) => el.autore == this.user[0].id);
      })
      }
      delFromArr(index: number){
        this.arrayPost.splice(index, 1);
      }
  }

