import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  arrayPost: Post[] = []
  sub!: Subscription;

  constructor(private post$: PostService ) { }

  ngOnInit(): void {
    this.post$.arrayPostGet();
    this.sub = this.post$.obs.subscribe((res)=>{
       this.arrayPost = res
      })
      }

  }

