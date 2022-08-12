import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { comments, Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
   arrayPost: Post[] = []

   arrayComments: comments[] = []

   postid!: number;

   url =  "http://localhost:3000/api/";

  sub = new BehaviorSubject<Post[]>([])
  obs = this.sub.asObservable()

  subC = new BehaviorSubject<comments[]>([])
  obsC = this.subC.asObservable()

  constructor(private http: HttpClient) {}

  arrayPostGet() {
    this.http.get<Post[]>(this.url + "posts").subscribe((posts:Post[]) => {
      this.arrayPost = posts;
      this.sub.next(this.arrayPost)
    })
  }

  getPostId(id:number){
    this.postid = id;
  }

  getComments(id:number){
    this.http.get(this.url + 'comments').subscribe((res:any) => {
      console.log(res);
      this.arrayComments = res.filter((el:comments) => el.idPost == id
      )
      console.log(this.arrayComments)
      this.subC.next(this.arrayComments)
    })
  }
  deletePost(postid:number){
    this.http.delete("http://localhost:3000/api/posts/" + postid).subscribe((res) => {
      console.log(res)
    })
    console.log("daje")
  }
  deleteComment(commentoid:number){
    this.http.delete("http://localhost:3000/api/comments/" + commentoid).subscribe((res) => {
    console.log(res)
  })
  console.log("daje")
}
}
